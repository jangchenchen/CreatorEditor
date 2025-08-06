/**
 * Startup Helpers
 * Helper functions for storage initialization process
 */
// @ts-nocheck


import { Store } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { localStorageService } from '../../services/localStorageService';
import { DataMigrationService } from '../../services/dataMigrationService';
import { initializeProject } from '../../slices/rootOutlineSlice';
import { createOutlineStateFromData } from './StateConverter';

/**
 * Load the last active project
 */
export async function loadLastProject(store: Store<RootState>): Promise<{
  projectName: string | null;
  migrationApplied: boolean;
  warnings: string[];
}> {
  const warnings: string[] = [];

  const projectData = await localStorageService.loadProject();

  if (!projectData) {
    return { projectName: null, migrationApplied: false, warnings };
  }

  // Check if migration is needed
  if (DataMigrationService.needsMigration(projectData)) {
    console.log('🔄 Project data needs migration, applying...');
    const migratedData = await DataMigrationService.migrateToCurrentVersion(projectData);

    // Save migrated data
    await localStorageService.saveState({
      ...store.getState(),
      outline: createOutlineStateFromData(migratedData),
    });

    warnings.push('Project data migrated to current version');

    // Load migrated data into store
    store.dispatch(initializeProject(migratedData));
    return {
      projectName: migratedData.projectName,
      migrationApplied: true,
      warnings,
    };
  } else {
    // Load project directly
    store.dispatch(initializeProject(projectData));
    return {
      projectName: projectData.projectName,
      migrationApplied: false,
      warnings,
    };
  }
}

/**
 * Display startup messages based on initialization results
 */
export function displayStartupMessages(
  loadedProject: string | null,
  isNewProject: boolean,
  migrationApplied: boolean,
  warnings: string[]
): void {
  if (loadedProject) {
    if (isNewProject) {
      console.log(`✨ Welcome! Created new project: "${loadedProject}"`);
    } else {
      console.log(`📖 Loaded project: "${loadedProject}"`);

      if (migrationApplied) {
        console.log('🔄 Project data was migrated to the current version');
      }
    }
  } else {
    console.log('⚠️ No project loaded - you may need to create or import a project');
  }

  if (warnings.length > 0) {
    console.warn('⚠️ Startup warnings:', warnings);
  }
}
