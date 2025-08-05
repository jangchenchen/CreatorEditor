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
  AccordionDetails
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Help as MysteriesIcon
} from '@mui/icons-material';

interface MysteriesManagerProps {
  mysteries: string[];
  newMystery: string;
  onNewMysteryChange: (value: string) => void;
  onAddMystery: () => void;
  onRemoveMystery: (index: number) => void;
}

const MysteriesManager: React.FC<MysteriesManagerProps> = ({
  mysteries,
  newMystery,
  onNewMysteryChange,
  onAddMystery,
  onRemoveMystery
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <MysteriesIcon sx={{ mr: 1, color: 'error.main' }} />
          未解之谜 ({mysteries.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              label="添加未解之谜"
              value={newMystery}
              onChange={(e) => onNewMysteryChange(e.target.value)}
              placeholder="描述一个尚未解开的谜团..."
            />
            <Button 
              variant="contained" 
              onClick={onAddMystery}
              disabled={!newMystery.trim()}
              sx={{ minWidth: 80 }}
            >
              添加
            </Button>
          </Box>
          
          {mysteries.length > 0 ? (
            <List>
              {mysteries.map((mystery, index) => (
                <ListItem key={index} sx={{ bgcolor: 'error.50', mb: 1, borderRadius: 1 }}>
                  <ListItemText 
                    primary={`未解之谜 ${index + 1}`}
                    secondary={mystery}
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      color="error"
                      onClick={() => onRemoveMystery(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              暂无未解之谜记录
            </Typography>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default MysteriesManager;