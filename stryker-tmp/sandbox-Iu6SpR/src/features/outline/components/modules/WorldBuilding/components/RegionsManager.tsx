/**
 * Regions Manager Component
 * Manages regions list with add/edit/delete functionality
 */
// @ts-nocheck


import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Grid,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
} from '@mui/material';
import { Region } from '../../../../types/outline.types';

interface RegionsManagerProps {
  regions: Region[];
  onAddRegion: () => void;
  onEditRegion: (region: Region) => void;
  onDeleteRegion: (regionId: string) => void;
}

export const RegionsManager: React.FC<RegionsManagerProps> = ({
  regions,
  onAddRegion,
  onEditRegion,
  onDeleteRegion,
}) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationIcon sx={{ mr: 1 }} />
            地区设定 ({regions.length})
          </Typography>
          <IconButton color='primary' onClick={onAddRegion} title='添加地区'>
            <AddIcon />
          </IconButton>
        </Box>

        {regions.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
            <Typography variant='body2' color='text.secondary'>
              暂无地区设定，点击上方按钮添加第一个地区
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {regions.map(region => (
              <Grid item xs={12} sm={6} md={4} key={region.id}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      {region.name}
                    </Typography>
                    <Typography
                      variant='body2'
                      paragraph
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        '-webkit-line-clamp': 2,
                        '-webkit-box-orient': 'vertical',
                        minHeight: '40px',
                      }}
                    >
                      {region.description || '暂无描述'}
                    </Typography>
                    {region.significance && (
                      <Typography variant='caption' color='primary'>
                        重要性: {region.significance}
                      </Typography>
                    )}
                    {region.connectedRegions.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant='caption' color='text.secondary'>
                          相连地区: {region.connectedRegions.length}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <IconButton size='small' onClick={() => onEditRegion(region)} title='编辑地区'>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size='small'
                      color='error'
                      onClick={() => onDeleteRegion(region.id)}
                      title='删除地区'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};
