import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
}

const InfoDialog: React.FC<InfoDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>大纲系统说明</DialogTitle>
      <DialogContent>
        <Typography paragraph>
          本大纲系统基于专业小说创作方法论，包含8个核心模块，帮助您系统性地规划和管理小说创作的各个方面。
        </Typography>
        <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
          模块说明：
        </Typography>
        <Box component='ol' sx={{ pl: 2 }}>
          <li>
            <strong>整体故事概述</strong>：确定故事背景、核心主题和总体脉络
          </li>
          <li>
            <strong>人物与角色关系</strong>：管理角色档案和复杂的人物关系网络
          </li>
          <li>
            <strong>情节时间线</strong>：规划关键事件和故事发展节奏
          </li>
          <li>
            <strong>世界设定构建</strong>：构建丰富的故事背景世界
          </li>
          <li>
            <strong>章节大纲</strong>：详细规划每个章节的内容和结构
          </li>
          <li>
            <strong>主题内涵探索</strong>：深化故事主题和角色动机
          </li>
          <li>
            <strong>副线情节管理</strong>：管理次要情节和支线故事
          </li>
          <li>
            <strong>创意情节联想</strong>：记录灵感和备选情节方案
          </li>
        </Box>
        <Typography paragraph sx={{ mt: 2 }}>
          各模块间数据自动同步，支持导出功能。建议按优先级顺序逐步完善各模块内容。
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>了解</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
