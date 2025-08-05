/**
 * 角色编辑对话框组件
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
  Grid
} from '@mui/material';
import { Character, CharacterRole } from '../../../../types/outline.types';

interface CharacterEditDialogProps {
  open: boolean;
  editMode: boolean;
  character: Character | null;
  onClose: () => void;
  onSave: () => void;
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
              <TextField
                fullWidth
                label="角色姓名"
                value={character?.name || ''}
                onChange={(e) => onCharacterChange(prev => 
                  prev ? { ...prev, name: e.target.value } : null
                )}
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
              <TextField
                fullWidth
                multiline
                rows={2}
                label="角色背景"
                value={character?.background || ''}
                onChange={(e) => onCharacterChange(prev => 
                  prev ? { ...prev, background: e.target.value } : null
                )}
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
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={onSave} variant="contained">
          {editMode ? '保存' : '创建'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};