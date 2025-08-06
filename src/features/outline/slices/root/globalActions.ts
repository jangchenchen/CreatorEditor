import { createAction } from '@reduxjs/toolkit';
import { OutlineData, OutlineModule } from '../../types/outline.types';

// Global actions that coordinate across multiple slices
export const loadOutlineData = createAction<OutlineData>('outline/loadOutlineData');
export const resetOutline = createAction('outline/resetOutline');
export const markModuleUpdated = createAction<OutlineModule>('outline/markModuleUpdated');
