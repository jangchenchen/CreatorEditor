import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, 
  Paper, 
  Tabs, 
  Tab, 
  Typography,
  Toolbar,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Public as BackgroundIcon,
  Psychology as ThemeIcon,
  MenuBook as SynopsisIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import StoryBackground from './StoryBackground';
import CoreTheme from './CoreTheme';
import StorySynopsis from './StorySynopsis';
import { selectStory, resetStory } from '../../../slices/storySlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`story-tabpanel-${index}`}
      aria-labelledby={`story-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const StoryOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const story = useSelector(selectStory);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    // 触发自动保存中间件
    dispatch({ type: 'story/triggerSave' });
    console.log('故事概述已保存', story);
  };

  const handleRefresh = () => {
    // 重置故事数据
    if (window.confirm('确定要重置故事概述吗？这将清除所有未保存的内容。')) {
      dispatch(resetStory());
      console.log('故事概述已重置');
    }
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 工具栏 */}
      <Toolbar variant="dense" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          故事概述
        </Typography>
        
        <Tooltip title="保存">
          <IconButton size="small" onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="刷新">
          <IconButton size="small" onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      {/* 标签页导航 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          aria-label="story overview tabs"
        >
          <Tab 
            icon={<BackgroundIcon />} 
            label="背景设定" 
            id="story-tab-0"
            aria-controls="story-tabpanel-0"
          />
          <Tab 
            icon={<ThemeIcon />} 
            label="核心主题" 
            id="story-tab-1"
            aria-controls="story-tabpanel-1"
          />
          <Tab 
            icon={<SynopsisIcon />} 
            label="故事概要" 
            id="story-tab-2"
            aria-controls="story-tabpanel-2"
          />
        </Tabs>
      </Box>

      {/* 标签页内容 */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TabPanel value={activeTab} index={0}>
          <StoryBackground />
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          <CoreTheme />
        </TabPanel>
        
        <TabPanel value={activeTab} index={2}>
          <StorySynopsis />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default StoryOverview;