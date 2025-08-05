import { useState } from 'react';
import { 
  ReflectionType, 
  ReflectionState, 
  addReflectionItem, 
  removeReflectionItem,
  initializeReflectionState
} from '../utils/reflectionUtils';

export const useReflectionState = (initialThemes: any) => {
  const initialState = initializeReflectionState(initialThemes);
  
  const [philosophicalQuestions, setPhilosophicalQuestions] = useState<string[]>(initialState.philosophicalQuestions);
  const [socialCommentary, setSocialCommentary] = useState<string[]>(initialState.socialCommentary);
  const [personalReflections, setPersonalReflections] = useState<string[]>(initialState.personalReflections);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [newCommentary, setNewCommentary] = useState('');
  const [newReflection, setNewReflection] = useState('');

  const getReflectionData = (type: ReflectionType) => {
    switch (type) {
      case 'question':
        return {
          items: philosophicalQuestions,
          setter: setPhilosophicalQuestions,
          newValue: newQuestion,
          resetValue: setNewQuestion
        };
      case 'commentary':
        return {
          items: socialCommentary,
          setter: setSocialCommentary,
          newValue: newCommentary,
          resetValue: setNewCommentary
        };
      case 'reflection':
        return {
          items: personalReflections,
          setter: setPersonalReflections,
          newValue: newReflection,
          resetValue: setNewReflection
        };
    }
  };

  const handleAddItem = (type: ReflectionType) => {
    const { items, setter, newValue, resetValue } = getReflectionData(type);
    const updatedItems = addReflectionItem(items, newValue);
    
    if (updatedItems.length > items.length) {
      setter(updatedItems);
      resetValue('');
    }
  };

  const handleRemoveItem = (type: ReflectionType, index: number) => {
    const { items, setter } = getReflectionData(type);
    const updatedItems = removeReflectionItem(items, index);
    setter(updatedItems);
  };

  const handleInputChange = (type: ReflectionType, value: string) => {
    const { resetValue } = getReflectionData(type);
    resetValue(value);
  };

  const getReflectionState = (): ReflectionState => ({
    philosophicalQuestions,
    socialCommentary,
    personalReflections
  });

  return {
    // State
    philosophicalQuestions,
    socialCommentary,
    personalReflections,
    newQuestion,
    newCommentary,
    newReflection,
    
    // Actions
    handleAddItem,
    handleRemoveItem,
    handleInputChange,
    getReflectionState,
    
    // Setters for direct updates
    setNewQuestion,
    setNewCommentary,
    setNewReflection
  };
};