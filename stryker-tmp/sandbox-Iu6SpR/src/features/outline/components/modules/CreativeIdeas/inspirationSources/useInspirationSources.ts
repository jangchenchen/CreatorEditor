// @ts-nocheck
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIdeas, loadIdeasData } from '../../../../slices/ideasSlice';

export const useInspirationSources = () => {
  const dispatch = useDispatch();
  const ideas = useSelector(selectIdeas);

  const [inspirationSources, setInspirationSources] = useState<string[]>(ideas.inspirationSources);
  const [brainstormingSessions, setBrainstormingSessions] = useState<string[]>(
    ideas.brainstormingSessions
  );
  const [newSource, setNewSource] = useState('');
  const [newSession, setNewSession] = useState('');

  const handleAddSource = useCallback(() => {
    if (newSource.trim() && !inspirationSources.includes(newSource.trim())) {
      setInspirationSources([...inspirationSources, newSource.trim()]);
      setNewSource('');
    }
  }, [newSource, inspirationSources]);

  const handleRemoveSource = useCallback(
    (index: number) => {
      setInspirationSources(inspirationSources.filter((_, i) => i !== index));
    },
    [inspirationSources]
  );

  const handleAddSession = useCallback(() => {
    if (newSession.trim()) {
      setBrainstormingSessions([...brainstormingSessions, newSession.trim()]);
      setNewSession('');
    }
  }, [newSession, brainstormingSessions]);

  const handleRemoveSession = useCallback(
    (index: number) => {
      setBrainstormingSessions(brainstormingSessions.filter((_, i) => i !== index));
    },
    [brainstormingSessions]
  );

  const handleSave = useCallback(() => {
    dispatch(
      loadIdeasData({
        ...ideas,
        inspirationSources,
        brainstormingSessions,
      })
    );
  }, [dispatch, ideas, inspirationSources, brainstormingSessions]);

  return {
    inspirationSources,
    brainstormingSessions,
    newSource,
    newSession,
    setNewSource,
    setNewSession,
    handleAddSource,
    handleRemoveSource,
    handleAddSession,
    handleRemoveSession,
    handleSave,
  };
};
