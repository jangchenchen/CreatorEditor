// @ts-nocheck
export type ReflectionType = 'question' | 'commentary' | 'reflection';

export interface ReflectionState {
  philosophicalQuestions: string[];
  socialCommentary: string[];
  personalReflections: string[];
}

export const addReflectionItem = (currentItems: string[], newItem: string): string[] => {
  const trimmedItem = newItem.trim();
  if (trimmedItem && !currentItems.includes(trimmedItem)) {
    return [...currentItems, trimmedItem];
  }
  return currentItems;
};

export const removeReflectionItem = (currentItems: string[], index: number): string[] => {
  return currentItems.filter((_, i) => i !== index);
};

export const getReflectionStats = (state: ReflectionState) => ({
  questionsCount: state.philosophicalQuestions.length,
  commentaryCount: state.socialCommentary.length,
  reflectionsCount: state.personalReflections.length,
  totalCount:
    state.philosophicalQuestions.length +
    state.socialCommentary.length +
    state.personalReflections.length,
});

export const initializeReflectionState = (themes: any): ReflectionState => ({
  philosophicalQuestions: themes.philosophicalQuestions || [],
  socialCommentary: themes.socialCommentary || [],
  personalReflections: themes.personalReflections || [],
});
