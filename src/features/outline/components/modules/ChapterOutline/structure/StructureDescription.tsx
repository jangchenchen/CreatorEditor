import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

interface StructureDescriptionProps {
  overallStructure: string;
  onStructureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveStructure: () => void;
}

const StructureDescription: React.FC<StructureDescriptionProps> = ({
  overallStructure,
  onStructureChange,
  onSaveStructure
}) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        整体结构说明
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        value={overallStructure}
        onChange={onStructureChange}
        placeholder="描述小说的整体结构特点、章节安排的逻辑、情节发展的节奏等..."
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={onSaveStructure}
      >
        保存结构说明
      </Button>
    </Paper>
  );
};

export default StructureDescription;