// @ts-nocheck
import React from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { CreativeIdea } from '../../../../types/outline.types';
import IdeaBasicFields from './IdeaBasicFields';
import IdeaDetailsFields from './IdeaDetailsFields';
import IdeaTagsFields from './IdeaTagsFields';

interface IdeaEditDialogProps {
  open: boolean;
  editingIdea: CreativeIdea | null;
  formData: Partial<CreativeIdea>;
  onClose: () => void;
  onSave: () => void;
  onFormChange: (
    field: keyof CreativeIdea
  ) => (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => void;
  onArrayFieldChange: (
    field: keyof Pick<CreativeIdea, 'relatedElements' | 'tags'>
  ) => (event: any, newValue: string[]) => void;
  onPriorityChange: (priority: number) => void;
}

const IdeaEditDialog: React.FC<IdeaEditDialogProps> = ({
  open,
  editingIdea,
  formData,
  onClose,
  onSave,
  onFormChange,
  onArrayFieldChange,
  onPriorityChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>{editingIdea ? '编辑创意' : '添加新创意'}</DialogTitle>
      <DialogContent>
        <Box component='form' sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <IdeaBasicFields formData={formData} onFormChange={onFormChange} />

            <IdeaDetailsFields
              formData={formData}
              onFormChange={onFormChange}
              onPriorityChange={onPriorityChange}
            />

            <IdeaTagsFields
              formData={formData}
              onFormChange={onFormChange}
              onArrayFieldChange={onArrayFieldChange}
            />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CancelIcon />}>
          取消
        </Button>
        <Button
          onClick={onSave}
          variant='contained'
          startIcon={<SaveIcon />}
          disabled={!formData.title}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IdeaEditDialog;
