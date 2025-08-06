import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { PlotEvent } from '../../../../types/outline.types';

interface EventEditDialogProps {
  open: boolean;
  editingEvent: PlotEvent | null;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
  isFormValid: boolean;
}

export const EventEditDialog: React.FC<EventEditDialogProps> = ({
  open,
  editingEvent,
  onClose,
  onSave,
  children,
  isFormValid,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>{editingEvent ? '编辑事件' : '添加新事件'}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CancelIcon />}>
          取消
        </Button>
        <Button
          onClick={onSave}
          variant='contained'
          startIcon={<SaveIcon />}
          disabled={!isFormValid}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};
