/**
 * Cultural System Component
 * Component for managing cultural traditions and customs
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
  Chip,
  Stack,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Diversity3 as CulturalIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface CulturalSystemProps {
  elements: string[];
  newElement: string;
  onElementsChange: (elements: string[]) => void;
  onNewElementChange: (value: string) => void;
  onAddElement: () => void;
  onRemoveElement: (element: string) => void;
  defaultExpanded?: boolean;
}

export const CulturalSystem: React.FC<CulturalSystemProps> = ({
  elements,
  newElement,
  onElementsChange,
  onNewElementChange,
  onAddElement,
  onRemoveElement,
  defaultExpanded = false,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddElement();
    }
  };

  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          <CulturalIcon sx={{ mr: 1, color: 'secondary.main' }} />
          文化传统 ({elements.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size='small'
              label='添加文化要素'
              value={newElement}
              onChange={e => onNewElementChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='例如: 传统节日、习俗仪式、艺术形式...'
            />
            <Button
              variant='contained'
              onClick={onAddElement}
              disabled={!newElement.trim()}
              startIcon={<AddIcon />}
            >
              添加
            </Button>
          </Box>

          {elements.length > 0 && (
            <Stack direction='row' spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {elements.map((element, index) => (
                <Chip
                  key={index}
                  label={element}
                  onDelete={() => onRemoveElement(element)}
                  color='secondary'
                  variant='outlined'
                />
              ))}
            </Stack>
          )}
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'secondary.50', borderRadius: 1 }}>
          <Typography variant='caption' color='secondary.main'>
            💡 参考: 婚丧嫁娶仪式、节日庆典、宗教仪式、社交礼仪、艺术形式等
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
