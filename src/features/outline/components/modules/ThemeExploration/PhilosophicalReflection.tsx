import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { selectOutline } from '../../../outlineSlice';
import ReflectionStatistics from './components/ReflectionStatistics';
import PhilosophicalQuestionsSection from './components/PhilosophicalQuestionsSection';
import SocialCommentarySection from './components/SocialCommentarySection';
import PersonalReflectionsSection from './components/PersonalReflectionsSection';
import ReflectionImprovementGuide from './components/ReflectionImprovementGuide';
import { useReflectionState } from './hooks/useReflectionState';
import { getReflectionStats } from './utils/reflectionUtils';

const PhilosophicalReflection: React.FC = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const themes = outline.themes;
  
  const {
    philosophicalQuestions,
    socialCommentary,
    personalReflections,
    newQuestion,
    newCommentary,
    newReflection,
    handleAddItem,
    handleRemoveItem,
    handleInputChange,
    getReflectionState
  } = useReflectionState(themes);

  const stats = getReflectionStats({
    philosophicalQuestions,
    socialCommentary,
    personalReflections
  });

  const handleSave = () => {
    const reflectionState = getReflectionState();
    // TODO: 使用 dispatch 更新 Redux state
    console.log('保存哲学思考:', reflectionState);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        哲学思考与反思
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        深入探讨故事中蕴含的哲学思辨、社会议题和个人感悟，提升作品的思想深度。
      </Typography>

      <ReflectionStatistics
        questionsCount={stats.questionsCount}
        commentaryCount={stats.commentaryCount}
        reflectionsCount={stats.reflectionsCount}
      />

      <PhilosophicalQuestionsSection
        questions={philosophicalQuestions}
        newQuestion={newQuestion}
        onNewQuestionChange={(value) => handleInputChange('question', value)}
        onAddQuestion={() => handleAddItem('question')}
        onRemoveQuestion={(index) => handleRemoveItem('question', index)}
      />

      <SocialCommentarySection
        commentary={socialCommentary}
        newCommentary={newCommentary}
        onNewCommentaryChange={(value) => handleInputChange('commentary', value)}
        onAddCommentary={() => handleAddItem('commentary')}
        onRemoveCommentary={(index) => handleRemoveItem('commentary', index)}
      />

      <PersonalReflectionsSection
        reflections={personalReflections}
        newReflection={newReflection}
        onNewReflectionChange={(value) => handleInputChange('reflection', value)}
        onAddReflection={() => handleAddItem('reflection')}
        onRemoveReflection={(index) => handleRemoveItem('reflection', index)}
      />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
          startIcon={<SaveIcon />}
          sx={{ minWidth: 140 }}
        >
          保存哲学思考
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <ReflectionImprovementGuide />
    </Box>
  );
};

export default PhilosophicalReflection;