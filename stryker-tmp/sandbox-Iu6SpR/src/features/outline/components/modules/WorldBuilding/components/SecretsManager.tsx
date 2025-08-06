// @ts-nocheck
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
  Security as SecretsIcon,
} from '@mui/icons-material';

interface SecretsManagerProps {
  familySecrets: string[];
  newSecret: string;
  onNewSecretChange: (value: string) => void;
  onAddSecret: () => void;
  onRemoveSecret: (index: number) => void;
}

const SecretsManager: React.FC<SecretsManagerProps> = ({
  familySecrets,
  newSecret,
  onNewSecretChange,
  onAddSecret,
  onRemoveSecret,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          <SecretsIcon sx={{ mr: 1, color: 'warning.main' }} />
          家族秘史 ({familySecrets.length})
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
              label='添加家族秘密'
              value={newSecret}
              onChange={e => onNewSecretChange(e.target.value)}
              placeholder='描述某个家族的秘密历史...'
            />
            <Button
              variant='contained'
              onClick={onAddSecret}
              disabled={!newSecret.trim()}
              sx={{ minWidth: 80 }}
            >
              添加
            </Button>
          </Box>

          {familySecrets.length > 0 ? (
            <List>
              {familySecrets.map((secret, index) => (
                <ListItem key={index} sx={{ bgcolor: 'warning.50', mb: 1, borderRadius: 1 }}>
                  <ListItemText primary={`家族秘史 ${index + 1}`} secondary={secret} />
                  <ListItemSecondaryAction>
                    <IconButton edge='end' color='error' onClick={() => onRemoveSecret(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', py: 2 }}>
              暂无家族秘史记录
            </Typography>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SecretsManager;
