import { useMemo } from 'react';
import { CreativeIdea, IdeaType, IdeaStatus } from '../../../../types/outline.types';

export const useIdeasFiltering = (
  ideas: CreativeIdea[],
  filterType: IdeaType | 'all',
  filterStatus: IdeaStatus | 'all'
) => {
  // 过滤和排序创意
  const filteredAndSortedIdeas = useMemo(() => {
    let filtered = ideas;

    if (filterType !== 'all') {
      filtered = filtered.filter(idea => idea.type === filterType);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(idea => idea.status === filterStatus);
    }

    // 按优先级和更新时间排序
    return filtered.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority; // 高优先级在前
      }
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    });
  }, [ideas, filterType, filterStatus]);

  // 按类型分组
  const ideasByType = useMemo(() => {
    return filteredAndSortedIdeas.reduce(
      (acc, idea) => {
        if (!acc[idea.type]) {
          acc[idea.type] = [];
        }
        acc[idea.type].push(idea);
        return acc;
      },
      {} as Record<IdeaType, CreativeIdea[]>
    );
  }, [filteredAndSortedIdeas]);

  return {
    filteredAndSortedIdeas,
    ideasByType,
  };
};
