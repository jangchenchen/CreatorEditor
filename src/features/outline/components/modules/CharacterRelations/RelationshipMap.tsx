import React from 'react';
import { Box } from '@mui/material';
import {
  RelationshipList,
  RelationshipDialog,
  RelationshipToolbar,
  RelationshipVisualizer,
} from './index';
import useRelationshipMap from './hooks/useRelationshipMap';

const RelationshipMap: React.FC = () => {
  const {
    relationships,
    dialogOpen,
    selectedRelationship,
    viewMode,
    characters,
    handleAddRelationship,
    handleEditRelationship,
    handleDeleteRelationship,
    handleCloseDialog,
    handleSaveRelationship,
    setViewMode,
    getRelationshipIcon,
    getRelationshipLabel,
    getRelationshipColor,
    getCharacterName,
  } = useRelationshipMap();

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Toolbar */}
      <RelationshipToolbar
        relationshipCount={relationships.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddRelationship={handleAddRelationship}
      />

      {/* Main Content */}
      {viewMode === 'list' ? (
        <RelationshipList
          relationships={relationships}
          utils={{
            getRelationshipIcon,
            getRelationshipLabel,
            getRelationshipColor,
            getCharacterName,
          }}
          onEditRelationship={handleEditRelationship}
          onDeleteRelationship={handleDeleteRelationship}
        />
      ) : (
        <RelationshipVisualizer relationshipsCount={relationships.length} />
      )}

      {/* Edit Dialog */}
      <RelationshipDialog
        open={dialogOpen}
        relationship={selectedRelationship}
        characters={characters}
        onClose={handleCloseDialog}
        onSave={handleSaveRelationship}
      />
    </Box>
  );
};

export default RelationshipMap;
