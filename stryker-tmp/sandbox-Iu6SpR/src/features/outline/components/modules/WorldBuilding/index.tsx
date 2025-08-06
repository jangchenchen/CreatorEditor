// @ts-nocheck
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Tabs, Tab, Typography, Toolbar, IconButton, Tooltip } from '@mui/material';
import {
  Public as GeographyIcon,
  Groups as SocietyIcon,
  History as HistoryIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { GeographySettings } from './GeographySettingsNew';
import SocialSystems from './SocialSystems';
import WorldHistory from './WorldHistory';
import { selectWorld, resetWorld } from '../../../slices/worldSlice';

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
      id={`world-tabpanel-${index}`}
      aria-labelledby={`world-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const WorldBuilding: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const worldData = useSelector(selectWorld);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    // 触发自动保存中间件
    dispatch({ type: 'world/triggerSave' });
    console.log('世界设定已保存', worldData);
  };

  const handleRefresh = () => {
    // 重置世界数据
    if (window.confirm('确定要重置世界设定吗？这将清除所有未保存的内容。')) {
      dispatch(resetWorld());
      console.log('世界设定已重置');
    }
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 工具栏 */}
      <Toolbar variant='dense' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          世界构建
        </Typography>

        <Tooltip title='保存'>
          <IconButton size='small' onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='刷新'>
          <IconButton size='small' onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      {/* 标签页导航 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label='world building tabs'>
          <Tab
            icon={<GeographyIcon />}
            label='地理设定'
            id='world-tab-0'
            aria-controls='world-tabpanel-0'
          />
          <Tab
            icon={<SocietyIcon />}
            label='社会体系'
            id='world-tab-1'
            aria-controls='world-tabpanel-1'
          />
          <Tab
            icon={<HistoryIcon />}
            label='世界历史'
            id='world-tab-2'
            aria-controls='world-tabpanel-2'
          />
        </Tabs>
      </Box>

      {/* 标签页内容 */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TabPanel value={activeTab} index={0}>
          <GeographySettings />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <SocialSystems />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <WorldHistory />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default WorldBuilding;
