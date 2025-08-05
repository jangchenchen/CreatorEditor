/**
 * Landmarks Manager Component
 * Manages landmarks list with add/remove functionality
 */

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Chip
} from '@mui/material';

interface LandmarksManagerProps {
  landmarks: string[];
  newLandmark: string;
  onNewLandmarkChange: (value: string) => void;
  onAddLandmark: () => void;
  onRemoveLandmark: (index: number) => void;
}

export const LandmarksManager: React.FC<LandmarksManagerProps> = ({
  landmarks,
  newLandmark,
  onNewLandmarkChange,
  onAddLandmark,
  onRemoveLandmark
}) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          重要地标
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="添加地标"
            value={newLandmark}
            onChange={(e) => onNewLandmarkChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onAddLandmark()}
          />
          <Button 
            variant="outlined" 
            onClick={onAddLandmark}
            disabled={!newLandmark.trim()}
          >
            添加
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {landmarks.map((landmark, index) => (
            <Chip
              key={index}
              label={landmark}
              onDelete={() => onRemoveLandmark(index)}
              color="primary"
              variant="outlined"
            />
          ))}
          {landmarks.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              暂无地标信息
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};