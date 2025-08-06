/**
 * Economic System Component
 * Component for managing economic system settings
 */

import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, AttachMoney as EconomicIcon } from '@mui/icons-material';

interface EconomicSystemProps {
  value: string;
  onChange: (value: string) => void;
  defaultExpanded?: boolean;
}

export const EconomicSystem: React.FC<EconomicSystemProps> = ({
  value,
  onChange,
  defaultExpanded = false,
}) => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          <EconomicIcon sx={{ mr: 1, color: 'success.main' }} />
          经济体系
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          multiline
          rows={4}
          label='经济制度描述'
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder='描述货币制度、贸易体系、主要产业、经济活动...'
          variant='outlined'
        />
        <Box sx={{ mt: 2, p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
          <Typography variant='caption' color='success.main'>
            💡 参考: 农业经济、工业经济、商业贸易、货币体系、税收制度等
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
