import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from '../projectSlice';
import storyReducer from '../storySlice';
import charactersReducer from '../charactersSlice';
import timelineReducer from '../timelineSlice';
import chaptersReducer from '../chaptersSlice';
import subplotsReducer from '../subplotsSlice';
import ideasReducer from '../ideasSlice';
import worldReducer from '../worldSlice';
import themesReducer from '../themesSlice';
import { OutlineState } from './types';

// Combine all the individual slices
export const baseOutlineReducer = combineReducers({
  project: projectReducer,
  story: storyReducer,
  characters: charactersReducer,
  timeline: timelineReducer,
  chapters: chaptersReducer,
  subplots: subplotsReducer,
  ideas: ideasReducer,
  world: worldReducer,
  themes: themesReducer
});

export default baseOutlineReducer;