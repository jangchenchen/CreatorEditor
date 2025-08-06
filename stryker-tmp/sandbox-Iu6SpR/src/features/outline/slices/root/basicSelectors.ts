// @ts-nocheck
import { OutlineState } from './types';

// Basic selectors for backward compatibility
export const selectOutline = (state: { outline: OutlineState }) => state.outline;
export const selectProject = (state: { outline: OutlineState }) => state.outline.project;
export const selectStoryOverview = (state: { outline: OutlineState }) => state.outline.story;
export const selectStoryBackground = (state: { outline: OutlineState }) =>
  state.outline.story.background;
export const selectCoreTheme = (state: { outline: OutlineState }) => state.outline.story.coreTheme;
export const selectSynopsis = (state: { outline: OutlineState }) => state.outline.story.synopsis;
export const selectCharacters = (state: { outline: OutlineState }) =>
  state.outline.characters.characters;
export const selectRelationships = (state: { outline: OutlineState }) =>
  state.outline.characters.relationships;
export const selectTimeline = (state: { outline: OutlineState }) => state.outline.timeline;
export const selectPlotEvents = (state: { outline: OutlineState }) => state.outline.timeline.events;
export const selectKeyEvents = (state: { outline: OutlineState }) =>
  state.outline.timeline.events.filter(e => e.isKeyEvent);
export const selectChapters = (state: { outline: OutlineState }) => state.outline.chapters;
export const selectChapterList = (state: { outline: OutlineState }) =>
  state.outline.chapters.chapters;
export const selectSubplots = (state: { outline: OutlineState }) => state.outline.subplots;
export const selectActiveSubplots = (state: { outline: OutlineState }) =>
  state.outline.subplots.subplots.filter(s => s.status === 'active');
export const selectCreativeIdeas = (state: { outline: OutlineState }) => state.outline.ideas;
export const selectWorld = (state: { outline: OutlineState }) => state.outline.world;
export const selectGeography = (state: { outline: OutlineState }) => state.outline.world.geography;
export const selectSociety = (state: { outline: OutlineState }) => state.outline.world.society;
export const selectWorldHistory = (state: { outline: OutlineState }) => state.outline.world.history;
