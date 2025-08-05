/**
 * Political System Component
 * Component for managing political system settings
 */

import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  AccountBalance as PoliticalIcon
} from '@mui/icons-material';

interface PoliticalSystemProps {
  value: string;
  onChange: (value: string) => void;
  defaultExpanded?: boolean;
}

export const PoliticalSystem: React.FC<PoliticalSystemProps> = ({
  value,
  onChange,
  defaultExpanded = true
}) => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <PoliticalIcon sx={{ mr: 1, color: 'primary.main' }} />
          政治制度
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="政治体系描述"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="描述故事世界的政治制度、统治方式、权力结构..."
          variant="outlined"
        />
        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.50', borderRadius: 1 }}>
          <Typography variant="caption" color="info.main">
            💡 参考: 君主制、共和制、民主制、专制、封建制、部落制等
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};