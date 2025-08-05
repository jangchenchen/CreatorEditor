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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Divider,
  Chip,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Hub as StrategyIcon,
  Timeline as TimelineIcon,
  Balance as BalanceIcon,
  Speed as PaceIcon,
  Layers as IntegrationIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { selectOutline } from '../../../outlineSlice';

const WeavingStrategy: React.FC = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const subplots = outline.subplots.subplots;
  const chapters = outline.chapters.chapters;
  const [weavingStrategy, setWeavingStrategy] = useState(outline.subplots.weavingStrategy);

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
    console.log('保存编织策略:', weavingStrategy);
  };

  const distribution = analyzeSubplotDistribution();
  const issues = checkPotentialIssues();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        副线编织策略
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        制定将副线情节有机融入主线的策略，确保故事节奏和结构的平衡。
      </Typography>

      {/* 整体策略描述 */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <StrategyIcon sx={{ mr: 1, color: 'primary.main' }} />
            编织策略说明
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="编织策略"
            value={weavingStrategy}
            onChange={(e) => setWeavingStrategy(e.target.value)}
            placeholder="描述如何将各个副线有机地编织到主线中，包括引入时机、发展节奏、交汇点、解决顺序等..."
            variant="outlined"
            sx={{ mb: 2 }}
          />
          
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            保存策略
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* 副线分布分析 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <TimelineIcon sx={{ mr: 1, color: 'info.main' }} />
            副线分布分析
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {chapters.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              暂无章节信息，无法进行分布分析
            </Typography>
          ) : (
            <TableContainer component={Paper} elevation={1}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>章节</TableCell>
                    <TableCell>副线数量</TableCell>
                    <TableCell>涉及副线</TableCell>
                    <TableCell>状态</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chapters.map((chapter) => {
                    const chapterSubplots = distribution[chapter.number] || [];
                    const getStatusColor = () => {
                      if (chapterSubplots.length === 0) return 'default';
                      if (chapterSubplots.length > 3) return 'error';
                      if (chapterSubplots.length > 1) return 'warning';
                      return 'success';
                    };
                    
                    return (
                      <TableRow key={chapter.id}>
                        <TableCell>第{chapter.number}章</TableCell>
                        <TableCell>{chapterSubplots.length}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {chapterSubplots.slice(0, 2).map((title, index) => (
                              <Chip key={index} label={title} size="small" variant="outlined" />
                            ))}
                            {chapterSubplots.length > 2 && (
                              <Chip label={`+${chapterSubplots.length - 2}`} size="small" variant="outlined" />
                            )}
                            {chapterSubplots.length === 0 && (
                              <Typography variant="caption" color="text.secondary">无</Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={
                              chapterSubplots.length === 0 ? '空白' :
                              chapterSubplots.length > 3 ? '过载' :
                              chapterSubplots.length > 1 ? '繁忙' : '正常'
                            }
                            color={getStatusColor()}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </AccordionDetails>
      </Accordion>

      {/* 潜在问题检查 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
            潜在问题检查 ({issues.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {issues.length === 0 ? (
            <Alert severity="success" icon={<CheckIcon />}>
              <Typography variant="body2">
                未发现明显的结构问题，副线分布相对合理。
              </Typography>
            </Alert>
          ) : (
            <Box>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  发现 {issues.length} 个潜在问题，建议优化副线安排：
                </Typography>
              </Alert>
              
              <List>
                {issues.map((issue, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <WarningIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={issue} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>

      {/* 编织技巧指南 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <IntegrationIcon sx={{ mr: 1, color: 'success.main' }} />
            编织技巧指南
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <PaceIcon sx={{ mr: 1 }} />
                    节奏控制
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="交替发展"
                        secondary="主线和副线交替推进，避免某条线索停滞太久"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="张弛有度"
                        secondary="在主线高潮时适当缓解，用副线提供喘息空间"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="逐步升级"
                        secondary="副线的冲突强度要与主线形成合理的层次关系"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1" color="secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <BalanceIcon sx={{ mr: 1 }} />
                    平衡技巧
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="权重分配"
                        secondary="主线占60-70%，副线合计占30-40%"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="角色轮换"
                        secondary="让不同角色轮流成为焦点，保持读者兴趣"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="情感层次"
                        secondary="用副线丰富情感色彩和主题深度"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1" color="success.main" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <IntegrationIcon sx={{ mr: 1 }} />
                    融合策略
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="共同角色"
                        secondary="通过共同的角色将不同线索连接起来"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="事件关联"
                        secondary="让副线事件对主线产生直接或间接影响"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="主题呼应"
                        secondary="副线应该呼应或深化主线的核心主题"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1" color="warning.main" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <WarningIcon sx={{ mr: 1 }} />
                    常见问题
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="喧宾夺主"
                        secondary="副线过于精彩而抢夺主线风头"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="脱节断裂"
                        secondary="副线与主线缺乏有机联系，显得突兀"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="草草收尾"
                        secondary="副线的解决过于匆忙，缺乏说服力"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 3 }} />

      {/* 策略模板 */}
      <Card elevation={1}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            编织策略模板参考
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                并行推进型
              </Typography>
              <Typography variant="body2" color="text.secondary">
                主副线同时推进，定期交汇互动。适合情节复杂、角色众多的长篇作品。
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                穿插调节型
              </Typography>
              <Typography variant="body2" color="text.secondary">
                在主线紧张时插入副线缓解，在主线平缓时用副线增加波澜。
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                层层揭示型
              </Typography>
              <Typography variant="body2" color="text.secondary">
                副线逐步揭示主线的深层背景，最终汇合形成完整真相。
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                对比映衬型
              </Typography>
              <Typography variant="body2" color="text.secondary">
                副线通过对比或映衬来突出主线的主题和角色特征。
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WeavingStrategy;