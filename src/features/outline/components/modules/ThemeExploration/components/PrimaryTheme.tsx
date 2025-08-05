/**
 * Primary Theme Component
 * Displays and edits the primary theme
 */

import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Psychology as PrimaryIcon
} from '@mui/icons-material';

interface PrimaryThemeProps {
  value: string;
  onChange: (value: string) => void;
}

export const PrimaryTheme: React.FC<PrimaryThemeProps> = ({ value, onChange }) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <PrimaryIcon sx={{ mr: 1, color: 'primary.main' }} />
          主要主题
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="核心主题阐述"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="深入阐述故事的核心主题，这是作品要传达的最重要的思想..."
          variant="outlined"
        />
        <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
          <Typography variant="caption" color="primary.main">
            💡 提示：主要主题应该贯穿整个故事，在情节发展和角色成长中得到体现和深化。
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};