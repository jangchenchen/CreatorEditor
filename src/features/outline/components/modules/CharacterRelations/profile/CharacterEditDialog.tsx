/**
 * 角色编辑对话框组件
 * 包含表单验证功能
 */

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
  Alert
} from '@mui/material';
import { Character, CharacterRole } from '../../../../types/outline.types';
import { ValidatedTextField } from '../../../common/ValidatedTextField';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { formValidationSets } from '../../../../utils/formValidation';

interface CharacterEditDialogProps {
  open: boolean;
  editMode: boolean;
  character: Character | null;
  onClose: () => void;
  onSave: (character: Character) => void;
  onCharacterChange: React.Dispatch<React.SetStateAction<Character | null>>;
}

export const CharacterEditDialog: React.FC<CharacterEditDialogProps> = ({
  open,
  editMode,
  character,
  onClose,
  onSave,
  onCharacterChange
}) => {
  // 表单验证
  const validation = useFormValidation({
    validationRules: {
      name: formValidationSets.character.name,
      age: formValidationSets.character.age,
      background: formValidationSets.character.background
    },
    validateOnBlur: true
  });

  // 处理保存
  const handleSave = () => {
    if (!character) return;
    
    const formData = {
      name: character.name,
      age: character.age,
      background: character.background
    };
    
    // 验证表单
    if (validation.validateForm(formData)) {
      onSave(character);
      validation.clearErrors();
    }
  };

  // 处理关闭
  const handleClose = () => {
    validation.clearErrors();
    onClose();
  };

  // 处理字段变化和验证
  const handleFieldChange = (field: keyof Character, value: any) => {
    onCharacterChange(prev => prev ? { ...prev, [field]: value } : null);
    validation.validateField(field, value);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {editMode ? '编辑角色' : '新增角色'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                fullWidth
                label="角色姓名"
                name="name"
                value={character?.name || ''}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                errors={validation.errors}
                required
                helperText="角色的姓名或称号"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                fullWidth
                label="角色年龄"
                name="age"
                type="number"
                value={character?.age || ''}
                onChange={(e) => handleFieldChange('age', Number(e.target.value))}
                errors={validation.errors}
                required
                helperText="角色的年龄（0-200）"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>角色类型</InputLabel>
                <Select
                  value={character?.role || 'supporting'}
                  label="角色类型"
                  onChange={(e) => onCharacterChange(prev => 
                    prev ? { ...prev, role: e.target.value as CharacterRole } : null
                  )}
                >
                  <MenuItem value="protagonist">主角</MenuItem>
                  <MenuItem value="antagonist">反派</MenuItem>
                  <MenuItem value="supporting">配角</MenuItem>
                  <MenuItem value="minor">次要</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <ValidatedTextField
                fullWidth
                multiline
                rows={2}
                label="角色背景"
                name="background"
                value={character?.background || ''}
                onChange={(e) => handleFieldChange('background', e.target.value)}
                errors={validation.errors}
                helperText="角色的出身、经历等背景信息（最多500字）"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="外貌描述"
                value={character?.appearance || ''}
                onChange={(e) => onCharacterChange(prev => 
                  prev ? { ...prev, appearance: e.target.value } : null
                )}
                helperText="角色的外貌特征描述"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="目标动机"
                value={character?.goals || ''}
                onChange={(e) => onCharacterChange(prev => 
                  prev ? { ...prev, goals: e.target.value } : null
                )}
                helperText="角色的目标、动机和追求"
              />
            </Grid>

            {/* 验证错误提示 */}
            {validation.errors.length > 0 && validation.isSubmitted && (
              <Grid item xs={12}>
                <Alert severity="error">
                  请修正以下错误：
                  <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                    {validation.errors.map((error, index) => (
                      <li key={index}>{error.message}</li>
                    ))}
                  </ul>
                </Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={validation.isSubmitted && !validation.isValid}
        >
          {editMode ? '保存' : '创建'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};