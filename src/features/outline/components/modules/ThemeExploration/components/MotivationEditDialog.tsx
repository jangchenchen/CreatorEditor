import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Avatar
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { Character, CharacterMotivation } from '../../../../types/outline.types';
import { getRoleColor, getRoleLabel } from '../utils/motivationUtils';

interface MotivationEditDialogProps {
  open: boolean;
  editingMotivation: CharacterMotivation | null;
  formData: Partial<CharacterMotivation>;
  characters: Character[];
  onClose: () => void;
  onSave: () => void;
  onFormChange: (field: keyof CharacterMotivation) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => void;
}

const MotivationEditDialog: React.FC<MotivationEditDialogProps> = ({
  open,
  editingMotivation,
  formData,
  characters,
  onClose,
  onSave,
  onFormChange
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingMotivation ? '编辑角色动机' : '添加角色动机分析'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* 角色选择 */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>选择角色</InputLabel>
                <Select
                  value={formData.characterId || ''}
                  onChange={onFormChange('characterId')}
                  label="选择角色"
                  disabled={!!editingMotivation}
                >
                  {characters.map((character) => (
                    <MenuItem key={character.id} value={character.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ 
                          mr: 2, 
                          width: 24, 
                          height: 24, 
                          bgcolor: `${getRoleColor(character.role)}.main` 
                        }}>
                          <PersonIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        {character.name} - {getRoleLabel(character.role)}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* 内在冲突 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="内在冲突"
                value={formData.innerConflict || ''}
                onChange={onFormChange('innerConflict')}
                placeholder="描述角色内心的矛盾和挣扎..."
              />
            </Grid>

            {/* 成长动机 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="成长动机"
                value={formData.growthMotivation || ''}
                onChange={onFormChange('growthMotivation')}
                placeholder="什么驱使角色成长和改变..."
              />
            </Grid>

            {/* 情感历程 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="情感历程"
                value={formData.emotionalJourney || ''}
                onChange={onFormChange('emotionalJourney')}
                placeholder="角色的情感变化轨迹..."
              />
            </Grid>

            {/* 道德困境 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="道德困境"
                value={formData.moralDilemma || ''}
                onChange={onFormChange('moralDilemma')}
                placeholder="角色面临的道德选择和困境..."
              />
            </Grid>

            {/* 解决方案 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="解决方案"
                value={formData.resolution || ''}
                onChange={onFormChange('resolution')}
                placeholder="角色如何解决内在冲突，实现成长..."
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
          disabled={!formData.characterId}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MotivationEditDialog;