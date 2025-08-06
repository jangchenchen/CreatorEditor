// @ts-nocheck
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectOutlineData } from '../slices/rootOutlineSlice';
import { OutlineData } from '../types/outline.types';
import { ExportOptions, ExportProgress } from '../services/documentExportService';

export const useExportData = () => {
  const outlineData = useSelector(selectOutlineData);

  const getDefaultOptions = useCallback((): ExportOptions => {
    const defaultOptions = {
      format: 'json' as const,
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
    };

    // Auto-fill title and author from outline data if available
    if (outlineData) {
      defaultOptions.formatting.title = outlineData.projectName || '';
      // Could potentially extract author from story data if available
    }

    return defaultOptions;
  }, [outlineData]);

  const validateExportData = useCallback((): { isValid: boolean; issues: string[] } => {
    const issues: string[] = [];

    if (!outlineData) {
      issues.push('没有可导出的项目数据');
      return { isValid: false, issues };
    }

    // Check if there's any content to export
    let hasContent = false;

    if (
      outlineData.story &&
      (outlineData.story.background?.era ||
        outlineData.story.coreTheme?.theme ||
        outlineData.story.synopsis?.beginning)
    ) {
      hasContent = true;
    }

    if (outlineData.characters && outlineData.characters.length > 0) {
      hasContent = true;
    }

    if (
      outlineData.timeline &&
      outlineData.timeline.events &&
      outlineData.timeline.events.length > 0
    ) {
      hasContent = true;
    }

    if (
      outlineData.chapters &&
      outlineData.chapters.chapters &&
      outlineData.chapters.chapters.length > 0
    ) {
      hasContent = true;
    }

    if (
      outlineData.subplots &&
      outlineData.subplots.subplots &&
      outlineData.subplots.subplots.length > 0
    ) {
      hasContent = true;
    }

    if (outlineData.ideas && outlineData.ideas.ideas && outlineData.ideas.ideas.length > 0) {
      hasContent = true;
    }

    if (!hasContent) {
      issues.push('项目中没有足够的内容可以导出');
    }

    // Check for potential data quality issues
    if (outlineData.characters) {
      const charactersWithoutNames = outlineData.characters.filter(
        c => !c.name || c.name.trim() === ''
      );
      if (charactersWithoutNames.length > 0) {
        issues.push(`发现 ${charactersWithoutNames.length} 个角色没有名称`);
      }
    }

    if (outlineData.chapters && outlineData.chapters.chapters) {
      const chaptersWithoutTitles = outlineData.chapters.chapters.filter(
        c => !c.title || c.title.trim() === ''
      );
      if (chaptersWithoutTitles.length > 0) {
        issues.push(`发现 ${chaptersWithoutTitles.length} 个章节没有标题`);
      }

      const chaptersWithoutSummary = outlineData.chapters.chapters.filter(
        c => !c.summary || c.summary.trim() === ''
      );
      if (chaptersWithoutSummary.length > 0) {
        issues.push(`发现 ${chaptersWithoutSummary.length} 个章节没有概述`);
      }
    }

    if (outlineData.timeline && outlineData.timeline.events) {
      const eventsWithoutTitles = outlineData.timeline.events.filter(
        e => !e.title || e.title.trim() === ''
      );
      if (eventsWithoutTitles.length > 0) {
        issues.push(`发现 ${eventsWithoutTitles.length} 个时间线事件没有标题`);
      }
    }

    return {
      isValid: issues.length === 0 || hasContent, // Allow export even with minor issues if there's content
      issues,
    };
  }, [outlineData]);

  return {
    outlineData,
    getDefaultOptions,
    validateExportData,
  };
};
