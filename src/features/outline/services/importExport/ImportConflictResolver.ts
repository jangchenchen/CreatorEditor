import { OutlineData } from '../../types/outline.types';
import { localStorageService } from './localStorageService';

export class ImportConflictResolver {
  static async resolveProjectIdConflicts(projectData: OutlineData): Promise<OutlineData> {
    const existingProjects = await localStorageService.getProjectList();
    const existingIds = existingProjects.map(p => p.id);

    if (existingIds.includes(projectData.id)) {
      // Generate new ID
      const timestamp = Date.now();
      const newId = `${projectData.id}_imported_${timestamp}`;

      return {
        ...projectData,
        id: newId,
        projectName: `${projectData.projectName} (Imported)`,
      };
    }

    return projectData;
  }

  static async resolveProjectNameConflicts(projectData: OutlineData): Promise<OutlineData> {
    const existingProjects = await localStorageService.getProjectList();
    const existingNames = existingProjects.map(p => p.projectName);

    if (existingNames.includes(projectData.projectName)) {
      // Add timestamp to make name unique
      const timestamp = new Date().toISOString().split('T')[0];
      return {
        ...projectData,
        projectName: `${projectData.projectName} (${timestamp})`,
      };
    }

    return projectData;
  }

  static async resolveAllConflicts(projectData: OutlineData): Promise<OutlineData> {
    let resolvedData = await this.resolveProjectIdConflicts(projectData);
    resolvedData = await this.resolveProjectNameConflicts(resolvedData);
    return resolvedData;
  }
}
