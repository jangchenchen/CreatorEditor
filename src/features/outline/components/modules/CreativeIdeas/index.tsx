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
  Lightbulb as IdeasIcon,
  CompareArrows as AlternativesIcon,
  AutoAwesome as InspirationIcon,
  Add as AddIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import IdeasManagement from './IdeasManagement';
import PlotAlternatives from './PlotAlternatives';
import InspirationSources from './InspirationSources';

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
      id={`ideas-tabpanel-${index}`}
      aria-labelledby={`ideas-tab-${index}`}
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

const CreativeIdeas: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddIdea = () => {
    // TODO: 实现新增创意功能
    console.log('添加新创意');
  };

  const handleSave = () => {
    // TODO: 实现保存功能
    console.log('保存创意想法');
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 工具栏 */}
      <Toolbar variant="dense" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          创意与情节联想
        </Typography>
        
        <Tooltip title="添加创意">
          <IconButton size="small" onClick={handleAddIdea}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="保存">
          <IconButton size="small" onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      {/* 标签页导航 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          aria-label="creative ideas tabs"
        >
          <Tab 
            icon={<IdeasIcon />} 
            label="创意管理" 
            id="ideas-tab-0"
            aria-controls="ideas-tabpanel-0"
          />
          <Tab 
            icon={<AlternativesIcon />} 
            label="情节替代" 
            id="ideas-tab-1"
            aria-controls="ideas-tabpanel-1"
          />
          <Tab 
            icon={<InspirationIcon />} 
            label="灵感来源" 
            id="ideas-tab-2"
            aria-controls="ideas-tabpanel-2"
          />
        </Tabs>
      </Box>

      {/* 标签页内容 */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TabPanel value={activeTab} index={0}>
          <IdeasManagement />
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          <PlotAlternatives />
        </TabPanel>
        
        <TabPanel value={activeTab} index={2}>
          <InspirationSources />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default CreativeIdeas;