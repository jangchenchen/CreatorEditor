import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProjectState {
  id: string;
  projectName: string;
  version: string;
  createdAt: Date;
  lastUpdated: Date;
}

const initialState: ProjectState = {
  id: '',
  projectName: '',
  version: '1.0.0',
  createdAt: new Date(),
  lastUpdated: new Date()
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
      state.lastUpdated = new Date();
    },

    initializeProject: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.id = action.payload.id;
      state.projectName = action.payload.name;
      state.createdAt = new Date();
      state.lastUpdated = new Date();
    },

    updateLastModified: (state) => {
      state.lastUpdated = new Date();
    }
  }
});

export const { setProjectName, initializeProject, updateLastModified } = projectSlice.actions;
export default projectSlice.reducer;

// Selectors
export const selectProject = (state: { project: ProjectState }) => state.project;
export const selectProjectName = (state: { project: ProjectState }) => state.project.projectName;
export const selectProjectInfo = (state: { project: ProjectState }) => ({
  id: state.project.id,
  name: state.project.projectName,
  version: state.project.version,
  createdAt: state.project.createdAt,
  lastUpdated: state.project.lastUpdated
});