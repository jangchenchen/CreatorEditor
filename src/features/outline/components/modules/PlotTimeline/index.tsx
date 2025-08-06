import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Tabs, Tab, Typography, Toolbar, IconButton, Tooltip } from '@mui/material';
import {
  Timeline as TimelineIcon,
  Event as EventIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import TimelineOverview from './TimelineOverview';
import EventManagement from './EventManagement';
import TimelineSettings from './TimelineSettings';
import { selectTimeline, addPlotEvent } from '../../../slices/timelineSlice';
import { PlotEvent } from '../../../types/outline.types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`timeline-tabpanel-${index}`}
      aria-labelledby={`timeline-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const PlotTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const timelineData = useSelector(selectTimeline);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddEvent = () => {
    const newEvent: PlotEvent = {
      id: `event-${Date.now()}`,
      title: '新事件',
      description: '',
      timestamp: new Date().toISOString(),
      type: 'development',
      importance: 'important',
      location: '',
      characters: [],
      consequences: '',
      notes: '',
      isKeyEvent: false,
      lastUpdated: new Date(),
    };
    dispatch(addPlotEvent(newEvent));
    console.log('已添加新事件:', newEvent);
  };

  const handleSave = () => {
    // 触发自动保存中间件
    dispatch({ type: 'timeline/triggerSave' });
    console.log('时间线已保存', timelineData);
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 工具栏 */}
      <Toolbar variant='dense' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          情节时间线
        </Typography>

        <Tooltip title='添加事件'>
          <IconButton size='small' onClick={handleAddEvent}>
            <AddIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='保存'>
          <IconButton size='small' onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      {/* 标签页导航 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label='plot timeline tabs'>
          <Tab
            icon={<TimelineIcon />}
            label='时间线概览'
            id='timeline-tab-0'
            aria-controls='timeline-tabpanel-0'
          />
          <Tab
            icon={<EventIcon />}
            label='事件管理'
            id='timeline-tab-1'
            aria-controls='timeline-tabpanel-1'
          />
          <Tab
            icon={<SettingsIcon />}
            label='时间线设置'
            id='timeline-tab-2'
            aria-controls='timeline-tabpanel-2'
          />
        </Tabs>
      </Box>

      {/* 标签页内容 */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TabPanel value={activeTab} index={0}>
          <TimelineOverview />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <EventManagement />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <TimelineSettings />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default PlotTimeline;
