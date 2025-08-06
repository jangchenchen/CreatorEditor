/**
 * Theme Description List Component
 * For managing theme items with descriptions (symbols, metaphors, motifs)
 */
// @ts-nocheck


import React from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';

interface ThemeDescriptionListProps {
  title: string;
  items: string[];
  inputValue: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputRows?: number;
  onInputChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'warning' | 'info' | 'success';
  tip?: string;
}

export const ThemeDescriptionList: React.FC<ThemeDescriptionListProps> = ({
  title,
  items,
  inputValue,
  inputLabel,
  inputPlaceholder,
  inputRows = 2,
  onInputChange,
  onAdd,
  onRemove,
  icon,
  color,
  tip,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 1, color: `${color}.main` }}>{icon}</Box>
          {title} ({items.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size='small'
              multiline
              rows={inputRows}
              label={inputLabel}
              value={inputValue}
              onChange={e => onInputChange(e.target.value)}
              placeholder={inputPlaceholder}
            />
            <Button
              variant='contained'
              onClick={onAdd}
              disabled={!inputValue.trim()}
              sx={{ minWidth: 80 }}
            >
              添加
            </Button>
          </Box>

          {items.length > 0 ? (
            <List>
              {items.map((item, index) => (
                <ListItem key={index} sx={{ bgcolor: `${color}.50`, mb: 1, borderRadius: 1 }}>
                  <ListItemIcon>
                    {React.cloneElement(icon as React.ReactElement, { color })}
                  </ListItemIcon>
                  <ListItemText primary={item} />
                  <IconButton size='small' color='error' onClick={() => onRemove(index)}>
                    <RemoveIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', py: 2 }}>
              暂无{title.toLowerCase()}
            </Typography>
          )}
        </Box>

        {tip && (
          <Box sx={{ p: 2, bgcolor: `${color}.50`, borderRadius: 1 }}>
            <Typography variant='caption' color={`${color}.main`}>
              💡 {tip}
            </Typography>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
