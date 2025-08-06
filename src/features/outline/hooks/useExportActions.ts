import { useCallback } from 'react';
import { ExportOptions } from '../services/documentExportService';
import { DocumentExportService } from '../services/documentExportService';

export const useExportActions = (startExport: any, outlineData: any) => {
  const exportDocument = useCallback(
    async (options: ExportOptions) => {
      await startExport(outlineData, options, DocumentExportService.exportDocument);
    },
    [startExport, outlineData]
  );

  const exportToJSON = useCallback(
    async (options: Partial<ExportOptions> = {}) => {
      const fullOptions: ExportOptions = {
        format: 'json',
        includeFormatting: true,
        includeImages: false,
        language: 'zh-CN',
        formatting: {
          title: '',
          author: '',
          fontSize: 12,
          lineHeight: 1.5,
          margins: {
            top: 2.5,
            right: 2.5,
            bottom: 2.5,
            left: 2.5,
          },
        },
        content: {
          includeProjectInfo: true,
          includeStory: true,
          includeCharacters: true,
          includeTimeline: true,
          includeChapters: true,
          includeSubplots: true,
          includeIdeas: true,
          includeWorld: true,
        },
        ...options,
      };
      await exportDocument(fullOptions);
    },
    [exportDocument]
  );

  const exportToWord = useCallback(
    async (options: Partial<ExportOptions> = {}) => {
      const fullOptions: ExportOptions = {
        format: 'docx',
        includeFormatting: true,
        includeImages: false,
        language: 'zh-CN',
        formatting: {
          title: '',
          author: '',
          fontSize: 12,
          lineHeight: 1.5,
          margins: {
            top: 2.5,
            right: 2.5,
            bottom: 2.5,
            left: 2.5,
          },
        },
        content: {
          includeProjectInfo: true,
          includeStory: true,
          includeCharacters: true,
          includeTimeline: true,
          includeChapters: true,
          includeSubplots: true,
          includeIdeas: true,
          includeWorld: true,
        },
        ...options,
      };
      await exportDocument(fullOptions);
    },
    [exportDocument]
  );

  const exportToPDF = useCallback(
    async (options: Partial<ExportOptions> = {}) => {
      const fullOptions: ExportOptions = {
        format: 'pdf',
        includeFormatting: true,
        includeImages: false,
        language: 'zh-CN',
        formatting: {
          title: '',
          author: '',
          fontSize: 12,
          lineHeight: 1.5,
          margins: {
            top: 2.5,
            right: 2.5,
            bottom: 2.5,
            left: 2.5,
          },
        },
        content: {
          includeProjectInfo: true,
          includeStory: true,
          includeCharacters: true,
          includeTimeline: true,
          includeChapters: true,
          includeSubplots: true,
          includeIdeas: true,
          includeWorld: true,
        },
        ...options,
      };
      await exportDocument(fullOptions);
    },
    [exportDocument]
  );

  return {
    exportDocument,
    exportToJSON,
    exportToWord,
    exportToPDF,
  };
};
