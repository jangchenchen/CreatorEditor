import { OutlineData } from '../../types/outline.types';
import { RootState } from '../../../../app/store';
import { StateTransformer } from './StateTransformer';

export class ProjectStateManager {
  constructor(private dbManager: any) {}

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

  async getProjectList(): Promise<any[]> {
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
}