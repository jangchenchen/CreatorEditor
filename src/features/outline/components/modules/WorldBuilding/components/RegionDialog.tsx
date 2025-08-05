/**
 * Region Dialog Component
 * Dialog for adding/editing regions
 */

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
  Autocomplete
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { Region } from '../../../../types/outline.types';

interface RegionDialogProps {
  open: boolean;
  editingRegion: Region | null;
  formData: Partial<Region>;
  availableRegions: string[];
  onClose: () => void;
  onSave: () => void;
  onFormChange: (field: keyof Region) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConnectedRegionsChange: (event: any, newValue: string[]) => void;
}

export const RegionDialog: React.FC<RegionDialogProps> = ({
  open,
  editingRegion,
  formData,
  availableRegions,
  onClose,
  onSave,
  onFormChange,
  onConnectedRegionsChange
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingRegion ? '编辑地区' : '添加新地区'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="地区名称"
                value={formData.name || ''}
                onChange={onFormChange('name')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="地区描述"
                value={formData.description || ''}
                onChange={onFormChange('description')}
                placeholder="详细描述这个地区的特点、环境、文化等..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="故事重要性"
                value={formData.significance || ''}
                onChange={onFormChange('significance')}
                placeholder="这个地区在故事中的重要性和作用..."
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={availableRegions.filter(name => name !== formData.name)}
                value={formData.connectedRegions || []}
                onChange={onConnectedRegionsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="相连地区"
                    placeholder="选择或输入相连的地区名称"
                  />
                )}
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
          variant="contained" 
          startIcon={<SaveIcon />}
          disabled={!formData.name}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};