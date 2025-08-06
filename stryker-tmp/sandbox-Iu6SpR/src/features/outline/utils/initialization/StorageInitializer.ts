/**
 * Storage Initializer
 * Main module for storage system initialization and project loading
 */
// @ts-nocheck


import { Store } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { localStorageService } from '../../services/localStorageService';
import { initializeProject } from '../../slices/rootOutlineSlice';
import {
  InitializationResult,
  InitializationConfig,
  DEFAULT_INIT_CONFIG,
} from '../../types/storageInitializerTypes';
import { createDefaultProject } from './ProjectFactory';
import { loadLastProject, displayStartupMessages } from './StartupHelpers';

/**
 * Initialize storage system and load project data on application startup
 */
export async function initializeStorageSystem(
  store: Store<RootState>,
  config: InitializationConfig = DEFAULT_INIT_CONFIG
): Promise<InitializationResult> {
  const warnings: string[] = [];
  const errors: string[] = [];
  let loadedProject: string | null = null;
  let isNewProject = false;
  let migrationApplied = false;

  try {
    console.log('🚀 Initializing storage system...');

    // Step 1: Initialize the storage service
    await localStorageService.initialize();
    console.log('✅ Storage service initialized');

    // Step 2: Try to load the last active project
    if (config.autoLoadLastProject) {
      try {
        const result = await loadLastProject(store);
        loadedProject = result.projectName;
        migrationApplied = result.migrationApplied;
        warnings.push(...result.warnings);

        if (result.projectName) {
          console.log(`📖 Loaded project: ${result.projectName}`);
        } else {
          console.log('ℹ️ No previous project found');
        }
      } catch (error) {
        console.error('❌ Failed to load previous project:', error);
        errors.push(`Failed to load previous project: ${error.message}`);
      }
    }

    // Step 3: Create default project if no project was loaded
    if (!loadedProject && config.createDefaultProject) {
      try {
        const defaultProject = createDefaultProject();
        store.dispatch(initializeProject(defaultProject));
        loadedProject = defaultProject.projectName;
        isNewProject = true;
        console.log('✨ Created default project');
      } catch (error) {
        console.error('❌ Failed to create default project:', error);
        errors.push(`Failed to create default project: ${error.message}`);
      }
    }

    // Step 4: Enable auto-save if configured
    if (config.enableAutoSave) {
      console.log('💾 Auto-save is enabled');
    }

    // Step 5: Display startup messages
    if (config.showStartupMessages) {
      displayStartupMessages(loadedProject, isNewProject, migrationApplied, warnings);
    }

    const result: InitializationResult = {
      success: errors.length === 0,
      loadedProject,
      isNewProject,
      migrationApplied,
      warnings,
      errors,
    };

    if (result.success) {
      console.log('🎉 Storage initialization completed successfully');
    } else {
      console.warn('⚠️ Storage initialization completed with errors');
    }

    return result;
  } catch (error) {
    console.error('💥 Storage initialization failed:', error);
    errors.push(`Storage initialization failed: ${error.message}`);

    return {
      success: false,
      loadedProject: null,
      isNewProject: false,
      migrationApplied: false,
      warnings,
      errors,
    };
  }
}

/**
 * Handle graceful shutdown of storage system
 */
export function shutdownStorageSystem(): void {
  console.log('🔄 Shutting down storage system...');

  try {
    // Dispose of storage service resources
    localStorageService.dispose();
    console.log('✅ Storage system shutdown complete');
  } catch (error) {
    console.error('❌ Error during storage shutdown:', error);
  }
}
