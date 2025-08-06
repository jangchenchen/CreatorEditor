// @ts-nocheck
import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { OutlineData } from '../../types/outline.types';
import { ExportOptions, ExportService, UpdateProgressFunction } from '../../types/exportTypes';
import { BaseExportService } from './baseExportService';
import { PdfContentGenerator } from './pdfContentGenerator';

export class PdfExportService implements ExportService {
  private pdfDoc!: PDFDocument;
  private font!: PDFFont;
  private boldFont!: PDFFont;
  private currentPage!: PDFPage;
  private yPosition = 750;
  private readonly pageMargin = 50;
  private fontSize = 12;
  private lineHeight = 16;

  /**
   * Export to PDF format
   */
  async export(
    data: OutlineData,
    options: ExportOptions,
    updateProgress: UpdateProgressFunction
  ): Promise<void> {
    updateProgress('processing', 10, '创建PDF文档', 1, 4);

    await this.initializePdf(options);

    updateProgress('processing', 20, '生成PDF内容', 1, 4);

    if (options.formatting.includeCoverPage) {
      this.addCoverPage(data, options);
      this.addNewPage();
    }

    this.addContentSections(data, options, updateProgress);

    updateProgress('generating', 90, '完成PDF生成', 2, 4);

    if (options.formatting.pageNumbers) {
      this.addPageNumbers();
    }

    updateProgress('saving', 95, '保存PDF文件', 3, 4);

    await this.savePdf(data, options);
  }

  private async initializePdf(options: ExportOptions): Promise<void> {
    this.pdfDoc = await PDFDocument.create();
    this.font = await this.pdfDoc.embedFont(StandardFonts.Helvetica);
    this.boldFont = await this.pdfDoc.embedFont(StandardFonts.HelveticaBold);
    this.fontSize = options.formatting.fontSize || 12;
    this.lineHeight = this.fontSize + 4;
    this.currentPage = this.pdfDoc.addPage();
    this.yPosition = 750;
  }

  private addCoverPage(data: OutlineData, options: ExportOptions): void {
    this.currentPage.drawText(options.formatting.title || data.projectName, {
      x: this.pageMargin,
      y: 600,
      size: 24,
      font: this.boldFont,
    });

    this.currentPage.drawText(`作者: ${options.formatting.author || '未知作者'}`, {
      x: this.pageMargin,
      y: 550,
      size: 14,
      font: this.font,
    });

    this.currentPage.drawText(`创建时间: ${new Date(data.createdAt).toLocaleDateString('zh-CN')}`, {
      x: this.pageMargin,
      y: 520,
      size: 12,
      font: this.font,
    });
  }

  private addContentSections(
    data: OutlineData,
    options: ExportOptions,
    updateProgress: UpdateProgressFunction
  ): void {
    const addHeading = this.addHeading.bind(this);
    const addText = this.addText.bind(this);

    if (options.includeModules.story) {
      PdfContentGenerator.generateStorySection(data, addHeading, addText);
    }

    updateProgress('processing', 40, '添加角色信息', 1, 4);
    if (options.includeModules.characters && data.characters.length > 0) {
      PdfContentGenerator.generateCharactersSection(data, addHeading, addText);
    }

    if (options.includeModules.timeline && data.timeline) {
      PdfContentGenerator.generateTimelineSection(data, addHeading, addText);
    }

    if (options.includeModules.world && data.world) {
      PdfContentGenerator.generateWorldSection(data, addHeading, addText);
    }

    updateProgress('processing', 60, '添加章节大纲', 1, 4);
    if (options.includeModules.chapters && data.chapters?.chapters.length > 0) {
      PdfContentGenerator.generateChaptersSection(data, addHeading, addText);
    }

    if (options.includeModules.themes && data.themes) {
      PdfContentGenerator.generateThemesSection(data, addHeading, addText);
    }

    updateProgress('processing', 80, '添加副线情节', 1, 4);
    if (options.includeModules.subplots && data.subplots?.subplots.length > 0) {
      PdfContentGenerator.generateSubplotsSection(data, addHeading, addText);
    }

    if (options.includeModules.ideas && data.ideas) {
      PdfContentGenerator.generateIdeasSection(data, addHeading, addText);
    }
  }

  private addText(text: string, size: number = this.fontSize, fontType = this.font): void {
    if (this.yPosition < this.pageMargin + size) {
      this.addNewPage();
    }

    this.currentPage.drawText(text, {
      x: this.pageMargin,
      y: this.yPosition,
      size,
      font: fontType,
      color: rgb(0, 0, 0),
    });

    this.yPosition -= this.lineHeight;
  }

  private addHeading(text: string, level: number = 1): void {
    const headingSizes = [18, 16, 14, 12];
    const size = headingSizes[level - 1] || 12;
    this.yPosition -= 10; // Extra space before heading
    this.addText(text, size, this.boldFont);
    this.yPosition -= 5; // Extra space after heading
  }

  private addNewPage(): void {
    this.currentPage = this.pdfDoc.addPage();
    this.yPosition = 750;
  }

  private addPageNumbers(): void {
    const pages = this.pdfDoc.getPages();
    pages.forEach((page, index) => {
      page.drawText(`${index + 1}`, {
        x: page.getWidth() / 2,
        y: 30,
        size: 10,
        font: this.font,
      });
    });
  }

  private async savePdf(data: OutlineData, options: ExportOptions): Promise<void> {
    const pdfBytes = await this.pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    const filename = BaseExportService.generateFilename(options, data, 'pdf');
    saveAs(blob, filename);
  }
}
