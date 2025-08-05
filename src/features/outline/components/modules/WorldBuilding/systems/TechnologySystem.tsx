/**
 * Technology System Component
 * Component for managing technology and magic level settings
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
  Engineering as TechnologyIcon
} from '@mui/icons-material';

interface TechnologySystemProps {
  value: string;
  onChange: (value: string) => void;
  defaultExpanded?: boolean;
}

export const TechnologySystem: React.FC<TechnologySystemProps> = ({
  value,
  onChange,
  defaultExpanded = false
}) => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <TechnologyIcon sx={{ mr: 1, color: 'info.main' }} />
          科技/魔法水平
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="技术水平描述"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="描述科技发展水平、魔法体系、工艺技术、交通通讯等..."
          variant="outlined"
        />
        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.50', borderRadius: 1 }}>
          <Typography variant="caption" color="info.main">
            💡 参考: 石器时代、青铜时代、工业革命、现代科技、未来科技、魔法体系等
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};