import React, { useState } from 'react';
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
  ListItemSecondaryAction,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Save as SaveIcon,
  ExpandMore as ExpandMoreIcon,
  AutoAwesome as InspirationIcon,
  Psychology as BrainstormingIcon,
  Book as BookIcon,
  Movie as MovieIcon,
  MusicNote as MusicIcon,
  Image as ImageIcon,
  Public as WebIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import {
  selectOutline
} from '../../../outlineSlice';

const InspirationSources: React.FC = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const ideas = outline.ideas;
  
  const [inspirationSources, setInspirationSources] = useState<string[]>(ideas.inspirationSources);
  const [brainstormingSessions, setBrainstormingSessions] = useState<string[]>(ideas.brainstormingSessions);
  const [newSource, setNewSource] = useState('');
  const [newSession, setNewSession] = useState('');

  const handleAddSource = () => {
    if (newSource.trim() && !inspirationSources.includes(newSource.trim())) {
      setInspirationSources([...inspirationSources, newSource.trim()]);
      setNewSource('');
    }
  };

  const handleRemoveSource = (index: number) => {
    setInspirationSources(inspirationSources.filter((_, i) => i !== index));
  };

  const handleAddSession = () => {
    if (newSession.trim()) {
      setBrainstormingSessions([...brainstormingSessions, newSession.trim()]);
      setNewSession('');
    }
  };

  const handleRemoveSession = (index: number) => {
    setBrainstormingSessions(brainstormingSessions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // TODO: 使用 dispatch 更新 Redux state
    const updatedData = {
      inspirationSources,
      brainstormingSessions
    };
    console.log('保存灵感来源:', updatedData);
  };

  const getSourceIcon = (source: string) => {
    const lowerSource = source.toLowerCase();
    if (lowerSource.includes('书') || lowerSource.includes('小说') || lowerSource.includes('文学')) {
      return <BookIcon color="primary" />;
    } else if (lowerSource.includes('电影') || lowerSource.includes('影视') || lowerSource.includes('电视')) {
      return <MovieIcon color="secondary" />;
    } else if (lowerSource.includes('音乐') || lowerSource.includes('歌曲') || lowerSource.includes('歌词')) {
      return <MusicIcon color="success" />;
    } else if (lowerSource.includes('图') || lowerSource.includes('画') || lowerSource.includes('艺术')) {
      return <ImageIcon color="warning" />;
    } else if (lowerSource.includes('网') || lowerSource.includes('网站') || lowerSource.includes('博客')) {
      return <WebIcon color="info" />;
    } else if (lowerSource.includes('人') || lowerSource.includes('对话') || lowerSource.includes('交流')) {
      return <PersonIcon color="error" />;
    }
    return <InspirationIcon />;
  };

  // 预设的灵感来源分类
  const inspirationCategories = [
    {
      title: '文学作品',
      examples: ['经典小说', '诗歌作品', '戏剧剧本', '散文集', '传记文学'],
      icon: <BookIcon color="primary" />
    },
    {
      title: '影视娱乐',
      examples: ['电影作品', '电视剧', '纪录片', '动画片', '短视频'],
      icon: <MovieIcon color="secondary" />
    },
    {
      title: '音乐艺术',
      examples: ['音乐作品', '歌词内容', '音乐剧', '演唱会', '音乐故事'],
      icon: <MusicIcon color="success" />
    },
    {
      title: '视觉艺术',
      examples: ['绘画作品', '摄影作品', '雕塑艺术', '建筑设计', '平面设计'],
      icon: <ImageIcon color="warning" />
    },
    {
      title: '网络资源',
      examples: ['网络文章', '社交媒体', '在线论坛', '博客内容', '新闻报道'],
      icon: <WebIcon color="info" />
    },
    {
      title: '人际交流',
      examples: ['朋友对话', '专家访谈', '读者反馈', '创作交流', '生活观察'],
      icon: <PersonIcon color="error" />
    }
  ];

  const brainstormingTechniques = [
    '自由联想：不限制思维，写下所有想到的内容',
    '问题驱动：针对特定问题进行深入思考',
    '角色视角：从不同角色的角度思考情节',
    '场景想象：详细描绘特定场景的各种可能',
    '关键词扩展：从核心关键词发散思维',
    '时间线分析：沿着时间线思考事件发展',
    '对比分析：比较不同选择的结果',
    '情感深挖：深入探索角色的情感变化'
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        灵感来源与创意管理
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        系统地管理和记录创作灵感的来源，以及头脑风暴的思考过程。
      </Typography>

      {/* 灵感来源管理 */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <InspirationIcon sx={{ mr: 1, color: 'primary.main' }} />
            灵感来源 ({inspirationSources.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* 添加新来源 */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <TextField
              fullWidth
              size="small"
              label="添加灵感来源"
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSource()}
              placeholder="例如: 《百年孤独》、宫崎骏电影、古典音乐..."
            />
            <Button 
              variant="contained" 
              onClick={handleAddSource}
              disabled={!newSource.trim()}
              startIcon={<AddIcon />}
            >
              添加
            </Button>
          </Box>

          {/* 已有来源列表 */}
          {inspirationSources.length > 0 ? (
            <List>
              {inspirationSources.map((source, index) => (
                <ListItem key={index} sx={{ bgcolor: 'grey.50', mb: 1, borderRadius: 1 }}>
                  <ListItemIcon>
                    {getSourceIcon(source)}
                  </ListItemIcon>
                  <ListItemText primary={source} />
                  <ListItemSecondaryAction>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleRemoveSource(index)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              暂无灵感来源记录
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* 头脑风暴会话 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <BrainstormingIcon sx={{ mr: 1, color: 'secondary.main' }} />
            头脑风暴记录 ({brainstormingSessions.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* 添加新会话 */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="记录头脑风暴过程"
              value={newSession}
              onChange={(e) => setNewSession(e.target.value)}
              placeholder="记录您的思考过程、灵感闪现、创意碰撞的详细内容..."
              sx={{ mb: 2 }}
            />
            <Button 
              variant="contained" 
              onClick={handleAddSession}
              disabled={!newSession.trim()}
              startIcon={<AddIcon />}
            >
              保存会话
            </Button>
          </Box>

          {/* 已有会话列表 */}
          {brainstormingSessions.length > 0 ? (
            <Grid container spacing={2}>
              {brainstormingSessions.map((session, index) => (
                <Grid item xs={12} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="subtitle1" color="secondary">
                          头脑风暴 #{index + 1}
                        </Typography>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleRemoveSession(index)}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {session}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              暂无头脑风暴记录
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* 保存按钮 */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
          startIcon={<SaveIcon />}
          sx={{ minWidth: 140 }}
        >
          保存灵感管理
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 灵感来源分类参考 */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            灵感来源分类参考
          </Typography>
          <Grid container spacing={2}>
            {inspirationCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      {category.icon}
                      <Box sx={{ ml: 1 }}>{category.title}</Box>
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {category.examples.map((example, exIndex) => (
                        <Chip 
                          key={exIndex}
                          label={example}
                          size="small"
                          variant="outlined"
                          onClick={() => setNewSource(example)}
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* 头脑风暴技巧指南 */}
      <Card elevation={1}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            头脑风暴技巧指南
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            有效的头脑风暴能够激发创意思维，以下技巧可以帮助您获得更多灵感：
          </Typography>
          
          <Grid container spacing={2}>
            {brainstormingTechniques.map((technique, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent sx={{ py: 2 }}>
                    <Typography variant="body2">
                      <strong>{technique.split('：')[0]}：</strong>
                      {technique.split('：')[1]}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="primary" gutterBottom>
            💡 创意管理建议
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • 定期回顾和整理灵感来源，发现创作偏好和灵感模式<br/>
            • 保持开放的心态，从各种媒介和日常生活中寻找灵感<br/>
            • 及时记录灵感闪现，不要依赖记忆保存重要想法<br/>
            • 建立个人的创意素材库，分类管理不同类型的灵感<br/>
            • 定期进行头脑风暴练习，保持创意思维的活跃状态
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InspirationSources;