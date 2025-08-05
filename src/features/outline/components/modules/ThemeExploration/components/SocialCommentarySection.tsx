import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Public as SocialIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';

interface SocialCommentarySectionProps {
  commentary: string[];
  newCommentary: string;
  onNewCommentaryChange: (value: string) => void;
  onAddCommentary: () => void;
  onRemoveCommentary: (index: number) => void;
}

const SocialCommentarySection: React.FC<SocialCommentarySectionProps> = ({
  commentary,
  newCommentary,
  onNewCommentaryChange,
  onAddCommentary,
  onRemoveCommentary
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <SocialIcon sx={{ mr: 1, color: 'secondary.main' }} />
          社会评论 ({commentary.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" color="text.secondary" paragraph>
          分析故事对当代或历史社会现象的观察和评价，体现作品的社会价值和批判精神。
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={3}
              label="添加社会评论"
              value={newCommentary}
              onChange={(e) => onNewCommentaryChange(e.target.value)}
              placeholder="对社会现象、制度问题、时代特征的观察和评价..."
            />
            <Button 
              variant="contained" 
              onClick={onAddCommentary}
              disabled={!newCommentary.trim()}
              sx={{ minWidth: 80 }}
            >
              添加
            </Button>
          </Box>
          
          {commentary.length > 0 ? (
            <Grid container spacing={2}>
              {commentary.map((comment, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <SocialIcon color="secondary" sx={{ mr: 1, mt: 0.5 }} />
                        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                          社会评论 {index + 1}
                        </Typography>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => onRemoveCommentary(index)}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {comment}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              暂无社会评论记录
            </Typography>
          )}
        </Box>
        
        <Box sx={{ p: 2, bgcolor: 'secondary.50', borderRadius: 1 }}>
          <Typography variant="caption" color="secondary.main">
            💡 社会评论要避免过于直白的说教，通过故事情节和角色经历来体现社会观察。
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SocialCommentarySection;