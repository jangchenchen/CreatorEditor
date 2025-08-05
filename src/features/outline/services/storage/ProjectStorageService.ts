/**
 * Project Storage Service
 * Handles CRUD operations for projects
 */

import { OutlineData } from '../../types/outline.types';
import { RootState } from '../../../../app/store';
import { DatabaseManager } from './DatabaseManager';
import { StateTransformer } from './StateTransformer';

export interface ProjectInfo {
  id: string;
  name: string;
  lastUpdated: Date;
}

export class ProjectStorageService {
  constructor(private dbManager: DatabaseManager) {}

  /**
   * Save Redux state to local storage
   */
  async saveState(state: RootState): Promise<void> {
    try {
      const { outline } = state;
      const projectId = outline.project.id;
      
      if (!projectId) {
        console.warn('No project ID found, skipping save');
        return;
      }

      // Convert Redux state to OutlineData format
      const outlineData: OutlineData = StateTransformer.stateToOutlineData(outline);
      
      // Update database
      const db = this.dbManager.getDb();
      db.data!.projects[projectId] = outlineData;
      db.data!.activeProject = projectId;
      db.data!.metadata.lastModified = new Date().toISOString();
      db.data!.metadata.totalProjects = Object.keys(db.data!.projects).length;
      
      await this.dbManager.write();
      
      console.log(`Project ${projectId} saved successfully`);
    } catch (error) {
      console.error('Failed to save state:', error);
      throw new Error(`Save operation failed: ${error}`);
    }
  }

  /**
   * Load project data
   */
  async loadProject(projectId?: string): Promise<OutlineData | null> {
    try {
      await this.dbManager.read();
      
      const db = this.dbManager.getDb();
      const targetId = projectId || db.data!.activeProject;
      
      if (!targetId || !db.data!.projects[targetId]) {
        console.log('No project data found');
        return null;
      }
      
      const projectData = db.data!.projects[targetId];
      console.log(`Project ${targetId} loaded successfully`);
      
      return projectData;
    } catch (error) {
      console.error('Failed to load project:', error);
      throw new Error(`Load operation failed: ${error}`);
    }
  }

  /**
   * Get list of all saved projects
   */
  async getProjectList(): Promise<ProjectInfo[]> {
    try {
      await this.dbManager.read();
      
      const db = this.dbManager.getDb();
      return Object.values(db.data!.projects).map((project: any) => ({
        id: project.id,
        name: project.projectName,
        lastUpdated: project.lastUpdated
      }));
    } catch (error) {
      console.error('Failed to get project list:', error);
      return [];
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(projectId: string): Promise<void> {
    try {
      const db = this.dbManager.getDb();
      
      if (db.data!.projects[projectId]) {
        delete db.data!.projects[projectId];
        
        // Update active project if deleted project was active
        if (db.data!.activeProject === projectId) {
          const remainingProjects = Object.keys(db.data!.projects);
          db.data!.activeProject = remainingProjects.length > 0 ? remainingProjects[0] : null;
        }
        
        db.data!.metadata.lastModified = new Date().toISOString();
        db.data!.metadata.totalProjects = Object.keys(db.data!.projects).length;
        
        await this.dbManager.write();
        console.log(`Project ${projectId} deleted successfully`);
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw new Error(`Delete operation failed: ${error}`);
    }
  }

  /**
   * Export project data to JSON file
   */
  async exportProject(projectId: string, filePath: string): Promise<void> {
    try {
      await this.dbManager.read();
      
      const db = this.dbManager.getDb();
      const projectData = db.data!.projects[projectId];
      if (!projectData) {
        throw new Error(`Project ${projectId} not found`);
      }
      
      const exportData = {
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        project: projectData
      };
      
      const { JSONFile } = await import('lowdb/node');
      const exportAdapter = new JSONFile(filePath);
      const { Low } = await import('lowdb');
      const exportDb = new Low(exportAdapter, exportData);
      await exportDb.write();
      
      console.log(`Project exported to: ${filePath}`);
    } catch (error) {
      console.error('Failed to export project:', error);
      throw new Error(`Export operation failed: ${error}`);
    }
  }

  /**
   * Import project data from JSON file
   */
  async importProject(filePath: string): Promise<OutlineData> {
    try {
      const { JSONFile } = await import('lowdb/node');
      const importAdapter = new JSONFile(filePath);
      const { Low } = await import('lowdb');
      const importDb = new Low(importAdapter, null);
      await importDb.read();
      
      if (!importDb.data) {
        throw new Error('Invalid import file');
      }
      
      const importData = importDb.data as any;
      
      // Validate import data structure
      if (!importData.project || !importData.version) {
        throw new Error('Invalid import file format');
      }
      
      // Handle version compatibility
      const projectData = await this.migrateImportedData(importData);
      
      // Generate new ID if project already exists
      const db = this.dbManager.getDb();
      let projectId = projectData.id;
      if (db.data!.projects[projectId]) {
        projectId = `${projectId}_imported_${Date.now()}`;
        projectData.id = projectId;
        projectData.projectName = `${projectData.projectName} (Imported)`;
      }
      
      // Save imported project
      db.data!.projects[projectId] = projectData;
      db.data!.metadata.lastModified = new Date().toISOString();
      db.data!.metadata.totalProjects = Object.keys(db.data!.projects).length;
      
      await this.dbManager.write();
      
      console.log(`Project imported successfully: ${projectId}`);
      return projectData;
    } catch (error) {
      console.error('Failed to import project:', error);
      throw new Error(`Import operation failed: ${error}`);
    }
  }

  private async migrateImportedData(importData: any): Promise<OutlineData> {
    // Handle imported data migration and validation
    const projectData = importData.project;
    
    // Ensure all required fields exist with defaults
    return {
      ...projectData,
      version: '1.0.0',
      lastUpdated: new Date()
    };
  }
}