/**
 * 角色列表组件
 */
// @ts-nocheck


import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Character } from '../../../../types/outline.types';
import { CharacterCard } from './CharacterCard';

interface CharacterListProps {
  characters: Character[];
  onEdit: (character: Character) => void;
  onDelete: (characterId: string) => void;
  onAdd: () => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <>
      {/* 角色列表头部 */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h6'>角色档案 ({characters.length})</Typography>
        <Button variant='contained' startIcon={<AddIcon />} onClick={onAdd} size='small'>
          新增角色
        </Button>
      </Box>

      {/* 角色卡片网格 */}
      <Grid container spacing={2}>
        {characters.map(character => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <CharacterCard character={character} onEdit={onEdit} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
