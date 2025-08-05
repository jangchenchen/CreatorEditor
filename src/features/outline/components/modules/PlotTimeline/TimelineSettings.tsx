import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Button,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  Info as InfoIcon,
  Timeline as TimelineIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { selectTimeline, updateTimelineInfo } from '../../../outlineSlice';

const TimelineSettings: React.FC = () => {
  const dispatch = useDispatch();
  const timeline = useSelector(selectTimeline);

  const handleFieldChange = (field: 'startTime' | 'endTime' | 'timelineNotes') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateTimelineInfo({
      [field]: event.target.value
    }));
  };

  const handleSave = () => {
    // TODO: 实现保存到文件功能
    console.log('保存时间线设置');
  };

  const handleReset = () => {
    if (window.confirm('确定要重置时间线设置吗？此操作不可撤销。')) {
      dispatch(updateTimelineInfo({
        startTime: '',
        endTime: '',
        timelineNotes: ''
      }));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        时间线设置
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        配置故事时间线的基本参数和整体说明，为情节事件提供时间框架。
      </Typography>

      <Grid container spacing={3}>
        {/* 时间范围设置 */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardHeader 
              avatar={<TimeIcon color="primary" />}
              title="时间范围设置"
              subheader="定义故事发生的时间跨度"
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="故事开始时间"
                    value={timeline.startTime}
                    onChange={handleFieldChange('startTime')}
                    placeholder="例如: 2023年春天, 古代某朝, 未来世界..."
                    variant="outlined"
                    helperText="可以是具体日期，也可以是相对时间描述"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="故事结束时间"
                    value={timeline.endTime}
                    onChange={handleFieldChange('endTime')}
                    placeholder="例如: 2024年冬天, 三年后, 故事结局..."
                    variant="outlined"
                    helperText="故事预计的结束时间点"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 时间线说明 */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardHeader 
              avatar={<InfoIcon color="primary" />}
              title="时间线说明"
              subheader="对整个时间线结构的详细说明"
            />
            <CardContent>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="时间线说明"
                value={timeline.timelineNotes}
                onChange={handleFieldChange('timelineNotes')}
                placeholder="描述故事的时间线特点、重要的时间节点、时间流逝的特殊规律等..."
                variant="outlined"
                helperText="这里可以记录时间线的整体设计思路、特殊时间概念等重要信息"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 时间线统计信息 */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardHeader 
              avatar={<TimelineIcon color="primary" />}
              title="时间线统计"
              subheader="当前时间线的基本信息"
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h3" color="primary">
                      {timeline.events.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      总事件数量
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h3" color="secondary">
                      {timeline.events.filter(e => e.isKeyEvent).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      关键事件数量
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 使用指南 */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              💡 时间线设计建议
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>•</ListItemIcon>
                <ListItemText primary="时间设定要服务于故事，不必过分拘泥于现实时间的精确性" />
              </ListItem>
              <ListItem>
                <ListItemIcon>•</ListItemIcon>
                <ListItemText primary="关键事件之间要有合理的时间间隔，避免情节过于紧凑" />
              </ListItem>
              <ListItem>
                <ListItemIcon>•</ListItemIcon>
                <ListItemText primary="可以使用相对时间描述，如"三天后"、"一个月前"等" />
              </ListItem>
              <ListItem>
                <ListItemIcon>•</ListItemIcon>
                <ListItemText primary="注意季节、节日等时间要素对故事氛围的影响" />
              </ListItem>
            </List>
          </Alert>
        </Grid>

        {/* 操作按钮 */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              保存设置
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleReset}
            >
              重置设置
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* 时间线模板建议 */}
      <Card elevation={1}>
        <CardHeader title="时间线模板参考" />
        <CardContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            根据不同类型的故事，可以参考以下时间线设计模式：
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 2 }}>
                <Chip label="现实主义小说" color="primary" size="small" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  使用具体的年月日，注意历史背景的准确性，时间跨度可以是几年到几十年。
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 2 }}>
                <Chip label="奇幻/科幻小说" color="secondary" size="small" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  可以创造独特的时间体系，使用虚构的纪年方式或特殊的时间概念。
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 2 }}>
                <Chip label="悬疑推理小说" color="warning" size="small" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  时间线要精确，注意事件的先后顺序，可能需要倒叙或插叙的处理。
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 2 }}>
                <Chip label="历史小说" color="success" size="small" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  严格遵循历史时间线，注意重大历史事件对故事情节的影响。
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TimelineSettings;