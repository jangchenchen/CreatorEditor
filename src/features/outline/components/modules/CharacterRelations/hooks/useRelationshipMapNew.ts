import { useState } from 'react';
import { mockCharacters } from './constants';
import { 
  getRelationshipIcon, 
  getRelationshipLabel, 
  getRelationshipColor, 
  getCharacterName 
} from './utils';
import { RelationshipMapUtils, UseRelationshipMapReturn } from './types';
import { useRelationshipMapState } from './useRelationshipMapState';

export const useRelationshipMapNew = (): UseRelationshipMapReturn => {
  const stateAndActions = useRelationshipMapState();
  
  const utils: RelationshipMapUtils = {
    getRelationshipIcon,
    getRelationshipLabel,
    getRelationshipColor,
    getCharacterName
  };

  return {
    ...stateAndActions,
    ...utils,
    characters: mockCharacters
  };
};