// @ts-nocheck
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Grid, TextField } from '@mui/material';
import { Chapter, Character } from '../../../../types/outline.types';
import { ChapterDialogProps } from './dialog/types';
import { useChapterDialog } from './dialog/useChapterDialog';
import { BasicInfoForm } from './dialog/BasicInfoForm';
import { TransitionSettings } from './dialog/TransitionSettings';
import { ChapterDialogActions } from './dialog/DialogActions';

const ChapterDialog: React.FC<ChapterDialogProps> = props => {
  const { state, handleFormChange, handleTransitionChange, handleArrayFieldChange, handleSave } =
    useChapterDialog(props);

  const { open, editingChapter, onClose } = props;
  const { formData, isSubmitting, errors } = state;

  const canSave = formData.title && formData.number && !isSubmitting;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>{editingChapter ? '编辑章节' : '添加新章节'}</DialogTitle>
      <DialogContent>
        <Box component='form' sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <BasicInfoForm
              formData={formData}
              characters={props.characters}
              onFormChange={handleFormChange}
              onArrayFieldChange={handleArrayFieldChange}
              errors={errors}
            />

            <TransitionSettings
              transitions={formData.transitions}
              onTransitionChange={handleTransitionChange}
            />

            {/* 备注 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label='备注'
                value={formData.notes || ''}
                onChange={handleFormChange('notes')}
                placeholder='章节创作备注...'
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <ChapterDialogActions
        onClose={onClose}
        onSave={handleSave}
        isSubmitting={isSubmitting}
        canSave={canSave}
        submitError={errors.submit}
      />
    </Dialog>
  );
};

export default ChapterDialog;
