import React from 'react';
import { Button, DialogActions, Typography } from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

interface DialogActionsProps {
  onClose: () => void;
  onSave: () => void;
  isSubmitting: boolean;
  canSave: boolean;
  submitError?: string;
}

export const ChapterDialogActions: React.FC<DialogActionsProps> = ({
  onClose,
  onSave,
  isSubmitting,
  canSave,
  submitError,
}) => {
  return (
    <>
      {submitError && (
        <Typography color='error' variant='body2' sx={{ ml: 2, mb: 1 }}>
          {submitError}
        </Typography>
      )}
      <DialogActions>
        <Button onClick={onClose} startIcon={<CancelIcon />} disabled={isSubmitting}>
          取消
        </Button>
        <Button
          onClick={onSave}
          variant='contained'
          startIcon={<SaveIcon />}
          disabled={!canSave || isSubmitting}
        >
          {isSubmitting ? '保存中...' : '保存'}
        </Button>
      </DialogActions>
    </>
  );
};
