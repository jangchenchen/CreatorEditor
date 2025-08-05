import { 
  Document, 
  Packer, 
  Paragraph, 
  HeadingLevel, 
  TableOfContents, 
  PageBreak, 
  AlignmentType, 
  NumberFormat 
} from 'docx';
import { saveAs } from 'file-saver';
import { OutlineData } from '../../types/outline.types';
import { ExportOptions, ExportService, UpdateProgressFunction } from '../../types/exportTypes';
import { BaseExportService } from './baseExportService';
import { WordSectionGenerators } from './wordSectionGenerators';

export class WordExportService implements ExportService {
  /**
   * Export to Word document
   */
  async export(
    data: OutlineData,
    options: ExportOptions,
    updateProgress: UpdateProgressFunction
  ): Promise<void> {
    updateProgress('processing', 10, '生成Word文档结构', 1, 4);
    
    const children = [];

    // Cover page
    if (options.formatting.includeCoverPage) {
      children.push(...this.generateCoverPage(data, options));
    }

    // Table of contents
    if (options.formatting.includeTableOfContents) {
      children.push(...this.generateTableOfContents());
    }

    // Generate content sections
    await this.generateContentSections(data, options, children, updateProgress);

    updateProgress('generating', 95, '生成最终文档', 2, 4);

    const doc = this.createDocument(options, children);

    updateProgress('saving', 98, '保存Word文档', 3, 4);

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    
    const filename = BaseExportService.generateFilename(options, data, 'docx');
    saveAs(blob, filename);
  }

  private generateCoverPage(data: OutlineData, options: ExportOptions): Paragraph[] {
    return [
      new Paragraph({
        text: options.formatting.title || data.projectName,
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: `作者: ${options.formatting.author || '未知作者'}`,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: `创建时间: ${new Date(data.createdAt).toLocaleDateString('zh-CN')}`,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: `最后更新: ${new Date(data.lastUpdated).toLocaleDateString('zh-CN')}`,
        alignment: AlignmentType.CENTER,
      }),
      new PageBreak()
    ];
  }

  private generateTableOfContents(): Paragraph[] {
    return [
      new Paragraph({
        text: "目录",
        heading: HeadingLevel.HEADING_1,
      }),
      new TableOfContents("Table of Contents", {
        hyperlink: true,
        headingStyleRange: "1-3",
      }),
      new PageBreak()
    ];
  }

  private async generateContentSections(
    data: OutlineData,
    options: ExportOptions,
    children: Paragraph[],
    updateProgress: UpdateProgressFunction
  ): Promise<void> {
    const sections = [
      { key: 'story', progress: 30, step: '生成故事概述', generator: () => WordSectionGenerators.generateStorySection(data) },
      { key: 'characters', progress: 40, step: '生成角色信息', generator: () => WordSectionGenerators.generateCharactersSection(data.characters) },
      { key: 'timeline', progress: 50, step: '生成时间线', generator: () => WordSectionGenerators.generateTimelineSection(data.timeline.events) },
      { key: 'world', progress: 60, step: '生成世界设定', generator: () => WordSectionGenerators.generateWorldSection(data.world) },
      { key: 'chapters', progress: 70, step: '生成章节大纲', generator: () => WordSectionGenerators.generateChaptersSection(data.chapters.chapters) },
      { key: 'themes', progress: 80, step: '生成主题分析', generator: () => WordSectionGenerators.generateThemesSection(data.themes) },
      { key: 'subplots', progress: 85, step: '生成副线情节', generator: () => WordSectionGenerators.generateSubplotsSection(data.subplots.subplots) },
      { key: 'ideas', progress: 90, step: '生成创意想法', generator: () => WordSectionGenerators.generateIdeasSection(data.ideas) }
    ];

    for (const section of sections) {
      if (options.includeModules[section.key]) {
        updateProgress('processing', section.progress, section.step, 1, 4);
        children.push(...section.generator());
      }
    }
  }

  private createDocument(options: ExportOptions, children: Paragraph[]): Document {
    return new Document({
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            basedOn: "Normal",
            run: {
              font: options.formatting.fontFamily || "微软雅黑",
              size: (options.formatting.fontSize || 12) * 2, // Half-points
            },
          },
        ],
      },
      numbering: {
        config: [
          {
            reference: "my-numbering",
            levels: [
              {
                level: 0,
                format: NumberFormat.DECIMAL,
                text: "%1.",
                alignment: AlignmentType.LEFT,
              },
            ],
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              pageNumbers: {
                start: 1,
                formatType: NumberFormat.DECIMAL,
              },
            },
          },
          children: children,
        },
      ],
    });
  }
}