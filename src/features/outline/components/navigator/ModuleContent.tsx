import React from 'react';
import { Box, Typography } from '@mui/material';
import { OutlineModule } from '../../types/outline.types';
import CharacterRelations from '../modules/CharacterRelations';

interface ModuleContentProps {
  moduleId: OutlineModule;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ moduleId }) => {
  const renderModuleContent = () => {
    switch (moduleId) {
      case 'characters':
        return <CharacterRelations />;
      
      case 'story':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>整体故事概述</Typography>
            <Typography color="text.secondary">此模块正在开发中...</Typography>
          </Box>
        );
      
      case 'timeline':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>情节时间线</Typography>
            <Typography color="text.secondary">此模块正在开发中...</Typography>
          </Box>
        );
      
      case 'world':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>世界设定构建</Typography>
            <Typography color="text.secondary">此模块正在开发中...</Typography>
          </Box>
        );
      
      case 'chapters':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>章节大纲</Typography>
            <Typography color="text.secondary">此模块正在开发中...</Typography>
          </Box>
        );
      
      case 'themes':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>主题内涵探索</Typography>
            <Typography color="text.secondary">此模块正在开发中...</Typography>
          </Box>
        );
      
      case 'subplots':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>副线情节管理</Typography>
            <Typography color="text.secondary">此模块正在开发中...</Typography>
          </Box>
        );
      
      case 'ideas':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>创意情节联想</Typography>
            <Typography color="text.secondary">此模块正在开发中...</Typography>
          </Box>
        );
      
      default:
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>未知模块</Typography>
            <Typography color="text.secondary">模块不存在或正在开发中...</Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ flex: 1, overflow: 'hidden' }}>
      {renderModuleContent()}
    </Box>
  );
};

export default ModuleContent;