import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChapters,
  selectChapterList,
  updateChapterStructure
} from '../../../../outlineSlice';
import { Chapter } from '../../../../types/outline.types';

export interface StructureStatistics {
  totalChapters: number;
  totalScenes: number;
  totalTargetWords: number;
  completedChapters: number;
  writingChapters: number;
  plannedChapters: number;
  revisionChapters: number;
  completionRate: number;
}

export interface ChaptersByStatus {
  [key: string]: Chapter[];
}

export interface StructureOverviewHook {
  statistics: StructureStatistics;
  chaptersByStatus: ChaptersByStatus;
  chapters: Chapter[];
  chaptersData: any;
  handleStructureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveStructure: () => void;
  getStatusColor: (status: Chapter['status']) => string;
  getStatusLabel: (status: Chapter['status']) => string;
}

export const useStructureOverview = (): StructureOverviewHook => {
  const dispatch = useDispatch();
  const chaptersData = useSelector(selectChapters);
  const chapters = useSelector(selectChapterList);

  // 计算整体统计
  const statistics = useMemo((): StructureStatistics => {
    const totalChapters = chapters.length;
    const totalScenes = chapters.reduce((sum, chapter) => sum + chapter.keyScenes.length, 0);
    const totalTargetWords = chapters.reduce((sum, chapter) => sum + chapter.wordCountTarget, 0);
    const completedChapters = chapters.filter(c => c.status === 'completed').length;
    const writingChapters = chapters.filter(c => c.status === 'writing').length;
    const plannedChapters = chapters.filter(c => c.status === 'planned').length;
    const revisionChapters = chapters.filter(c => c.status === 'revision').length;

    return {
      totalChapters,
      totalScenes,
      totalTargetWords,
      completedChapters,
      writingChapters,
      plannedChapters,
      revisionChapters,
      completionRate: totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0
    };
  }, [chapters]);

  // 按状态分组章节
  const chaptersByStatus = useMemo((): ChaptersByStatus => {
    return chapters.reduce((acc, chapter) => {
      if (!acc[chapter.status]) {
        acc[chapter.status] = [];
      }
      acc[chapter.status].push(chapter);
      return acc;
    }, {} as Record<string, Chapter[]>);
  }, [chapters]);

  const handleStructureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateChapterStructure(event.target.value));
  };

  const handleSaveStructure = () => {
    console.log('保存结构说明');
    // TODO: 实现保存功能
  };

  const getStatusColor = (status: Chapter['status']): string => {
    const colors = {
      planned: 'default',
      writing: 'primary',
      completed: 'success',
      revision: 'warning'
    } as const;
    return colors[status] || 'default';
  };

  const getStatusLabel = (status: Chapter['status']): string => {
    const labels = {
      planned: '计划中',
      writing: '写作中',
      completed: '已完成',
      revision: '修订中'
    };
    return labels[status] || status;
  };

  return {
    statistics,
    chaptersByStatus,
    chapters,
    chaptersData,
    handleStructureChange,
    handleSaveStructure,
    getStatusColor,
    getStatusLabel
  };
};