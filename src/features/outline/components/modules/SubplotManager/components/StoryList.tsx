import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { Character, SecondaryCharacterStory } from '../../../../types/outline.types';
import StoryCard from './StoryCard';

interface StoryListProps {
  secondaryStories: SecondaryCharacterStory[];
  characters: Character[];
  onEdit: (story: SecondaryCharacterStory) => void;
  onDelete: (characterId: string) => void;
  onAddStory: () => void;
}

const StoryList: React.FC<StoryListProps> = ({
  secondaryStories,
  characters,
  onEdit,
  onDelete,
  onAddStory
}) => {
  if (secondaryStories.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            暂无配角故事线
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            为配角创建独立的故事线，丰富角色层次
          </Typography>
          <Button variant="outlined" onClick={onAddStory}>
            添加第一个故事线
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={2}>
      {secondaryStories.map((story) => (
        <Grid item xs={12} md={6} key={story.characterId}>
          <StoryCard
            story={story}
            characters={characters}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StoryList;