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
import { Subplot } from '../../../../types/outline.types';
import SubplotBasicFields from './SubplotBasicFields';
import SubplotDetailsFields from './SubplotDetailsFields';

interface SubplotEditDialogProps {
  open: boolean;
  editingSubplot: Subplot | null;
  formData: Partial<Subplot>;
  characters: any[];
  onClose: () => void;
  onSave: () => void;
  onFormChange: (
    field: keyof Subplot
  ) => (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => void;
  onCharactersChange: (event: any, newValue: string[]) => void;
}

const SubplotEditDialog: React.FC<SubplotEditDialogProps> = ({
  open,
  editingSubplot,
  formData,
  characters,
  onClose,
  onSave,
  onFormChange,
  onCharactersChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>{editingSubplot ? '编辑副线情节' : '添加新副线情节'}</DialogTitle>
      <DialogContent>
        <Box component='form' sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <SubplotBasicFields formData={formData} onFormChange={onFormChange} />

            <SubplotDetailsFields
              formData={formData}
              characters={characters}
              onFormChange={onFormChange}
              onCharactersChange={onCharactersChange}
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

export default SubplotEditDialog;
