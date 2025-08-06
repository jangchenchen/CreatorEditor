/**
 * Region Dialog Component
 * Handles region creation and editing dialog with form validation
 */

import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
  Alert,
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { selectOutline } from '../../../../outlineSlice';
import { Region } from '../../../../types/outline.types';
import { ValidatedTextField } from '../../../common/ValidatedTextField';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { formValidationSets } from '../../../../utils/formValidation';

interface RegionDialogProps {
  open: boolean;
  editingRegion: Region | null;
  formData: Partial<Region>;
  onClose: () => void;
  onSave: (validatedData: Partial<Region>) => void;
  onFormChange: (field: keyof Region) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConnectedRegionsChange: (event: any, newValue: string[]) => void;
}

const RegionDialog: React.FC<RegionDialogProps> = ({
  open,
  editingRegion,
  formData,
  onClose,
  onSave,
  onFormChange,
  onConnectedRegionsChange,
}) => {
  const outline = useSelector(selectOutline);
  const existingRegions = outline.world.geography.regions;

  // 表单验证
  const validation = useFormValidation({
    validationRules: {
      name: formValidationSets.region.name,
      description: formValidationSets.region.description,
    },
    validateOnBlur: true,
  });

  // 处理保存
  const handleSave = () => {
    const validationData = {
      name: formData.name,
      description: formData.description,
    };

    // 验证表单
    if (validation.validateForm(validationData)) {
      onSave(formData);
      validation.clearErrors();
    }
  };

  // 处理关闭
  const handleClose = () => {
    validation.clearErrors();
    onClose();
  };

  // 处理字段变化和验证
  const handleFieldChange =
    (field: keyof Region) => (event: React.ChangeEvent<HTMLInputElement>) => {
      onFormChange(field)(event);
      validation.validateField(field, event.target.value);
    };

  const availableRegions = existingRegions.map(r => r.name).filter(name => name !== formData.name);

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>{editingRegion ? '编辑地区' : '添加新地区'}</DialogTitle>
      <DialogContent>
        <Box component='form' sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ValidatedTextField
                fullWidth
                label='地区名称'
                name='name'
                value={formData.name || ''}
                onChange={handleFieldChange('name')}
                errors={validation.errors}
                required
                helperText='地区的名称或称号'
              />
            </Grid>
            <Grid item xs={12}>
              <ValidatedTextField
                fullWidth
                multiline
                rows={3}
                label='地区描述'
                name='description'
                value={formData.description || ''}
                onChange={handleFieldChange('description')}
                errors={validation.errors}
                placeholder='详细描述这个地区的特点、环境、文化等...'
                helperText='地区的详细描述（最多300字）'
              />
            </Grid>

            {/* 验证错误提示 */}
            {validation.errors.length > 0 && validation.isSubmitted && (
              <Grid item xs={12}>
                <Alert severity='error'>
                  请修正以下错误：
                  <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                    {validation.errors.map((error, index) => (
                      <li key={index}>{error.message}</li>
                    ))}
                  </ul>
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='故事重要性'
                value={formData.significance || ''}
                onChange={onFormChange('significance')}
                placeholder='这个地区在故事中的重要性和作用...'
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={availableRegions}
                value={formData.connectedRegions || []}
                onChange={onConnectedRegionsChange}
                renderInput={params => (
                  <TextField {...params} label='相连地区' placeholder='选择或输入相连的地区名称' />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} startIcon={<CancelIcon />}>
          取消
        </Button>
        <Button
          onClick={handleSave}
          variant='contained'
          startIcon={<SaveIcon />}
          disabled={validation.isSubmitted && !validation.isValid}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegionDialog;
