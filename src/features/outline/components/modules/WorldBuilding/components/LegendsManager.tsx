import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  AutoStories as LegendsIcon,
} from '@mui/icons-material';

interface LegendsManagerProps {
  legends: string[];
  newLegend: string;
  onNewLegendChange: (value: string) => void;
  onAddLegend: () => void;
  onRemoveLegend: (index: number) => void;
}

const LegendsManager: React.FC<LegendsManagerProps> = ({
  legends,
  newLegend,
  onNewLegendChange,
  onAddLegend,
  onRemoveLegend,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          <LegendsIcon sx={{ mr: 1, color: 'secondary.main' }} />
          传说神话 ({legends.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size='small'
              multiline
              rows={2}
              label='添加传说'
              value={newLegend}
              onChange={e => onNewLegendChange(e.target.value)}
              placeholder='描述一个传说故事或神话...'
            />
            <Button
              variant='contained'
              onClick={onAddLegend}
              disabled={!newLegend.trim()}
              sx={{ minWidth: 80 }}
            >
              添加
            </Button>
          </Box>

          {legends.length > 0 ? (
            <List>
              {legends.map((legend, index) => (
                <ListItem key={index} sx={{ bgcolor: 'secondary.50', mb: 1, borderRadius: 1 }}>
                  <ListItemText primary={`传说 ${index + 1}`} secondary={legend} />
                  <ListItemSecondaryAction>
                    <IconButton edge='end' color='error' onClick={() => onRemoveLegend(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', py: 2 }}>
              暂无传说记录
            </Typography>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default LegendsManager;
