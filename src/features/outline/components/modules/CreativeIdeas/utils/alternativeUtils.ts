import { PlotAlternative } from '../../../../types/outline.types';

export const initializeAlternativeFormData = (alternative?: PlotAlternative) => {
  return alternative
    ? { ...alternative }
    : {
        originalElement: '',
        alternativeVersion: '',
        pros: [],
        cons: [],
        impact: '',
      };
};

export const updateListField = (
  currentData: Partial<PlotAlternative>,
  field: 'pros' | 'cons',
  index: number,
  value: string
) => {
  const newArray = [...(currentData[field] || [])];
  newArray[index] = value;
  return { ...currentData, [field]: newArray };
};

export const addListItem = (currentData: Partial<PlotAlternative>, field: 'pros' | 'cons') => {
  return {
    ...currentData,
    [field]: [...(currentData[field] || []), ''],
  };
};

export const removeListItem = (
  currentData: Partial<PlotAlternative>,
  field: 'pros' | 'cons',
  index: number
) => {
  return {
    ...currentData,
    [field]: (currentData[field] || []).filter((_, i) => i !== index),
  };
};
