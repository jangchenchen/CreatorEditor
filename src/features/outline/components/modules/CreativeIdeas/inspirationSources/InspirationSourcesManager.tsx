import React from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Typography
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { getSourceIcon } from './utils';

interface InspirationSourcesManagerProps {
  inspirationSources: string[];
  newSource: string;
  setNewSource: (value: string) => void;
  handleAddSource: () => void;
  handleRemoveSource: (index: number) => void;
}

export const InspirationSourcesManager: React.FC<InspirationSourcesManagerProps> = ({
  inspirationSources,
  newSource,
  setNewSource,
  handleAddSource,
  handleRemoveSource
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSource();
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          label="添加灵感来源"
          value={newSource}
          onChange={(e) => setNewSource(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="例如: 《百年孤独》、宫崎骏电影、古典音乐..."
        />
        <Button 
          variant="contained" 
          onClick={handleAddSource}
          disabled={!newSource.trim()}
          startIcon={<AddIcon />}
        >
          添加
        </Button>
      </Box>

      {inspirationSources.length > 0 ? (
        <List>
          {inspirationSources.map((source, index) => {
            const IconComponent = getSourceIcon(source);
            return (
              <ListItem key={index} sx={{ bgcolor: 'grey.50', mb: 1, borderRadius: 1 }}>
                <ListItemIcon>
                  <IconComponent color="primary" />
                </ListItemIcon>
                <ListItemText primary={source} />
                <ListItemSecondaryAction>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleRemoveSource(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          暂无灵感来源记录
        </Typography>
      )}
    </>
  );
};