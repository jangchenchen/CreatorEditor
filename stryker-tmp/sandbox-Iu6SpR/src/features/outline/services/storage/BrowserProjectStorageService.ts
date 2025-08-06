/**
 * Browser Project Storage Service
 * Browser-compatible project management using localStorage
 */
// @ts-nocheck


import { BrowserDatabaseManager } from './BrowserDatabaseManager';
import { RootState } from '../../../../app/store';
import { OutlineData } from '../../types/outline.types';

export interface ProjectInfo {
  id: string;
  name: string;
  lastUpdated: Date;
  description?: string;
  version: string;
}

export class BrowserProjectStorageService {
  constructor(private dbManager: BrowserDatabaseManager) {}

  /**
   * Save Redux state to localStorage
   */
  async saveState(state: RootState): Promise<void> {
    try {
      const projectData = this.extractOutlineData(state);
      const db = this.dbManager.getDb();

      // Update the main data
      db.data = {
        ...db.data,
        projects: {
          ...db.data.projects,
          current: projectData,
        },
        settings: {
          ...db.data.settings,
          lastSaved: new Date().toISOString(),
        },
      };

      await db.write();
      console.log('State saved successfully');
    } catch (error) {
      console.error('Failed to save state:', error);
      throw error;
    }
  }

  /**
   * Load project data
   */
  async loadProject(projectId?: string): Promise<OutlineData | null> {
    try {
      const db = this.dbManager.getDb();
      await db.read();

      if (projectId) {
        // Load specific project
        const project = db.data.projects.saved?.[projectId];
        return project ? this.convertToOutlineData(project) : null;
      } else {
        // Load current/default project
        const currentProject = db.data.projects.current;
        return currentProject ? this.convertToOutlineData(currentProject) : null;
      }
    } catch (error) {
      console.error('Failed to load project:', error);
      return null;
    }
  }

  /**
   * Get list of saved projects
   */
  async getProjectList(): Promise<ProjectInfo[]> {
    try {
      const db = this.dbManager.getDb();
      await db.read();

      const savedProjects = db.data.projects.saved || {};
      const projectList: ProjectInfo[] = [];

      Object.entries(savedProjects).forEach(([id, project]: [string, any]) => {
        projectList.push({
          id,
          name: project.story?.title || `项目 ${id}`,
          lastUpdated: new Date(project.metadata?.lastUpdated || Date.now()),
          description: project.story?.description,
          version: project.metadata?.version || '1.0.0',
        });
      });

      // Sort by last updated (newest first)
      return projectList.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
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
      await db.read();

      if (db.data.projects.saved && db.data.projects.saved[projectId]) {
        delete db.data.projects.saved[projectId];
        await db.write();
        console.log(`Project deleted: ${projectId}`);
      } else {
        throw new Error(`Project not found: ${projectId}`);
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  }

  /**
   * Export project data (download as JSON)
   */
  async exportProject(projectId: string, fileName?: string): Promise<void> {
    try {
      const project = await this.loadProject(projectId);
      if (!project) {
        throw new Error(`Project not found: ${projectId}`);
      }

      const exportData = {
        ...project,
        metadata: {
          exportedAt: new Date().toISOString(),
          version: '1.0.0',
          source: 'CreationEditor',
        },
      };

      // Create download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download =
        fileName || `project_${projectId}_${new Date().toISOString().slice(0, 10)}.json`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log(`Project exported: ${projectId}`);
    } catch (error) {
      console.error('Failed to export project:', error);
      throw error;
    }
  }

  /**
   * Import project data from JSON file
   */
  async importProject(file: File): Promise<OutlineData> {
    try {
      const text = await file.text();
      const importData = JSON.parse(text);

      // Validate and sanitize import data
      const projectData = this.validateImportData(importData);

      // Generate new project ID
      const projectId = `imported_${Date.now()}`;

      // Save as new project
      const db = this.dbManager.getDb();
      await db.read();

      if (!db.data.projects.saved) {
        db.data.projects.saved = {};
      }

      db.data.projects.saved[projectId] = {
        ...projectData,
        metadata: {
          ...projectData.metadata,
          importedAt: new Date().toISOString(),
          originalFileName: file.name,
        },
      };

      await db.write();
      console.log(`Project imported: ${projectId}`);

      return this.convertToOutlineData(projectData);
    } catch (error) {
      console.error('Failed to import project:', error);
      throw new Error(`导入失败: ${error}`);
    }
  }

  /**
   * Extract outline data from Redux state
   */
  private extractOutlineData(state: RootState): any {
    return {
      story: state.outline?.story || {},
      characters: state.outline?.characters || {},
      timeline: state.outline?.timeline || {},
      chapters: state.outline?.chapters || {},
      world: state.outline?.world || {},
      themes: state.outline?.themes || {},
      subplots: state.outline?.subplots || {},
      ideas: state.outline?.ideas || {},
      metadata: {
        lastUpdated: new Date().toISOString(),
        version: '1.0.0',
      },
    };
  }

  /**
   * Convert stored data to OutlineData format
   */
  private convertToOutlineData(projectData: any): OutlineData {
    return {
      story: projectData.story || {},
      characters: projectData.characters || {},
      timeline: projectData.timeline || {},
      chapters: projectData.chapters || {},
      world: projectData.world || {},
      themes: projectData.themes || {},
      subplots: projectData.subplots || {},
      ideas: projectData.ideas || {},
    };
  }

  /**
   * Validate imported data structure
   */
  private validateImportData(data: any): any {
    // Basic validation - ensure required structure exists
    const validated = {
      story: data.story || {},
      characters: data.characters || {},
      timeline: data.timeline || {},
      chapters: data.chapters || {},
      world: data.world || {},
      themes: data.themes || {},
      subplots: data.subplots || {},
      ideas: data.ideas || {},
      metadata: data.metadata || {},
    };

    return validated;
  }
}
