/**
 * Issues Check Component
 * Displays potential issues with subplot weaving
 */
// @ts-nocheck


import React from 'react';
import {
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

interface IssuesCheckProps {
  issues: string[];
}

export const IssuesCheck: React.FC<IssuesCheckProps> = ({ issues }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box component='span' sx={{ display: 'flex', alignItems: 'center' }}>
          <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
          潜在问题检查 ({issues.length})
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {issues.length === 0 ? (
          <Alert severity='success' icon={<CheckIcon />}>
            <Typography variant='body2'>未发现明显的结构问题，副线分布相对合理。</Typography>
          </Alert>
        ) : (
          <Box>
            <Alert severity='warning' sx={{ mb: 2 }}>
              <Typography variant='body2'>
                发现 {issues.length} 个潜在问题，建议优化副线安排：
              </Typography>
            </Alert>

            <List>
              {issues.map((issue, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <WarningIcon color='warning' />
                  </ListItemIcon>
                  <ListItemText primary={issue} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
