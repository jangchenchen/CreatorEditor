import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { OutlineState } from './types';
import { baseOutlineReducer } from './baseReducer';
import { loadOutlineData, resetOutline, markModuleUpdated } from './globalActions';

// Enhanced reducer that handles global actions
export const rootReducer = (state: OutlineState | undefined, action: any) => {
  // Handle global actions
  if (action.type === 'outline/loadOutlineData') {
    const data = action.payload;
    return {
      project: {
        id: data.id,
        projectName: data.projectName,
        version: data.version,
        createdAt: data.createdAt,
        lastUpdated: data.lastUpdated
      },
      story: data.story,
      characters: {
        characters: data.characters,
        relationships: data.relationships
      },
      timeline: data.timeline,
      chapters: data.chapters,
      subplots: data.subplots,
      ideas: data.ideas,
      world: data.world
    };
  }

  if (action.type === 'outline/resetOutline') {
    return baseOutlineReducer(undefined, { type: '@@INIT' });
  }

  if (action.type === 'outline/markModuleUpdated') {
    const newState = baseOutlineReducer(state, action);
    return {
      ...newState,
      project: {
        ...newState.project,
        lastUpdated: new Date()
      }
    };
  }

  // Delegate to the combined reducer
  return baseOutlineReducer(state, action);
};

export default rootReducer;