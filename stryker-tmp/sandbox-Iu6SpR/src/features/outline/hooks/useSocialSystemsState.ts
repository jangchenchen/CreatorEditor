/**
 * Social Systems State Hook
 * Custom hook for managing social systems state and operations
 */
// @ts-nocheck


import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOutline } from '../../outlineSlice';

export interface SocialSystemsState {
  political: string;
  economic: string;
  cultural: string[];
  religious: string;
  technology: string;
  socialClasses: string[];
  newCulturalElement: string;
  newSocialClass: string;
}

export interface SocialSystemsHandlers {
  setPolitical: (value: string) => void;
  setEconomic: (value: string) => void;
  setCultural: (value: string[]) => void;
  setReligious: (value: string) => void;
  setTechnology: (value: string) => void;
  setSocialClasses: (value: string[]) => void;
  setNewCulturalElement: (value: string) => void;
  setNewSocialClass: (value: string) => void;
  handleAddCulturalElement: () => void;
  handleRemoveCulturalElement: (element: string) => void;
  handleAddSocialClass: () => void;
  handleRemoveSocialClass: (className: string) => void;
  handleSave: () => void;
}

export const useSocialSystemsState = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const society = outline.world.society;

  // 社会体系状态
  const [political, setPolitical] = useState(society.political);
  const [economic, setEconomic] = useState(society.economic);
  const [cultural, setCultural] = useState<string[]>(society.cultural);
  const [religious, setReligious] = useState(society.religious);
  const [technology, setTechnology] = useState(society.technology);
  const [socialClasses, setSocialClasses] = useState<string[]>(society.socialClasses);

  // 临时输入状态
  const [newCulturalElement, setNewCulturalElement] = useState('');
  const [newSocialClass, setNewSocialClass] = useState('');

  const handleAddCulturalElement = () => {
    if (newCulturalElement.trim() && !cultural.includes(newCulturalElement.trim())) {
      setCultural([...cultural, newCulturalElement.trim()]);
      setNewCulturalElement('');
    }
  };

  const handleRemoveCulturalElement = (element: string) => {
    setCultural(cultural.filter(c => c !== element));
  };

  const handleAddSocialClass = () => {
    if (newSocialClass.trim() && !socialClasses.includes(newSocialClass.trim())) {
      setSocialClasses([...socialClasses, newSocialClass.trim()]);
      setNewSocialClass('');
    }
  };

  const handleRemoveSocialClass = (className: string) => {
    setSocialClasses(socialClasses.filter(c => c !== className));
  };

  const handleSave = () => {
    // TODO: 使用 dispatch 更新 Redux state
    const updatedSociety = {
      political,
      economic,
      cultural,
      religious,
      technology,
      socialClasses,
    };
    console.log('保存社会体系:', updatedSociety);
  };

  const state: SocialSystemsState = {
    political,
    economic,
    cultural,
    religious,
    technology,
    socialClasses,
    newCulturalElement,
    newSocialClass,
  };

  const handlers: SocialSystemsHandlers = {
    setPolitical,
    setEconomic,
    setCultural,
    setReligious,
    setTechnology,
    setSocialClasses,
    setNewCulturalElement,
    setNewSocialClass,
    handleAddCulturalElement,
    handleRemoveCulturalElement,
    handleAddSocialClass,
    handleRemoveSocialClass,
    handleSave,
  };

  return { state, handlers };
};
