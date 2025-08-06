import { DatabaseManager } from './DatabaseManager';
import { ProjectStateManager } from './ProjectStateManager';
import { ProjectOperationsManager } from './ProjectOperationsManager';
import { ProjectImportExportManager } from './ProjectImportExportManager';
import { ProjectInfo } from './storageTypes';

export class ProjectStorageServiceNew {
  private stateManager: ProjectStateManager;
  private operationsManager: ProjectOperationsManager;
  private importExportManager: ProjectImportExportManager;

  constructor(private dbManager: DatabaseManager) {
    this.stateManager = new ProjectStateManager(dbManager);
    this.operationsManager = new ProjectOperationsManager(dbManager);
    this.importExportManager = new ProjectImportExportManager(dbManager);
  }

  /**
   * Save Redux state to local storage
   */
  async saveState(state: any): Promise<void> {
    return this.stateManager.saveState(state);
  }

  /**
   * Load project data
   */
  async loadProject(projectId?: string): Promise<any> {
    return this.stateManager.loadProject(projectId);
  }

  /**
   * Get list of all saved projects
   */
  async getProjectList(): Promise<ProjectInfo[]> {
    return this.stateManager.getProjectList();
  }

  /**
   * Delete a project
   */
  async deleteProject(projectId: string): Promise<void> {
    return this.operationsManager.deleteProject(projectId);
  }

  /**
   * Export project data to JSON file
   */
  async exportProject(projectId: string, filePath: string): Promise<void> {
    return this.importExportManager.exportProject(projectId, filePath);
  }

  /**
   * Import project data from JSON file
   */
  async importProject(filePath: string): Promise<any> {
    return this.importExportManager.importProject(filePath);
  }

  /**
   * Update project metadata
   */
  async updateProjectMetadata(projectId: string, metadata: any): Promise<void> {
    return this.operationsManager.updateProjectMetadata(projectId, metadata);
  }

  /**
   * Set active project
   */
  async setActiveProject(projectId: string): Promise<void> {
    return this.operationsManager.setActiveProject(projectId);
  }
}
