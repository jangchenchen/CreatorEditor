import { OutlineData } from '../../types/outline.types';

export class ProjectImportExportManager {
  constructor(private dbManager: any) {}

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