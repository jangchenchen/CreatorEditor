// @ts-nocheck
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  SelfImprovement as PersonalIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';

interface PersonalReflectionsSectionProps {
  reflections: string[];
  newReflection: string;
  onNewReflectionChange: (value: string) => void;
  onAddReflection: () => void;
  onRemoveReflection: (index: number) => void;
}

const PersonalReflectionsSection: React.FC<PersonalReflectionsSectionProps> = ({
  reflections,
  newReflection,
  onNewReflectionChange,
  onAddReflection,
  onRemoveReflection,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonalIcon sx={{ mr: 1, color: 'success.main' }} />
          个人反思 ({reflections.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='body2' color='text.secondary' paragraph>
          记录创作过程中的个人感悟、人生体验和内心思考，体现作者的独特视角。
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size='small'
              multiline
              rows={3}
              label='添加个人反思'
              value={newReflection}
              onChange={e => onNewReflectionChange(e.target.value)}
              placeholder='在创作或思考过程中的个人感悟和体会...'
            />
            <Button
              variant='contained'
              onClick={onAddReflection}
              disabled={!newReflection.trim()}
              sx={{ minWidth: 80 }}
            >
              添加
            </Button>
          </Box>

          {reflections.length > 0 ? (
            <List>
              {reflections.map((reflection, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: 'success.50',
                    mb: 2,
                    borderRadius: 1,
                    alignItems: 'flex-start',
                    p: 2,
                  }}
                >
                  <ListItemIcon sx={{ mt: 0.5 }}>
                    <PersonalIcon color='success' />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant='subtitle2' color='success.main'>
                        反思 {index + 1}
                      </Typography>
                    }
                    secondary={
                      <Typography variant='body2' sx={{ mt: 1 }}>
                        {reflection}
                      </Typography>
                    }
                  />
                  <IconButton
                    size='small'
                    color='error'
                    onClick={() => onRemoveReflection(index)}
                    sx={{ mt: 0.5 }}
                  >
                    <RemoveIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', py: 2 }}>
              暂无个人反思记录
            </Typography>
          )}
        </Box>

        <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
          <Typography variant='caption' color='success.main'>
            💡 个人反思是创作的重要来源，真诚的内心体验往往能打动读者。
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default PersonalReflectionsSection;
