import { OutlineData } from './outline.types';

// Export configuration types
export interface ExportOptions {
  format: 'json' | 'docx' | 'pdf';
  includeModules: {
    story: boolean;
    characters: boolean;
    timeline: boolean;
    world: boolean;
    chapters: boolean;
    themes: boolean;
    subplots: boolean;
    ideas: boolean;
  };
  formatting: {
    title: string;
    author: string;
    includeTableOfContents: boolean;
    includeCoverPage: boolean;
    pageNumbers: boolean;
    fontSize: number;
    fontFamily: string;
  };
}

export interface ExportProgress {
  stage: 'preparing' | 'processing' | 'generating' | 'saving' | 'complete' | 'error';
  progress: number; // 0-100
  currentStep: string;
  totalSteps: number;
  currentStepIndex: number;
}

export type ExportProgressCallback = (progress: ExportProgress) => void;

export type UpdateProgressFunction = (
  stage: ExportProgress['stage'], 
  progress: number, 
  currentStep: string, 
  currentStepIndex: number, 
  totalSteps: number
) => void;

// Common export data filtering interface
export interface ModuleFilterOptions {
  story: boolean;
  characters: boolean;
  timeline: boolean;
  world: boolean;
  chapters: boolean;
  themes: boolean;
  subplots: boolean;
  ideas: boolean;
}

// Export service interface for consistency
export interface ExportService {
  export(
    data: OutlineData,
    options: ExportOptions,
    updateProgress: UpdateProgressFunction
  ): Promise<void>;
}