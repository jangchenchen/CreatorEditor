import React, { useState } from 'react';
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    // TODO: 实现保存功能
    console.log('保存故事概述');
  };

  const handleRefresh = () => {
    // TODO: 实现刷新功能
    console.log('刷新故事概述');
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