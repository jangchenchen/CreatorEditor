import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Tabs, Tab, Typography, Toolbar, IconButton, Tooltip } from '@mui/material';
import {
  Psychology as ThemeIcon,
  Person as MotivationIcon,
  QuestionMark as PhilosophyIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import ThemeAnalysis from './ThemeAnalysis';
import CharacterMotivations from './CharacterMotivations';
import PhilosophicalReflection from './PhilosophicalReflection';
import { selectThemes, resetThemes } from '../../../slices/themesSlice';

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
      id={`theme-tabpanel-${index}`}
      aria-labelledby={`theme-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ThemeExploration: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const themesData = useSelector(selectThemes);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    // 触发自动保存中间件
    dispatch({ type: 'themes/triggerSave' });
    console.log('主题探索已保存', themesData);
  };

  const handleRefresh = () => {
    // 重置主题数据
    if (window.confirm('确定要重置主题探索吗？这将清除所有未保存的内容。')) {
      dispatch(resetThemes());
      console.log('主题探索已重置');
    }
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 工具栏 */}
      <Toolbar variant='dense' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          主题与内涵探索
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
        <Tabs value={activeTab} onChange={handleTabChange} aria-label='theme exploration tabs'>
          <Tab
            icon={<ThemeIcon />}
            label='主题分析'
            id='theme-tab-0'
            aria-controls='theme-tabpanel-0'
          />
          <Tab
            icon={<MotivationIcon />}
            label='角色动机'
            id='theme-tab-1'
            aria-controls='theme-tabpanel-1'
          />
          <Tab
            icon={<PhilosophyIcon />}
            label='哲学思考'
            id='theme-tab-2'
            aria-controls='theme-tabpanel-2'
          />
        </Tabs>
      </Box>

      {/* 标签页内容 */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TabPanel value={activeTab} index={0}>
          <ThemeAnalysis />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <CharacterMotivations />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <PhilosophicalReflection />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default ThemeExploration;
