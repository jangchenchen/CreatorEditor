export class ProjectOperationsManager {
  constructor(private dbManager: any) {}

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

  async updateProjectMetadata(projectId: string, metadata: any): Promise<void> {
    try {
      const db = this.dbManager.getDb();
      
      if (db.data!.projects[projectId]) {
        db.data!.projects[projectId] = {
          ...db.data!.projects[projectId],
          ...metadata,
          lastUpdated: new Date()
        };
        
        db.data!.metadata.lastModified = new Date().toISOString();
        await this.dbManager.write();
        
        console.log(`Project ${projectId} metadata updated successfully`);
      }
    } catch (error) {
      console.error('Failed to update project metadata:', error);
      throw new Error(`Update operation failed: ${error}`);
    }
  }

  async setActiveProject(projectId: string): Promise<void> {
    try {
      const db = this.dbManager.getDb();
      
      if (db.data!.projects[projectId]) {
        db.data!.activeProject = projectId;
        db.data!.metadata.lastModified = new Date().toISOString();
        await this.dbManager.write();
        
        console.log(`Active project set to: ${projectId}`);
      }
    } catch (error) {
      console.error('Failed to set active project:', error);
      throw new Error(`Set active project failed: ${error}`);
    }
  }
}