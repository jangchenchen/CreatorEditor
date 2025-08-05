import React from 'react';
import {
  Box,
  Typography,
  Chip,
  LinearProgress,
  Alert
} from '@mui/material';
import { CheckCircle as CheckIcon } from '@mui/icons-material';
import { ExportOptions } from '../../services/documentExportService';

interface ExportConfirmationStepProps {
  exportOptions: ExportOptions;
  isExporting: boolean;
  progress: any;
  lastExportError: string | null;
}

export const ExportConfirmationStep: React.FC<ExportConfirmationStepProps> = ({
  exportOptions,
  isExporting,
  progress,
  lastExportError
}) => {
  const selectedModules = Object.entries(exportOptions.includeModules)
    .filter(([_, selected]) => selected)
    .map(([module, _]) => {
      const moduleNames: Record<string, string> = {
        story: '故事概述',
        characters: '角色设定',
        timeline: '情节时间线',
        world: '世界设定',
        chapters: '章节大纲',
        themes: '主题分析',
        subplots: '副线情节',
        ideas: '创意想法'
      };
      return moduleNames[module] || module;
    });

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        确认导出设置
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          导出格式
        </Typography>
        <Chip 
          label={
            exportOptions.format === 'json' ? 'JSON 格式' :
            exportOptions.format === 'docx' ? 'Word 文档' : 'PDF 文档'
          }
          color="primary"
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          包含模块 ({selectedModules.length} 个)
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedModules.map(module => (
            <Chip key={module} label={module} variant="outlined" size="small" />
          ))}
        </Box>
      </Box>

      {(exportOptions.format === 'docx' || exportOptions.format === 'pdf') && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            文档设置
          </Typography>
          <Typography variant="body2" color="text.secondary">
            标题: {exportOptions.formatting.title || '未设置'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            作者: {exportOptions.formatting.author || '未设置'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            字体: {exportOptions.formatting.fontFamily} {exportOptions.formatting.fontSize}pt
          </Typography>
        </Box>
      )}

      {isExporting && progress && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            {progress.currentStep} ({progress.currentStepIndex + 1}/{progress.totalSteps})
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress.progress} 
            sx={{ mb: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            {progress.progress.toFixed(0)}% 完成
          </Typography>
        </Box>
      )}

      {lastExportError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          导出失败: {lastExportError}
        </Alert>
      )}

      {progress?.stage === 'complete' && (
        <Alert severity="success" icon={<CheckIcon />}>
          导出完成！文件已保存到下载目录。
        </Alert>
      )}
    </Box>
  );
};