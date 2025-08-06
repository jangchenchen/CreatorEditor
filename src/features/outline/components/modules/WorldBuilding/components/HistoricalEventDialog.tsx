import React from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { HistoricalEvent } from '../../../../types/outline.types';

interface HistoricalEventDialogProps {
  open: boolean;
  editingEvent: HistoricalEvent | null;
  eventFormData: Partial<HistoricalEvent>;
  onClose: () => void;
  onSave: () => void;
  onFormChange: (
    field: keyof HistoricalEvent
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HistoricalEventDialog: React.FC<HistoricalEventDialogProps> = ({
  open,
  editingEvent,
  eventFormData,
  onClose,
  onSave,
  onFormChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>{editingEvent ? '编辑历史事件' : '添加新历史事件'}</DialogTitle>
      <DialogContent>
        <Box component='form' sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='事件名称'
                value={eventFormData.name || ''}
                onChange={onFormChange('name')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='历史时期'
                value={eventFormData.period || ''}
                onChange={onFormChange('period')}
                placeholder='例如: 古代早期, 中世纪, 近代...'
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='事件描述'
                value={eventFormData.description || ''}
                onChange={onFormChange('description')}
                placeholder='详细描述这个历史事件的经过...'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label='历史影响'
                value={eventFormData.impact || ''}
                onChange={onFormChange('impact')}
                placeholder='这个事件对后世产生了什么影响...'
              />
            </Grid>
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
          disabled={!eventFormData.name || !eventFormData.period}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HistoricalEventDialog;
