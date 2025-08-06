// @ts-nocheck
import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Chip } from '@mui/material';
import { inspirationCategories } from './constants';

interface InspirationCategoriesReferenceProps {
  onSelectExample: (example: string) => void;
}

export const InspirationCategoriesReference: React.FC<InspirationCategoriesReferenceProps> = ({
  onSelectExample,
}) => {
  return (
    <Card elevation={1} sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          灵感来源分类参考
        </Typography>
        <Grid container spacing={2}>
          {inspirationCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant='outlined' sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography
                      variant='subtitle1'
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <IconComponent color={category.color} />
                      <Box sx={{ ml: 1 }}>{category.title}</Box>
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {category.examples.map((example, exIndex) => (
                        <Chip
                          key={exIndex}
                          label={example}
                          size='small'
                          variant='outlined'
                          onClick={() => onSelectExample(example)}
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};
