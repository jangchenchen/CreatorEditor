import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  LinearProgress,
  Chip,
  Avatar,
  Divider,
  Toolbar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import {
  MenuBook as StoryIcon,
  People as CharacterIcon,
  Timeline as TimelineIcon,
  Public as WorldIcon,
  List as ChapterIcon,
  Psychology as ThemeIcon,
  AccountTree as SubplotIcon,
  Lightbulb as IdeaIcon,
  Settings as SettingsIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectModuleCompletionRates, selectOutlineStats } from '../outlineSlice';
import { OutlineModule } from '../types/outline.types';
import CharacterRelations from './modules/CharacterRelations';

interface ModuleInfo {
  id: OutlineModule;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

const modules: ModuleInfo[] = [
  {
    id: 'story',
    title: '整体故事概述',
    description: '故事背景、核心主题与冲突、故事梗概',
    icon: <StoryIcon />,
    color: '#1976d2',
    priority: 'high'
  },
  {
    id: 'characters',
    title: '人物与角色关系',
    description: '角色档案、发展弧线、关系图谱',
    icon: <CharacterIcon />,
    color: '#9c27b0',
    priority: 'high'
  },
  {
    id: 'timeline',
    title: '情节时间线',
    description: '关键事件、情节转折点、时间线管理',
    icon: <TimelineIcon />,
    color: '#f57c00',
    priority: 'medium'
  },
  {
    id: 'world',
    title: '世界设定构建',
    description: '地理环境、社会制度、历史传承',
    icon: <WorldIcon />,
    color: '#388e3c',
    priority: 'medium'
  },
  {
    id: 'chapters',
    title: '章节大纲',
    description: '分章设计、情节安排、章节衔接',
    icon: <ChapterIcon />,
    color: '#d32f2f',
    priority: 'high'
  },
  {
    id: 'themes',
    title: '主题内涵探索',
    description: '主题深化、角色动机、情感转变',
    icon: <ThemeIcon />,
    color: '#7b1fa2',
    priority: 'low'
  },
  {
    id: 'subplots',
    title: '副线情节管理',
    description: '补充情节、次要角色故事、支线任务',
    icon: <SubplotIcon />,
    color: '#1976d2',
    priority: 'low'
  },
  {
    id: 'ideas',
    title: '创意情节联想',
    description: '灵感记录、情节备选、创意改进',
    icon: <IdeaIcon />,
    color: '#f57c00',
    priority: 'medium'
  }
];

const OutlineNavigator: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<OutlineModule | null>(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  
  const completionRates = useSelector(selectModuleCompletionRates);
  const stats = useSelector(selectOutlineStats);

  const handleModuleClick = (moduleId: OutlineModule) => {
    setSelectedModule(moduleId);
  };

  const handleBackToNavigator = () => {
    setSelectedModule(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '高优先级';
      case 'medium': return '中优先级';
      case 'low': return '低优先级';
      default: return '';
    }
  };

  // 如果选中了模块，显示对应的模块组件
  if (selectedModule) {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* 返回导航栏 */}
        <Toolbar variant="dense" sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
          <Button
            onClick={handleBackToNavigator}
            variant="outlined"
            size="small"
            sx={{ mr: 2 }}
          >
            ← 返回大纲导航
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {modules.find(m => m.id === selectedModule)?.title}
          </Typography>
        </Toolbar>

        {/* 模块内容 */}
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          {selectedModule === 'characters' && <CharacterRelations />}
          {selectedModule === 'story' && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>整体故事概述</Typography>
              <Typography color="text.secondary">此模块正在开发中...</Typography>
            </Box>
          )}
          {selectedModule === 'timeline' && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>情节时间线</Typography>
              <Typography color="text.secondary">此模块正在开发中...</Typography>
            </Box>
          )}
          {selectedModule === 'world' && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>世界设定构建</Typography>
              <Typography color="text.secondary">此模块正在开发中...</Typography>
            </Box>
          )}
          {selectedModule === 'chapters' && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>章节大纲</Typography>
              <Typography color="text.secondary">此模块正在开发中...</Typography>
            </Box>
          )}
          {selectedModule === 'themes' && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>主题内涵探索</Typography>
              <Typography color="text.secondary">此模块正在开发中...</Typography>
            </Box>
          )}
          {selectedModule === 'subplots' && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>副线情节管理</Typography>
              <Typography color="text.secondary">此模块正在开发中...</Typography>
            </Box>
          )}
          {selectedModule === 'ideas' && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>创意情节联想</Typography>
              <Typography color="text.secondary">此模块正在开发中...</Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  }

  // 显示大纲导航主页面
  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 3 }}>
      {/* 顶部工具栏 */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          小说大纲
        </Typography>
        
        <Box>
          <Tooltip title="大纲说明">
            <IconButton onClick={() => setInfoDialogOpen(true)}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="大纲设置">
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* 概览统计 */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>项目概览</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">{stats.charactersCount}</Typography>
              <Typography variant="body2" color="text.secondary">角色</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="secondary">{stats.relationshipsCount}</Typography>
              <Typography variant="body2" color="text.secondary">关系</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">{stats.chaptersCount}</Typography>
              <Typography variant="body2" color="text.secondary">章节</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">{stats.ideasCount}</Typography>
              <Typography variant="body2" color="text.secondary">创意</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* 模块网格 */}
      <Grid container spacing={3}>
        {modules.map((module) => {
          const completionRate = completionRates[module.id] || 0;
          
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={module.id}>
              <Card sx={{ height: '100%', position: 'relative' }}>
                <CardActionArea 
                  onClick={() => handleModuleClick(module.id)}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                >
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    {/* 优先级标签 */}
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <Chip
                        label={getPriorityLabel(module.priority)}
                        color={getPriorityColor(module.priority) as any}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    {/* 模块图标 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 1 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: module.color,
                          mr: 2,
                          width: 48,
                          height: 48
                        }}
                      >
                        {module.icon}
                      </Avatar>
                      <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
                        {module.title}
                      </Typography>
                    </Box>

                    {/* 模块描述 */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 2, minHeight: 40 }}
                    >
                      {module.description}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    {/* 完成度 */}
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          完成度
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {completionRate}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={completionRate}
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          bgcolor: 'grey.200'
                        }}
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* 说明对话框 */}
      <Dialog
        open={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>大纲系统说明</DialogTitle>
        <DialogContent>
          <Typography paragraph>
            本大纲系统基于专业小说创作方法论，包含8个核心模块，帮助您系统性地规划和管理小说创作的各个方面。
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>模块说明：</Typography>
          <Box component="ol" sx={{ pl: 2 }}>
            <li><strong>整体故事概述</strong>：确定故事背景、核心主题和总体脉络</li>
            <li><strong>人物与角色关系</strong>：管理角色档案和复杂的人物关系网络</li>
            <li><strong>情节时间线</strong>：规划关键事件和故事发展节奏</li>
            <li><strong>世界设定构建</strong>：构建丰富的故事背景世界</li>
            <li><strong>章节大纲</strong>：详细规划每个章节的内容和结构</li>
            <li><strong>主题内涵探索</strong>：深化故事主题和角色动机</li>
            <li><strong>副线情节管理</strong>：管理次要情节和支线故事</li>
            <li><strong>创意情节联想</strong>：记录灵感和备选情节方案</li>
          </Box>
          <Typography paragraph sx={{ mt: 2 }}>
            各模块间数据自动同步，支持导出功能。建议按优先级顺序逐步完善各模块内容。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoDialogOpen(false)}>了解</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OutlineNavigator;