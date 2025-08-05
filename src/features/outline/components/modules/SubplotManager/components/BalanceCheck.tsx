/**
 * Balance Check Component
 * Shows subplot balance issues and warnings
 */

import React from 'react';
import {
  Box,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Balance as BalanceIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

interface BalanceCheckProps {
  issues: string[];
  suggestions: string[];
}

export const BalanceCheck: React.FC<BalanceCheckProps> = ({ issues, suggestions }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <BalanceIcon sx={{ mr: 1, color: 'warning.main' }} />
          平衡性检查
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {issues.length === 0 ? (
          <Alert severity="success" icon={<CheckIcon />}>
            副线分布平衡，未发现明显问题
          </Alert>
        ) : (
          <Box>
            <Alert severity="warning" sx={{ mb: 2 }}>
              发现 {issues.length} 个需要关注的问题
            </Alert>
            
            <List>
              {issues.map((issue, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText primary={issue} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {suggestions.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              优化建议：
            </Typography>
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckIcon color="info" />
                  </ListItemIcon>
                  <ListItemText primary={suggestion} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};