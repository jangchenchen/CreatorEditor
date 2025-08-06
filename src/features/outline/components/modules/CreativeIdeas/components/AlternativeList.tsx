import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { CompareArrows as AlternativeIcon } from '@mui/icons-material';
import { PlotAlternative } from '../../../../types/outline.types';
import AlternativeCard from './AlternativeCard';

interface AlternativeListProps {
  alternatives: PlotAlternative[];
  onEdit: (alternative: PlotAlternative) => void;
  onDelete: (alternativeId: string) => void;
  onAddAlternative: () => void;
}

const AlternativeList: React.FC<AlternativeListProps> = ({
  alternatives,
  onEdit,
  onDelete,
  onAddAlternative,
}) => {
  if (alternatives.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <AlternativeIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant='h6' color='text.secondary' gutterBottom>
            暂无情节替代方案
          </Typography>
          <Typography variant='body2' color='text.secondary' paragraph>
            为关键情节设计多种可能的发展方向，有助于选择最佳的故事走向
          </Typography>
          <Button variant='outlined' onClick={onAddAlternative}>
            创建第一个替代方案
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={2}>
      {alternatives.map(alternative => (
        <Grid item xs={12} key={alternative.id}>
          <AlternativeCard alternative={alternative} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AlternativeList;
