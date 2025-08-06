import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  TextField,
  Autocomplete,
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { Scene, Character } from '../../../../types/outline.types';

interface SceneEditDialogProps {
  open: boolean;
  editingScene: Scene | null;
  formData: Partial<Scene>;
  characters: Character[];
  onClose: () => void;
  onSave: () => void;
  onFormChange: (field: keyof Scene) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCharactersChange: (event: any, newValue: string[]) => void;
}

const SceneEditDialog: React.FC<SceneEditDialogProps> = ({
  open,
  editingScene,
  formData,
  characters,
  onClose,
  onSave,
  onFormChange,
  onCharactersChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>{editingScene ? '编辑场景' : '添加新场景'}</DialogTitle>
      <DialogContent>
        <Box component='form' sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* Basic information */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='场景标题'
                value={formData.title || ''}
                onChange={onFormChange('title')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='发生地点'
                value={formData.location || ''}
                onChange={onFormChange('location')}
                placeholder='例如: 咖啡厅, 学校操场, 角色家中...'
              />
            </Grid>

            {/* Scene description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='场景描述'
                value={formData.description || ''}
                onChange={onFormChange('description')}
                placeholder='详细描述这个场景发生的情况...'
              />
            </Grid>

            {/* Characters */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={characters.map(c => c.id)}
                getOptionLabel={option => characters.find(c => c.id === option)?.name || option}
                value={formData.characters || []}
                onChange={onCharactersChange}
                renderInput={params => (
                  <TextField {...params} label='出场角色' placeholder='选择在此场景中出现的角色' />
                )}
              />
            </Grid>

            {/* Functional information */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='场景目的'
                value={formData.purpose || ''}
                onChange={onFormChange('purpose')}
                placeholder='这个场景在故事中的作用和目的...'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='场景冲突'
                value={formData.conflict || ''}
                onChange={onFormChange('conflict')}
                placeholder='场景中的主要冲突或张力...'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='场景结果'
                value={formData.outcome || ''}
                onChange={onFormChange('outcome')}
                placeholder='场景结束时的状态或结果...'
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
          disabled={!formData.title}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SceneEditDialog;
