import { Chapter, ChapterTransition, Character } from '../../../../types/outline.types';

export interface ChapterDialogProps {
  open: boolean;
  editingChapter: Chapter | null;
  chapters: Chapter[];
  characters: Character[];
  onClose: () => void;
  onSave: (chapterData: Chapter) => void;
}

export interface ChapterFormData {
  id?: string;
  number?: number;
  title?: string;
  summary?: string;
  keyScenes?: string[];
  characters?: string[];
  plotPoints?: string[];
  conflicts?: string[];
  themes?: string[];
  wordCountTarget?: number;
  status?: 'planned' | 'writing' | 'completed' | 'revision';
  transitions?: ChapterTransition;
  notes?: string;
}

export interface ChapterDialogState {
  formData: Partial<Chapter>;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export type ChapterFormField = keyof Chapter;
export type ChapterTransitionField = keyof ChapterTransition;
export type ChapterArrayField = keyof Pick<Chapter, 'characters' | 'plotPoints' | 'conflicts' | 'themes'>;

export interface ChapterFormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

export const CHAPTER_STATUS_OPTIONS = [
  { value: 'planned', label: '计划中' },
  { value: 'writing', label: '写作中' },
  { value: 'completed', label: '已完成' },
  { value: 'revision', label: '修订中' }
] as const;

export const DEFAULT_CHAPTER_FORM_DATA: Partial<Chapter> = {
  keyScenes: [],
  characters: [],
  plotPoints: [],
  conflicts: [],
  themes: [],
  wordCountTarget: 3000,
  status: 'planned',
  transitions: { from: '', to: '', method: '' },
  notes: ''
};