/**
 * Project Manager
 * Handles project switching, listing, and management operations
 */

import { Store } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { localStorageService } from '../../services/localStorageService';
import { DataMigrationService } from '../../services/dataMigrationService';
import { initializeProject } from '../../slices/rootOutlineSlice';
import { ProjectInfo, SwitchProjectResult } from '../../types/storageInitializerTypes';

/**
 * Get list of available projects for project selection
 */
export async function getAvailableProjects(): Promise<ProjectInfo[]> {
  try {
    const projectList = await localStorageService.getProjectList();
    const storageStats = await localStorageService.getStorageStats();
    
    // Combine project list with additional stats
    return projectList.map(project => {
      const projectStats = storageStats?.projects?.find((p: any) => p.id === project.id);
      return {
        ...project,
        charactersCount: projectStats?.charactersCount || 0,
        chaptersCount: projectStats?.chaptersCount || 0
      };
    });
  } catch (error) {
    console.error('Failed to get available projects:', error);
    return [];
  }
}

/**
 * Switch to a different project
 */
export async function switchProject(
  store: Store<RootState>, 
  projectId: string
): Promise<SwitchProjectResult> {
  try {
    const projectData = await localStorageService.loadProject(projectId);
    
    if (!projectData) {
      return { success: false, error: `Project ${projectId} not found` };
    }

    // Apply migration if needed
    let finalData = projectData;
    if (DataMigrationService.needsMigration(projectData)) {
      console.log('Applying migration to project data...');
      finalData = await DataMigrationService.migrateToCurrentVersion(projectData);
    }

    // Load into store
    store.dispatch(initializeProject(finalData));
    
    console.log(`Switched to project: ${finalData.projectName}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to switch project:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a project from storage
 */
export async function deleteProject(projectId: string): Promise<SwitchProjectResult> {
  try {
    await localStorageService.deleteProject(projectId);
    console.log(`Deleted project: ${projectId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to delete project:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Duplicate a project
 */
export async function duplicateProject(
  store: Store<RootState>,
  projectId: string, 
  newName: string
): Promise<SwitchProjectResult> {
  try {
    const originalProject = await localStorageService.loadProject(projectId);
    
    if (!originalProject) {
      return { success: false, error: `Project ${projectId} not found` };
    }

    // Create a copy with new ID and name
    const now = new Date();
    const newId = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const duplicatedProject = {
      ...originalProject,
      id: newId,
      projectName: newName,
      createdAt: now,
      lastUpdated: now
    };

    // Save the duplicated project
    const currentState = store.getState();
    const tempState = {
      ...currentState,
      outline: duplicatedProject
    };
    
    await localStorageService.saveState(tempState, newId);
    
    console.log(`Duplicated project: ${newName}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to duplicate project:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Rename a project
 */
export async function renameProject(
  store: Store<RootState>,
  projectId: string, 
  newName: string
): Promise<SwitchProjectResult> {
  try {
    const projectData = await localStorageService.loadProject(projectId);
    
    if (!projectData) {
      return { success: false, error: `Project ${projectId} not found` };
    }

    // Update the project name
    const updatedProject = {
      ...projectData,
      projectName: newName,
      lastUpdated: new Date()
    };

    // Save the updated project
    const currentState = store.getState();
    const tempState = {
      ...currentState,
      outline: updatedProject
    };
    
    await localStorageService.saveState(tempState, projectId);
    
    // If this is the current project, update the store
    const currentProjectId = currentState.outline?.project?.id;
    if (currentProjectId === projectId) {
      store.dispatch(initializeProject(updatedProject));
    }
    
    console.log(`Renamed project to: ${newName}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to rename project:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get project metadata without loading full project
 */
export async function getProjectMetadata(projectId: string): Promise<{
  id: string;
  projectName: string;
  version: string;
  createdAt: Date;
  lastUpdated: Date;
  charactersCount: number;
  chaptersCount: number;
} | null> {
  try {
    const projects = await getAvailableProjects();
    return projects.find(p => p.id === projectId) || null;
  } catch (error) {
    console.error('Failed to get project metadata:', error);
    return null;
  }
}