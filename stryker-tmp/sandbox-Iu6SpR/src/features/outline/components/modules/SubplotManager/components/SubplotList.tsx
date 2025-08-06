// @ts-nocheck
import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Subplot } from '../../../../types/outline.types';
import SubplotCard from './SubplotCard';

interface SubplotListProps {
  subplots: Subplot[];
  characters: any[];
  onEdit: (subplot: Subplot) => void;
  onDelete: (subplotId: string) => void;
  onAddSubplot: () => void;
}

const SubplotList: React.FC<SubplotListProps> = ({
  subplots,
  characters,
  onEdit,
  onDelete,
  onAddSubplot,
}) => {
  if (subplots.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant='h6' color='text.secondary' gutterBottom>
            暂无副线情节
          </Typography>
          <Typography variant='body2' color='text.secondary' paragraph>
            开始添加副线情节来丰富您的故事内容
          </Typography>
          <Button variant='outlined' onClick={onAddSubplot}>
            添加第一个副线
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={2}>
      {subplots.map(subplot => (
        <Grid item xs={12} md={6} lg={4} key={subplot.id}>
          <SubplotCard
            subplot={subplot}
            characters={characters}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SubplotList;
