/**
 * Theme Analysis Hook
 * Manages theme analysis state and operations
 */
// @ts-nocheck


import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOutline } from '../../../outlineSlice';

export interface ThemeData {
  primary: string;
  secondary: string[];
  symbols: string[];
  metaphors: string[];
  motifs: string[];
}

export interface ThemeInputState {
  newSecondaryTheme: string;
  newSymbol: string;
  newMetaphor: string;
  newMotif: string;
}

export const useThemeAnalysis = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const themes = outline.themes.themes;

  // 主题状态
  const [primaryTheme, setPrimaryTheme] = useState(themes.primary);
  const [secondaryThemes, setSecondaryThemes] = useState<string[]>(themes.secondary);
  const [symbols, setSymbols] = useState<string[]>(themes.symbols);
  const [metaphors, setMetaphors] = useState<string[]>(themes.metaphors);
  const [motifs, setMotifs] = useState<string[]>(themes.motifs);

  // 临时输入状态
  const [inputs, setInputs] = useState<ThemeInputState>({
    newSecondaryTheme: '',
    newSymbol: '',
    newMetaphor: '',
    newMotif: '',
  });

  const updateInput = (key: keyof ThemeInputState, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleAddItem = (type: keyof Omit<ThemeData, 'primary'>) => {
    const getValues = () => {
      switch (type) {
        case 'secondary':
          return {
            value: inputs.newSecondaryTheme,
            setter: setSecondaryThemes,
            current: secondaryThemes,
            reset: () => updateInput('newSecondaryTheme', ''),
          };
        case 'symbol':
          return {
            value: inputs.newSymbol,
            setter: setSymbols,
            current: symbols,
            reset: () => updateInput('newSymbol', ''),
          };
        case 'metaphor':
          return {
            value: inputs.newMetaphor,
            setter: setMetaphors,
            current: metaphors,
            reset: () => updateInput('newMetaphor', ''),
          };
        case 'motifs':
          return {
            value: inputs.newMotif,
            setter: setMotifs,
            current: motifs,
            reset: () => updateInput('newMotif', ''),
          };
      }
    };

    const { value, setter, current, reset } = getValues();

    if (value.trim() && !current.includes(value.trim())) {
      setter([...current, value.trim()]);
      reset();
    }
  };

  const handleRemoveItem = (type: keyof Omit<ThemeData, 'primary'>, index: number) => {
    switch (type) {
      case 'secondary':
        setSecondaryThemes(secondaryThemes.filter((_, i) => i !== index));
        break;
      case 'symbol':
        setSymbols(symbols.filter((_, i) => i !== index));
        break;
      case 'metaphor':
        setMetaphors(metaphors.filter((_, i) => i !== index));
        break;
      case 'motifs':
        setMotifs(motifs.filter((_, i) => i !== index));
        break;
    }
  };

  const handleSave = () => {
    // TODO: 使用 dispatch 更新 Redux state
    const updatedThemes: ThemeData = {
      primary: primaryTheme,
      secondary: secondaryThemes,
      symbols,
      metaphors,
      motifs,
    };
    console.log('保存主题分析:', updatedThemes);
  };

  return {
    // State
    primaryTheme,
    setPrimaryTheme,
    secondaryThemes,
    symbols,
    metaphors,
    motifs,
    inputs,

    // Actions
    updateInput,
    handleAddItem,
    handleRemoveItem,
    handleSave,
  };
};
