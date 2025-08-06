/**
 * Theme List Component
 * Generic component for managing theme item lists
 */
// @ts-nocheck


import React from 'react';
import {
  Box,
  TextField,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Add as AddIcon } from '@mui/icons-material';

interface ThemeListProps {
  title: string;
  items: string[];
  inputValue: string;
  inputLabel: string;
  inputPlaceholder: string;
  onInputChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'warning' | 'info' | 'success';
}

export const ThemeList: React.FC<ThemeListProps> = ({
  title,
  items,
  inputValue,
  inputLabel,
  inputPlaceholder,
  onInputChange,
  onAdd,
  onRemove,
  icon,
  color = 'secondary',
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
          {title} ({items.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size='small'
              label={inputLabel}
              value={inputValue}
              onChange={e => onInputChange(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && onAdd()}
              placeholder={inputPlaceholder}
            />
            <Button
              variant='contained'
              onClick={onAdd}
              disabled={!inputValue.trim()}
              startIcon={<AddIcon />}
            >
              添加
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {items.map((item, index) => (
              <Chip
                key={index}
                label={item}
                onDelete={() => onRemove(index)}
                color={color}
                variant='outlined'
              />
            ))}
            {items.length === 0 && (
              <Typography variant='body2' color='text.secondary'>
                暂无{title.toLowerCase()}
              </Typography>
            )}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
