/**
 * Climate Settings Component
 * Handles climate and weather configuration
 */

import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography
} from '@mui/material';
import { Terrain as TerrainIcon } from '@mui/icons-material';

interface ClimateSettingsProps {
  climate: string;
  onClimateChange: (climate: string) => void;
}

const ClimateSettings: React.FC<ClimateSettingsProps> = ({
  climate,
  onClimateChange
}) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <TerrainIcon sx={{ mr: 1 }} />
          气候环境
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="气候描述"
          value={climate}
          onChange={(e) => onClimateChange(e.target.value)}
          placeholder="描述故事世界的气候特点、季节变化、天气模式..."
          variant="outlined"
        />
      </CardContent>
    </Card>
  );
};

export default ClimateSettings;