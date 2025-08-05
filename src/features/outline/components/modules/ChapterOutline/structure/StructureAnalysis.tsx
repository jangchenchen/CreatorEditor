import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { StructureStatistics } from './useStructureOverview';

interface StructureAnalysisProps {
  statistics: StructureStatistics;
}

const StructureAnalysis: React.FC<StructureAnalysisProps> = ({ statistics }) => {
  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        结构分析建议
      </Typography>
      
      {/* 根据当前状态给出建议 */}
      <Box sx={{ mb: 2 }}>
        {statistics.totalChapters === 0 && (
          <Typography variant="body2" color="warning.main">
            📝 建议先规划基本的章节结构，确定大致的章节数量和每章的主要内容
          </Typography>
        )}
        
        {statistics.totalChapters > 0 && statistics.totalScenes === 0 && (
          <Typography variant="body2" color="info.main">
            🎬 已有章节框架，建议为每章添加具体的场景设计
          </Typography>
        )}
        
        {statistics.totalScenes > 0 && statistics.completedChapters === 0 && (
          <Typography variant="body2" color="primary.main">
            ✍️ 场景规划完善，可以开始具体的写作工作
          </Typography>
        )}
        
        {statistics.completionRate > 50 && (
          <Typography variant="body2" color="success.main">
            🎉 进度良好！建议定期回顾已完成章节，保持整体一致性
          </Typography>
        )}
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle2" gutterBottom>
        结构优化要点：
      </Typography>
      <List dense>
        <ListItem>
          <ListItemIcon>•</ListItemIcon>
          <ListItemText 
            primary="章节长度平衡"
            secondary="每章字数相对均衡，避免某章过长或过短"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>•</ListItemIcon>
          <ListItemText 
            primary="情节起伏节奏"
            secondary="高潮低潮交替，给读者适当的缓冲时间"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>•</ListItemIcon>
          <ListItemText 
            primary="角色发展连贯"
            secondary="确保主要角色在各章节中有连续的发展轨迹"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>•</ListItemIcon>
          <ListItemText 
            primary="线索伏笔呼应"
            secondary="前后章节的伏笔和呼应要有明确的对应关系"
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default StructureAnalysis;