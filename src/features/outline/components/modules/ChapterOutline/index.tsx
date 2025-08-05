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
  MenuBook as ChapterIcon,
  Movie as SceneIcon,
  AccountTree as StructureIcon,
  Add as AddIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import ChapterManagement from './ChapterManagement';
import SceneEditor from './SceneEditor';
import StructureOverview from './StructureOverview';

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
      id={`chapter-tabpanel-${index}`}
      aria-labelledby={`chapter-tab-${index}`}
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

const ChapterOutline: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddChapter = () => {
    // TODO: 实现新增章节功能
    console.log('添加新章节');
  };

  const handleSave = () => {
    // TODO: 实现保存功能
    console.log('保存章节大纲');
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 工具栏 */}
      <Toolbar variant="dense" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          章节大纲
        </Typography>
        
        <Tooltip title="添加章节">
          <IconButton size="small" onClick={handleAddChapter}>
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
          aria-label="chapter outline tabs"
        >
          <Tab 
            icon={<ChapterIcon />} 
            label="章节管理" 
            id="chapter-tab-0"
            aria-controls="chapter-tabpanel-0"
          />
          <Tab 
            icon={<SceneIcon />} 
            label="场景编辑" 
            id="chapter-tab-1"
            aria-controls="chapter-tabpanel-1"
          />
          <Tab 
            icon={<StructureIcon />} 
            label="结构概览" 
            id="chapter-tab-2"
            aria-controls="chapter-tabpanel-2"
          />
        </Tabs>
      </Box>

      {/* 标签页内容 */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TabPanel value={activeTab} index={0}>
          <ChapterManagement />
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          <SceneEditor />
        </TabPanel>
        
        <TabPanel value={activeTab} index={2}>
          <StructureOverview />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default ChapterOutline;