import { useState } from 'react';
import { Character } from '../../../../types/outline.types';
import { CharacterArcState, CharacterArcProps, CharacterArcActions } from './types';
import { mockCharacters } from './constants';

export const useCharacterArcState = (props: CharacterArcProps = {}) => {
  const { characters = mockCharacters, selectedCharacterId, onCharacterChange } = props;
  
  const [state, setState] = useState<CharacterArcState>({
    selectedCharacter: characters[0] as Character,
    activeStep: 0,
    isEditing: false,
    editingEvent: null,
    eventText: ''
  });

  const handleCharacterChange = (characterId: string) => {
    const character = characters.find(c => c.id === characterId) || null;
    setState(prev => ({
      ...prev,
      selectedCharacter: character as Character,
      activeStep: 0,
      isEditing: false,
      editingEvent: null,
      eventText: ''
    }));
    
    if (onCharacterChange) {
      onCharacterChange(characterId);
    }
  };

  const handleStepClick = (step: number) => {
    setState(prev => ({
      ...prev,
      activeStep: step,
      isEditing: false,
      editingEvent: null,
      eventText: ''
    }));
  };

  const handlePrevious = () => {
    setState(prev => ({
      ...prev,
      activeStep: Math.max(0, prev.activeStep - 1)
    }));
  };

  const handleNext = () => {
    if (state.selectedCharacter) {
      const maxStep = state.selectedCharacter.arc.keyEvents.length + 1;
      setState(prev => ({
        ...prev,
        activeStep: Math.min(maxStep, prev.activeStep + 1)
      }));
    }
  };

  const handleEdit = (eventIndex: number) => {
    if (state.selectedCharacter && eventIndex > 0 && eventIndex <= state.selectedCharacter.arc.keyEvents.length) {
      const eventText = state.selectedCharacter.arc.keyEvents[eventIndex - 1];
      setState(prev => ({
        ...prev,
        isEditing: true,
        editingEvent: eventIndex,
        eventText
      }));
    }
  };

  const handleSave = () => {
    // TODO: 实现保存逻辑
    setState(prev => ({
      ...prev,
      isEditing: false,
      editingEvent: null,
      eventText: ''
    }));
  };

  const handleCancel = () => {
    setState(prev => ({
      ...prev,
      isEditing: false,
      editingEvent: null,
      eventText: ''
    }));
  };

  const handleEventTextChange = (text: string) => {
    setState(prev => ({
      ...prev,
      eventText: text
    }));
  };

  const actions: CharacterArcActions = {
    handleCharacterChange,
    handleStepClick,
    handlePrevious,
    handleNext,
    handleEdit,
    handleSave,
    handleCancel,
    handleEventTextChange
  };

  return {
    state,
    actions,
    characters
  };
};