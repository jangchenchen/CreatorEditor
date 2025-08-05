/**
 * Natural Features Manager Component
 * Handles natural features management
 */

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Chip
} from '@mui/material';

interface NaturalFeaturesManagerProps {
  naturalFeatures: string[];
  newFeature: string;
  onNewFeatureChange: (feature: string) => void;
  onAddFeature: () => void;
  onRemoveFeature: (index: number) => void;
}

const NaturalFeaturesManager: React.FC<NaturalFeaturesManagerProps> = ({
  naturalFeatures,
  newFeature,
  onNewFeatureChange,
  onAddFeature,
  onRemoveFeature
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onAddFeature();
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          自然特征
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="添加自然特征"
            value={newFeature}
            onChange={(e) => onNewFeatureChange(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button 
            variant="outlined" 
            onClick={onAddFeature}
            disabled={!newFeature.trim()}
          >
            添加
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {naturalFeatures.map((feature, index) => (
            <Chip
              key={index}
              label={feature}
              onDelete={() => onRemoveFeature(index)}
              color="secondary"
              variant="outlined"
            />
          ))}
          {naturalFeatures.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              暂无自然特征信息
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default NaturalFeaturesManager;