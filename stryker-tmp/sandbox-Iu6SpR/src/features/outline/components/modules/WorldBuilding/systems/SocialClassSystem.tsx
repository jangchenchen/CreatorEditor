/**
 * Social Class System Component
 * Component for managing social classes and hierarchy
 */
// @ts-nocheck


import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Stairs as SocialIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';

interface SocialClassSystemProps {
  classes: string[];
  newClass: string;
  onClassesChange: (classes: string[]) => void;
  onNewClassChange: (value: string) => void;
  onAddClass: () => void;
  onRemoveClass: (className: string) => void;
  defaultExpanded?: boolean;
}

export const SocialClassSystem: React.FC<SocialClassSystemProps> = ({
  classes,
  newClass,
  onClassesChange,
  onNewClassChange,
  onAddClass,
  onRemoveClass,
  defaultExpanded = false,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddClass();
    }
  };

  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          <SocialIcon sx={{ mr: 1, color: 'error.main' }} />
          社会阶层 ({classes.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size='small'
              label='添加社会阶层'
              value={newClass}
              onChange={e => onNewClassChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='例如: 贵族、平民、商人、农民...'
            />
            <Button
              variant='contained'
              onClick={onAddClass}
              disabled={!newClass.trim()}
              startIcon={<AddIcon />}
            >
              添加
            </Button>
          </Box>

          {classes.length > 0 ? (
            <List dense>
              {classes.map((className, index) => (
                <ListItem key={index} sx={{ bgcolor: 'grey.50', mb: 1, borderRadius: 1 }}>
                  <ListItemIcon>
                    <SocialIcon color='action' />
                  </ListItemIcon>
                  <ListItemText primary={className} />
                  <Button
                    size='small'
                    color='error'
                    onClick={() => onRemoveClass(className)}
                    startIcon={<RemoveIcon />}
                  >
                    移除
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', py: 2 }}>
              暂无社会阶层，点击添加按钮开始设定
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'error.50', borderRadius: 1 }}>
          <Typography variant='caption' color='error.main'>
            💡 参考: 皇族、贵族、地主、商人、工匠、农民、奴隶等
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
