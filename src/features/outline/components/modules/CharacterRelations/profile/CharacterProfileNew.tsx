/**
 * 重构后的角色档案组件 - 主入口
 */

import React from 'react';
import { Box } from '@mui/material';
import { useCharacterProfile } from './useCharacterProfile';
import OptimizedCharacterList from '../../../common/OptimizedCharacterList';
import { CharacterEditDialog } from './CharacterEditDialog';

const CharacterProfileNew: React.FC = () => {
  const {
    characters,
    selectedCharacter,
    dialogOpen,
    editMode,
    handleEditCharacter,
    handleAddCharacter,
    handleCloseDialog,
    handleSaveCharacter,
    handleDeleteCharacter,
    setSelectedCharacter,
  } = useCharacterProfile();

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* 角色列表 */}
      <OptimizedCharacterList
        characters={characters}
        onEdit={handleEditCharacter}
        onDelete={handleDeleteCharacter}
        loading={false}
        searchPlaceholder='搜索角色...'
        emptyMessage='暂无角色数据'
        height={500}
      />

      {/* 角色编辑对话框 */}
      <CharacterEditDialog
        open={dialogOpen}
        editMode={editMode}
        character={selectedCharacter}
        onClose={handleCloseDialog}
        onSave={handleSaveCharacter}
        onCharacterChange={setSelectedCharacter}
      />
    </Box>
  );
};

export default CharacterProfileNew;
