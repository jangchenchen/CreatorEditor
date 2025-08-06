// @ts-nocheck
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Tabs, Tab, Typography, Toolbar, IconButton, Tooltip } from '@mui/material';
import {
  AccountTree as SubplotIcon,
  PersonOutline as SecondaryIcon,
  Hub as StrategyIcon,
  Add as AddIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import SubplotManagement from './SubplotManagement';
import SecondaryCharacterStories from './SecondaryCharacterStories';
import WeavingStrategy from './WeavingStrategy';
import { selectSubplots, addSubplot } from '../../../slices/subplotsSlice';
import { Subplot } from '../../../types/outline.types';

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
      id={`subplot-tabpanel-${index}`}
      aria-labelledby={`subplot-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const SubplotManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const subplotsData = useSelector(selectSubplots);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddSubplot = () => {
    const newSubplot: Subplot = {
      id: `subplot-${Date.now()}`,
      title: '新副线',
      description: '',
      mainCharacters: [],
      plotPoints: [],
      resolution: '',
      relationship: 'parallel',
      priority: 'medium',
      status: 'planned',
      lastUpdated: new Date(),
    };
    dispatch(addSubplot(newSubplot));
    console.log('已添加新副线:', newSubplot);
  };

  const handleSave = () => {
    // 触发自动保存中间件
    dispatch({ type: 'subplots/triggerSave' });
    console.log('副线情节已保存', subplotsData);
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 工具栏 */}
      <Toolbar variant='dense' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          副线情节管理
        </Typography>

        <Tooltip title='添加副线'>
          <IconButton size='small' onClick={handleAddSubplot}>
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
        <Tabs value={activeTab} onChange={handleTabChange} aria-label='subplot manager tabs'>
          <Tab
            icon={<SubplotIcon />}
            label='副线管理'
            id='subplot-tab-0'
            aria-controls='subplot-tabpanel-0'
          />
          <Tab
            icon={<SecondaryIcon />}
            label='配角故事'
            id='subplot-tab-1'
            aria-controls='subplot-tabpanel-1'
          />
          <Tab
            icon={<StrategyIcon />}
            label='编织策略'
            id='subplot-tab-2'
            aria-controls='subplot-tabpanel-2'
          />
        </Tabs>
      </Box>

      {/* 标签页内容 */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TabPanel value={activeTab} index={0}>
          <SubplotManagement />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <SecondaryCharacterStories />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <WeavingStrategy />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default SubplotManager;
