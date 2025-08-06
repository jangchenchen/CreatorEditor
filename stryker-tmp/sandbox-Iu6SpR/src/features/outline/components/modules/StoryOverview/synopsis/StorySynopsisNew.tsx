// @ts-nocheck
import React from 'react';
import { Box, Grid, Card, CardContent, Divider, Typography } from '@mui/material';
import { SynopsisHeader } from './SynopsisHeader';
import { SynopsisProgressBar } from './SynopsisProgressBar';
import { SynopsisStageCard } from './SynopsisStageCard';
import { SynopsisToneCard } from './SynopsisToneCard';
import { SynopsisTips } from './SynopsisTips';
import { useSynopsisEditor } from './useSynopsisEditor';

export const StorySynopsisNew: React.FC = () => {
  const { synopsis, handleFieldChange, completionRate, getStageDescription } = useSynopsisEditor();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <SynopsisHeader completionRate={completionRate} />

      <Typography variant='body2' color='text.secondary' paragraph>
        按照经典的"起承转合"结构，概述故事的主要发展脉络和整体基调。
      </Typography>

      <SynopsisProgressBar completionRate={completionRate} />

      <Grid container spacing={3}>
        {/* 起 - 开端 */}
        <Grid item xs={12} md={6}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent>
              <SynopsisStageCard
                title='故事开端'
                description={getStageDescription('beginning')}
                value={synopsis.beginning}
                onChange={handleFieldChange('beginning')}
                color='primary'
                label='起'
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 承 - 发展 */}
        <Grid item xs={12} md={6}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent>
              <SynopsisStageCard
                title='情节发展'
                description={getStageDescription('development')}
                value={synopsis.development}
                onChange={handleFieldChange('development')}
                color='info'
                label='承'
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 转 - 高潮 */}
        <Grid item xs={12} md={6}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent>
              <SynopsisStageCard
                title='故事高潮'
                description={getStageDescription('climax')}
                value={synopsis.climax}
                onChange={handleFieldChange('climax')}
                color='warning'
                label='转'
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 合 - 结局 */}
        <Grid item xs={12} md={6}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent>
              <SynopsisStageCard
                title='故事结局'
                description={getStageDescription('ending')}
                value={synopsis.ending}
                onChange={handleFieldChange('ending')}
                color='success'
                label='合'
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 整体基调 */}
        <Grid item xs={12}>
          <Card elevation={1}>
            <CardContent>
              <SynopsisToneCard
                value={synopsis.overallTone}
                onChange={handleFieldChange('overallTone')}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <SynopsisTips />
    </Box>
  );
};

export default StorySynopsisNew;
