// @ts-nocheck
import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import {
  StrategyDescription,
  SubplotDistributionAnalysis,
  IssuesCheck,
  WeavingTechniquesGuide,
  StrategyTemplates,
} from './index';

interface Subplot {
  id: string;
  title: string;
  startChapter: number;
  endChapter: number;
  chapterConnections: string[];
}

interface Chapter {
  id: string;
  number: number;
  title: string;
}

const WeavingStrategy: React.FC = () => {
  // Mock data - in real app this would come from Redux
  const [strategy, setStrategy] = useState('');
  const subplots: Subplot[] = [];
  const chapters: Chapter[] = [];

  // 分析副线分布
  const analyzeSubplotDistribution = () => {
    const distribution: { [chapter: number]: string[] } = {};

    subplots.forEach(subplot => {
      for (let i = subplot.startChapter; i <= subplot.endChapter; i++) {
        if (!distribution[i]) {
          distribution[i] = [];
        }
        distribution[i].push(subplot.title);
      }
    });

    return distribution;
  };

  // 检查潜在问题
  const checkPotentialIssues = () => {
    const issues: string[] = [];
    const distribution = analyzeSubplotDistribution();

    // 检查副线过载的章节
    Object.entries(distribution).forEach(([chapter, subplotTitles]) => {
      if (subplotTitles.length > 3) {
        issues.push(`第${chapter}章副线过多 (${subplotTitles.length}个)`);
      }
    });

    // 检查没有副线的长段落
    const emptyChapters: number[] = [];
    for (let i = 1; i <= chapters.length; i++) {
      if (!distribution[i] || distribution[i].length === 0) {
        emptyChapters.push(i);
      }
    }

    if (emptyChapters.length > 3) {
      issues.push(`连续章节缺少副线支撑: 第${emptyChapters.slice(0, 3).join(', ')}章等`);
    }

    // 检查副线时长
    subplots.forEach(subplot => {
      const duration = subplot.endChapter - subplot.startChapter + 1;
      if (duration > chapters.length * 0.8) {
        issues.push(`副线"${subplot.title}"跨度过长 (${duration}章)`);
      } else if (duration === 1) {
        issues.push(`副线"${subplot.title}"跨度过短 (仅1章)`);
      }
    });

    return issues;
  };

  const handleSave = () => {
    // TODO: 使用 dispatch 更新 Redux state
    console.log('保存编织策略:', strategy);
  };

  const distribution = analyzeSubplotDistribution();
  const issues = checkPotentialIssues();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant='h6' gutterBottom>
        副线编织策略
      </Typography>
      <Typography variant='body2' color='text.secondary' paragraph>
        制定将副线情节有机融入主线的策略，确保故事节奏和结构的平衡。
      </Typography>

      {/* 整体策略描述 */}
      <StrategyDescription value={strategy} onChange={setStrategy} onSave={handleSave} />

      {/* 副线分布分析 */}
      <SubplotDistributionAnalysis chapters={chapters} distribution={distribution} />

      {/* 潜在问题检查 */}
      <IssuesCheck issues={issues} />

      {/* 编织技巧指南 */}
      <WeavingTechniquesGuide />

      <Divider sx={{ my: 3 }} />

      {/* 策略模板 */}
      <StrategyTemplates />
    </Box>
  );
};

export default WeavingStrategy;
