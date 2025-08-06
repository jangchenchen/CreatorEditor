/**
 * Weaving Strategy Hook
 * Manages subplot weaving strategy state and operations
 */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOutline } from '../../../outlineSlice';

export interface WeavingStrategyData {
  integrationMethod: string;
  pacingStrategy: string;
  balancePoints: string[];
  connectionPoints: Array<{
    subplotId: string;
    chapterId: string;
    connectionType: string;
    description: string;
  }>;
  riskFactors: Array<{
    factor: string;
    severity: 'low' | 'medium' | 'high';
    solution: string;
  }>;
}

export const useWeavingStrategy = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const subplots = outline.subplots.subplots;
  const chapters = outline.chapters.chapters;

  const [strategy, setStrategy] = useState<WeavingStrategyData>(outline.subplots.weavingStrategy);

  // 分析副线分布
  const analyzeSubplotDistribution = () => {
    const distribution: Record<string, number> = {};

    subplots.forEach(subplot => {
      subplot.chapterConnections.forEach(chapterId => {
        distribution[chapterId] = (distribution[chapterId] || 0) + 1;
      });
    });

    return {
      distribution,
      averagePerChapter:
        Object.keys(distribution).length > 0
          ? Object.values(distribution).reduce((a, b) => a + b, 0) /
            Object.keys(distribution).length
          : 0,
      maxConcentration: Math.max(...Object.values(distribution), 0),
      chaptersWithSubplots: Object.keys(distribution).length,
    };
  };

  // 检查副线平衡
  const checkSubplotBalance = () => {
    const issues: string[] = [];
    const analysis = analyzeSubplotDistribution();

    if (analysis.maxConcentration > analysis.averagePerChapter * 2) {
      issues.push('某些章节副线过于集中');
    }

    if (analysis.chaptersWithSubplots < chapters.length * 0.7) {
      issues.push('副线分布不够广泛');
    }

    subplots.forEach(subplot => {
      if (subplot.chapterConnections.length < 2) {
        issues.push(`副线"${subplot.title}"连接章节过少`);
      }
    });

    return issues;
  };

  // 生成编织建议
  const generateWeavingSuggestions = () => {
    const suggestions: string[] = [];
    const balance = checkSubplotBalance();

    if (balance.includes('某些章节副线过于集中')) {
      suggestions.push('考虑将集中的副线分散到更多章节中');
    }

    if (balance.includes('副线分布不够广泛')) {
      suggestions.push('增加副线在更多章节中的出现');
    }

    if (subplots.length > 3) {
      suggestions.push('考虑创建副线之间的关联，增强整体性');
    }

    return suggestions;
  };

  const updateStrategy = (updates: Partial<WeavingStrategyData>) => {
    setStrategy(prev => ({ ...prev, ...updates }));
  };

  const saveStrategy = () => {
    // TODO: 使用 dispatch 更新 Redux state
    console.log('保存编织策略:', strategy);
  };

  return {
    // Data
    strategy,
    subplots,
    chapters,

    // Analysis
    analyzeSubplotDistribution,
    checkSubplotBalance,
    generateWeavingSuggestions,

    // Actions
    updateStrategy,
    saveStrategy,
  };
};
