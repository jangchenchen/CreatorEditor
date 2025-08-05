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
import { Character, SecondaryCharacterStory } from '../../../../types/outline.types';
import { getRoleColor, getRoleLabel, getSecondaryCharacters } from '../utils/storyUtils';

interface StoryEditDialogProps {
  open: boolean;
  editingStory: SecondaryCharacterStory | null;
  formData: Partial<SecondaryCharacterStory>;
  characters: Character[];
  onClose: () => void;
  onSave: () => void;
  onFormChange: (field: keyof SecondaryCharacterStory) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => void;
}

const StoryEditDialog: React.FC<StoryEditDialogProps> = ({
  open,
  editingStory,
  formData,
  characters,
  onClose,
  onSave,
  onFormChange
}) => {
  const secondaryCharacters = getSecondaryCharacters(characters);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingStory ? '编辑配角故事线' : '添加配角故事线'}
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
                  disabled={!!editingStory}
                >
                  {secondaryCharacters.map((character) => (
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

            {/* 个人目标 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="个人目标"
                value={formData.personalGoal || ''}
                onChange={onFormChange('personalGoal')}
                placeholder="这个角色想要达成什么个人目标..."
              />
            </Grid>

            {/* 背景故事 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="背景故事"
                value={formData.backstory || ''}
                onChange={onFormChange('backstory')}
                placeholder="这个角色的过往经历、成长背景..."
              />
            </Grid>

            {/* 发展弧线 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="发展弧线"
                value={formData.developmentArc || ''}
                onChange={onFormChange('developmentArc')}
                placeholder="角色在故事中的成长和变化轨迹..."
              />
            </Grid>

            {/* 解决方式 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="解决方式"
                value={formData.resolutionMethod || ''}
                onChange={onFormChange('resolutionMethod')}
                placeholder="角色的个人目标如何实现或解决..."
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

export default StoryEditDialog;