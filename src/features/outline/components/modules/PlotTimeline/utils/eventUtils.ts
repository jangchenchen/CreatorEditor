import {
  PlotEvent,
  PlotEventType,
  EventImportance,
  Character,
} from '../../../../types/outline.types';

export const getEventTypeColor = (type: PlotEventType) => {
  const colors = {
    beginning: 'primary',
    development: 'success',
    climax: 'warning',
    resolution: 'secondary',
    transition: 'info',
  } as const;
  return colors[type] || 'default';
};

export const getImportanceIcon = (importance: EventImportance) => {
  switch (importance) {
    case 'critical':
      return '🔴';
    case 'important':
      return '🟡';
    case 'minor':
      return '🟢';
    default:
      return '⚪';
  }
};

export const getCharacterName = (characterId: string, characters: Character[]) => {
  const character = characters.find(c => c.id === characterId);
  return character?.name || characterId;
};

export const groupEventsByType = (plotEvents: PlotEvent[]) => {
  return plotEvents.reduce(
    (acc, event) => {
      if (!acc[event.type]) {
        acc[event.type] = [];
      }
      acc[event.type].push(event);
      return acc;
    },
    {} as Record<PlotEventType, PlotEvent[]>
  );
};

export const initializeEventFormData = (event?: PlotEvent) => {
  return event
    ? { ...event }
    : {
        timestamp: '',
        title: '',
        description: '',
        type: 'development' as PlotEventType,
        importance: 'important' as EventImportance,
        isKeyEvent: false,
        characters: [],
        locations: [],
        impact: '',
        consequences: [],
        relatedEvents: [],
        tags: [],
      };
};
