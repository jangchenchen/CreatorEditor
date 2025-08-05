import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  LinearProgress,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  MenuBook as ChapterIcon,
  Movie as SceneIcon,
  TrendingUp as ProgressIcon,
  AccountTree as StructureIcon,
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import {
  selectChapters,
  selectChapterList,
  updateChapterStructure
} from '../../../outlineSlice';
import { Chapter } from '../../../types/outline.types';

const StructureOverview: React.FC = () => {
  const dispatch = useDispatch();
  const chaptersData = useSelector(selectChapters);
  const chapters = useSelector(selectChapterList);

  // 计算整体统计
  const statistics = useMemo(() => {
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
  const chaptersByStatus = useMemo(() => {
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

  const getStatusColor = (status: Chapter['status']) => {
    const colors = {
      planned: 'default',
      writing: 'primary',
      completed: 'success',
      revision: 'warning'
    } as const;
    return colors[status] || 'default';
  };

  const getStatusLabel = (status: Chapter['status']) => {
    const labels = {
      planned: '计划中',
      writing: '写作中',
      completed: '已完成',
      revision: '修订中'
    };
    return labels[status] || status;
  };

  return (
    <Box>
      {/* 整体统计 */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <StructureIcon sx={{ mr: 1 }} />
          小说结构统计
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary">
                {statistics.totalChapters}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                总章节数
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="info.main">
                {statistics.totalScenes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                总场景数
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="secondary">
                {statistics.totalTargetWords.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                目标字数
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="success.main">
                {statistics.completionRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                完成度
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* 进度条 */}
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              整体进度
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {statistics.completedChapters}/{statistics.totalChapters} 章节完成
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={statistics.completionRate} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      </Paper>

      {/* 章节状态分布 */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          章节状态分布
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="h4" color="text.secondary">
                {statistics.plannedChapters}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                计划中
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
              <Typography variant="h4" color="primary">
                {statistics.writingChapters}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                写作中
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
              <Typography variant="h4" color="success.main">
                {statistics.completedChapters}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                已完成
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.50', borderRadius: 1 }}>
              <Typography variant="h4" color="warning.main">
                {statistics.revisionChapters}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                修订中
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* 章节结构流程 */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          章节结构流程
        </Typography>
        
        {chapters.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            暂无章节，请先添加章节
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {chapters.map((chapter, index) => (
              <Card key={chapter.id} elevation={1}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                      <ChapterIcon sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1">
                          第{chapter.number}章: {chapter.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Chip 
                            label={getStatusLabel(chapter.status)}
                            color={getStatusColor(chapter.status)}
                            size="small"
                          />
                          <Chip 
                            label={`${chapter.keyScenes.length} 场景`}
                            size="small"
                            variant="outlined"
                          />
                          <Chip 
                            label={`${chapter.wordCountTarget} 字`}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                    </Box>
                    
                    {/* 章节过渡信息 */}
                    {(chapter.transitions.from || chapter.transitions.to) && (
                      <Box sx={{ ml: 2, minWidth: 200 }}>
                        <Typography variant="caption" color="text.secondary">
                          过渡: {chapter.transitions.method || '未设置'}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  {/* 章节概述 */}
                  {chapter.summary && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 5 }}>
                      {chapter.summary}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Paper>

      {/* 整体结构说明 */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          整体结构说明
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          value={chaptersData.overallStructure}
          onChange={handleStructureChange}
          placeholder="描述小说的整体结构特点、章节安排的逻辑、情节发展的节奏等..."
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveStructure}
        >
          保存结构说明
        </Button>
      </Paper>

      {/* 结构分析建议 */}
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
    </Box>
  );
};

export default StructureOverview;