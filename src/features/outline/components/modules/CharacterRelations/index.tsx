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
  People as PeopleIcon,
  AccountTree as RelationshipIcon,
  Timeline as ArcIcon,
  Add as AddIcon
} from '@mui/icons-material';
import CharacterProfile from './CharacterProfile';
import CharacterArc from './CharacterArc';
import RelationshipMap from './RelationshipMap';

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
      id={`character-tabpanel-${index}`}
      aria-labelledby={`character-tab-${index}`}
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

const CharacterRelations: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddCharacter = () => {
    // TODO: 实现新增角色功能
    console.log('添加新角色');
  };

  const handleAddRelationship = () => {
    // TODO: 实现新增关系功能
    console.log('添加新关系');
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 工具栏 */}
      <Toolbar variant="dense" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          人物与角色关系
        </Typography>
        
        <Tooltip title="添加角色">
          <IconButton size="small" onClick={handleAddCharacter}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      {/* 标签页导航 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          aria-label="character relations tabs"
        >
          <Tab 
            icon={<PeopleIcon />} 
            label="角色档案" 
            id="character-tab-0"
            aria-controls="character-tabpanel-0"
          />
          <Tab 
            icon={<ArcIcon />} 
            label="发展弧线" 
            id="character-tab-1"
            aria-controls="character-tabpanel-1"
          />
          <Tab 
            icon={<RelationshipIcon />} 
            label="关系图谱" 
            id="character-tab-2"
            aria-controls="character-tabpanel-2"
          />
        </Tabs>
      </Box>

      {/* 标签页内容 */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TabPanel value={activeTab} index={0}>
          <CharacterProfile />
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          <CharacterArc />
        </TabPanel>
        
        <TabPanel value={activeTab} index={2}>
          <RelationshipMap />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default CharacterRelations;