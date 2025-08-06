import { useMemo } from 'react';
import { CharacterArcProps, UseCharacterArcReturn } from './types';
import { useCharacterArcState } from './useCharacterArcState';
import { calculateProgress, generateSteps } from './utils';

export const useCharacterArcNew = (props: CharacterArcProps = {}): UseCharacterArcReturn => {
  const { state, actions, characters } = useCharacterArcState(props);

  const progress = useMemo(() => calculateProgress(state), [state]);
  const steps = useMemo(() => generateSteps(state), [state]);

  return {
    state,
    progress,
    steps,
    characters,
    ...actions,
  };
};
