// @ts-nocheck
import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Movie as SceneIcon } from '@mui/icons-material';
import { Scene, Character } from '../../../../types/outline.types';
import SceneCard from './SceneCard';

interface SceneListProps {
  scenes: Scene[];
  characters: Character[];
  onEdit: (scene: Scene) => void;
  onDelete: (sceneId: string) => void;
  onAddScene: () => void;
}

const SceneList: React.FC<SceneListProps> = ({
  scenes,
  characters,
  onEdit,
  onDelete,
  onAddScene,
}) => {
  if (scenes.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <SceneIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant='h6' color='text.secondary' gutterBottom>
            暂无场景
          </Typography>
          <Typography variant='body2' color='text.secondary' paragraph>
            开始添加场景来详细规划这一章节的内容
          </Typography>
          <Button variant='outlined' onClick={onAddScene}>
            添加第一个场景
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={2}>
      {scenes.map((scene, index) => (
        <Grid item xs={12} md={6} key={scene.id}>
          <SceneCard
            scene={scene}
            index={index}
            characters={characters}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SceneList;
