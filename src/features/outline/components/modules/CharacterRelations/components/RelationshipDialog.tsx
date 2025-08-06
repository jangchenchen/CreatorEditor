/**
 * Relationship Dialog Component
 * Dialog for creating/editing relationships
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Relationship, Character } from '../../../../types/outline.types';

interface RelationshipDialogProps {
  open: boolean;
  relationship: Relationship | null;
  characters: Character[];
  onClose: () => void;
  onSave: () => void;
}

export const RelationshipDialog: React.FC<RelationshipDialogProps> = ({
  open,
  relationship,
  characters,
  onClose,
  onSave,
}) => {
  // Local state for form fields
  const [formData, setFormData] = React.useState({
    fromCharacter: relationship?.fromCharacter || '',
    toCharacter: relationship?.toCharacter || '',
    type: relationship?.type || 'friend',
    description: relationship?.description || '',
    developmentStage: relationship?.developmentStage || '',
    intensity: relationship?.intensity || 5,
    isReversible: relationship?.isReversible || false,
  });

  React.useEffect(() => {
    if (relationship) {
      setFormData({
        fromCharacter: relationship.fromCharacter,
        toCharacter: relationship.toCharacter,
        type: relationship.type,
        description: relationship.description,
        developmentStage: relationship.developmentStage,
        intensity: relationship.intensity,
        isReversible: relationship.isReversible,
      });
    }
  }, [relationship]);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{relationship ? '编辑关系' : '新增关系'}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>起始角色</InputLabel>
                <Select
                  value={formData.fromCharacter}
                  label='起始角色'
                  onChange={e => handleFieldChange('fromCharacter', e.target.value)}
                >
                  {characters.map(character => (
                    <MenuItem key={character.id} value={character.id}>
                      {character.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>目标角色</InputLabel>
                <Select
                  value={formData.toCharacter}
                  label='目标角色'
                  onChange={e => handleFieldChange('toCharacter', e.target.value)}
                >
                  {characters.map(character => (
                    <MenuItem key={character.id} value={character.id}>
                      {character.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>关系类型</InputLabel>
                <Select
                  value={formData.type}
                  label='关系类型'
                  onChange={e => handleFieldChange('type', e.target.value)}
                >
                  <MenuItem value='family'>亲情</MenuItem>
                  <MenuItem value='lover'>爱情</MenuItem>
                  <MenuItem value='friend'>友情</MenuItem>
                  <MenuItem value='enemy'>敌对</MenuItem>
                  <MenuItem value='mentor'>师徒</MenuItem>
                  <MenuItem value='rival'>竞争</MenuItem>
                  <MenuItem value='colleague'>同事</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label='关系描述'
                value={formData.description}
                onChange={e => handleFieldChange('description', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label='发展阶段'
                value={formData.developmentStage}
                onChange={e => handleFieldChange('developmentStage', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={onSave} variant='contained'>
          {relationship ? '保存' : '创建'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
