import { PlotEvent, Character } from '../../../../types/outline.types';

export interface EventFormData {
  title: string;
  timestamp: string;
  type: string;
  importance: string;
  description: string;
  impact: string;
  consequences: string[];
  characters: string[];
  locations: string[];
  tags: string[];
  isKeyEvent: boolean;
}

export interface EventFormHandlers {
  onTitleChange: (value: string) => void;
  onTimestampChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onImportanceChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onImpactChange: (value: string) => void;
  onConsequencesChange: (event: any, newValue: string[]) => void;
  onCharactersChange: (event: any, newValue: string[]) => void;
  onLocationsChange: (event: any, newValue: string[]) => void;
  onTagsChange: (event: any, newValue: string[]) => void;
  onKeyEventChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface EventEditDialogContainerProps {
  open: boolean;
  editingEvent: PlotEvent | null;
  formData: Partial<PlotEvent>;
  characters: Character[];
  onClose: () => void;
  onSave: () => void;
  onFormChange: (field: keyof PlotEvent) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => void;
  onArrayFieldChange: (field: keyof Pick<PlotEvent, 'characters' | 'locations' | 'consequences' | 'relatedEvents' | 'tags'>) => (
    event: any,
    newValue: string[]
  ) => void;
  onSwitchChange: (field: keyof PlotEvent) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}