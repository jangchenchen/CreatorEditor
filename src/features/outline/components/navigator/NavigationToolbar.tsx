import React from 'react';
import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  Tooltip,
  Button
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { modules } from './navigatorConstants';
import { OutlineModule } from '../../types/outline.types';

interface NavigationToolbarProps {
  selectedModule: OutlineModule | null;
  onBackToNavigator: () => void;
  onInfoOpen: () => void;
}

const NavigationToolbar: React.FC<NavigationToolbarProps> = ({
  selectedModule,
  onBackToNavigator,
  onInfoOpen
}) => {
  if (selectedModule) {
    return (
      <Toolbar variant="dense" sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
        <Button
          onClick={onBackToNavigator}
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        >
          ← 返回大纲导航
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {modules.find(m => m.id === selectedModule)?.title}
        </Typography>
      </Toolbar>
    );
  }

  return (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h4" component="h1">
        小说大纲
      </Typography>
      
      <Box>
        <Tooltip title="大纲说明">
          <IconButton onClick={onInfoOpen}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="大纲设置">
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default NavigationToolbar;