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
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  QuestionMark as QuestionIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';

interface PhilosophicalQuestionsSectionProps {
  questions: string[];
  newQuestion: string;
  onNewQuestionChange: (value: string) => void;
  onAddQuestion: () => void;
  onRemoveQuestion: (index: number) => void;
}

const PhilosophicalQuestionsSection: React.FC<PhilosophicalQuestionsSectionProps> = ({
  questions,
  newQuestion,
  onNewQuestionChange,
  onAddQuestion,
  onRemoveQuestion
}) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <QuestionIcon sx={{ mr: 1, color: 'primary.main' }} />
          哲学思考 ({questions.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" color="text.secondary" paragraph>
          记录故事中涉及的哲学问题和深层思辨，引发读者对人生、存在、价值等根本问题的思考。
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              label="添加哲学问题"
              value={newQuestion}
              onChange={(e) => onNewQuestionChange(e.target.value)}
              placeholder="例如: 什么是真正的自由？人生的意义在哪里？"
            />
            <Button 
              variant="contained" 
              onClick={onAddQuestion}
              disabled={!newQuestion.trim()}
              sx={{ minWidth: 80 }}
            >
              添加
            </Button>
          </Box>
          
          {questions.length > 0 ? (
            <List>
              {questions.map((question, index) => (
                <ListItem key={index} sx={{ bgcolor: 'primary.50', mb: 1, borderRadius: 1 }}>
                  <ListItemIcon>
                    <QuestionIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={`问题 ${index + 1}`}
                    secondary={question}
                  />
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => onRemoveQuestion(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              暂无哲学思考记录
            </Typography>
          )}
        </Box>
        
        <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
          <Typography variant="caption" color="primary.main">
            💡 哲学思考应该自然地融入故事情节，通过角色的经历和选择来探讨深层问题。
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default PhilosophicalQuestionsSection;