/**
 * Religious System Component
 * Component for managing religious beliefs and systems
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
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Church as ReligiousIcon } from '@mui/icons-material';

interface ReligiousSystemProps {
  value: string;
  onChange: (value: string) => void;
  defaultExpanded?: boolean;
}

export const ReligiousSystem: React.FC<ReligiousSystemProps> = ({
  value,
  onChange,
  defaultExpanded = false,
}) => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          <ReligiousIcon sx={{ mr: 1, color: 'warning.main' }} />
          宗教信仰
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          multiline
          rows={4}
          label='宗教体系描述'
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder='描述主要的宗教信仰、神祇体系、宗教组织、信仰仪式...'
          variant='outlined'
        />
        <Box sx={{ mt: 2, p: 2, bgcolor: 'warning.50', borderRadius: 1 }}>
          <Typography variant='caption' color='warning.main'>
            💡 参考: 一神论、多神论、泛神论、祖先崇拜、自然崇拜、宗教教义等
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
