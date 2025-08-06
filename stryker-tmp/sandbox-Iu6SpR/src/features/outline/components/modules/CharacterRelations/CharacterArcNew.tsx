// @ts-nocheck
import React from 'react';
import { Grid, Box } from '@mui/material';
import { CharacterArcProps } from './arc/types';
import { useCharacterArc } from './arc/useCharacterArc';
import { CharacterSelector } from './arc/CharacterSelector';
import { CharacterInfoCard } from './arc/CharacterInfoCard';
import { ArcTimeline } from './arc/ArcTimeline';

const CharacterArc: React.FC<CharacterArcProps> = props => {
  const {
    state,
    progress,
    steps,
    characters,
    handleCharacterChange,
    handleStepClick,
    handlePrevious,
    handleNext,
    handleEdit,
    handleSave,
    handleCancel,
    handleEventTextChange,
  } = useCharacterArc(props);

  const { selectedCharacter, activeStep, isEditing, editingEvent, eventText } = state;

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      <CharacterSelector
        characters={characters}
        selectedCharacter={selectedCharacter}
        onCharacterChange={handleCharacterChange}
      />

      <Grid container spacing={3}>
        {/* 角色基本信息 */}
        <Grid item xs={12} md={4}>
          {selectedCharacter && (
            <CharacterInfoCard character={selectedCharacter} progress={progress} />
          )}
        </Grid>

        {/* 发展弧线时间线 */}
        <Grid item xs={12} md={8}>
          {selectedCharacter && (
            <ArcTimeline
              steps={steps}
              activeStep={activeStep}
              onStepClick={handleStepClick}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onEdit={handleEdit}
              isEditing={isEditing}
              editingEvent={editingEvent}
              eventText={eventText}
              onEventTextChange={handleEventTextChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterArc;
