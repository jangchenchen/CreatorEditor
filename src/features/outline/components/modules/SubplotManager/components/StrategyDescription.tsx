/**
 * Strategy Description Component
 * Textarea for weaving strategy description
 */

import React from 'react';
import {
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Hub as StrategyIcon,
  Save as SaveIcon
} from '@mui/icons-material';

interface StrategyDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

export const StrategyDescription: React.FC<StrategyDescriptionProps> = ({ 
  value, 
  onChange, 
  onSave 
}) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
          <StrategyIcon sx={{ mr: 1, color: 'primary.main' }} />
          编织策略说明
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          multiline
          rows={6}
          label="编织策略"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="描述如何将各个副线有机地编织到主线中，包括引入时机、发展节奏、交汇点、解决顺序等..."
          variant="outlined"
          sx={{ mb: 2 }}
        />
        
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onSave}
        >
          保存策略
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};