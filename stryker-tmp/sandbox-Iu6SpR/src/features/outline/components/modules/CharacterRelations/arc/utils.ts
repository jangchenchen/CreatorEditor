// @ts-nocheck
import { useMemo } from 'react';
import { CharacterArcState, CharacterProgress, CharacterStepData } from './types';

export const calculateProgress = (state: CharacterArcState): CharacterProgress => {
  if (!state.selectedCharacter) {
    return { percentage: 0, currentStep: 0, totalSteps: 0, isCompleted: false };
  }

  const totalSteps = state.selectedCharacter.arc.keyEvents.length + 2; // 起始 + 事件 + 结束
  const currentStep = state.activeStep;
  const percentage = ((currentStep + 1) / totalSteps) * 100;
  const isCompleted = currentStep >= totalSteps;

  return {
    percentage,
    currentStep,
    totalSteps,
    isCompleted,
  };
};

export const generateSteps = (state: CharacterArcState): CharacterStepData[] => {
  if (!state.selectedCharacter) return [];

  const steps: CharacterStepData[] = [
    {
      type: 'start',
      title: '起始状态',
      content: state.selectedCharacter.arc.startState,
      index: 0,
      isCompleted: state.activeStep > 0,
      isActive: state.activeStep === 0,
    },
  ];

  state.selectedCharacter.arc.keyEvents.forEach((event, index) => {
    steps.push({
      type: 'event',
      title: `关键事件 ${index + 1}`,
      content: event,
      index: index + 1,
      isCompleted: state.activeStep > index + 1,
      isActive: state.activeStep === index + 1,
    });
  });

  steps.push({
    type: 'end',
    title: '最终状态',
    content: state.selectedCharacter.arc.endState,
    index: state.selectedCharacter.arc.keyEvents.length + 1,
    isCompleted: state.activeStep >= state.selectedCharacter.arc.keyEvents.length + 1,
    isActive: state.activeStep === state.selectedCharacter.arc.keyEvents.length + 1,
  });

  return steps;
};
