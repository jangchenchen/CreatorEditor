import { useState } from 'react';
import { HistoricalEvent } from '../../../../types/outline.types';

export const useHistoryState = (initialHistory: any) => {
  // 历史事件相关状态
  const [editingEvent, setEditingEvent] = useState<HistoricalEvent | null>(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [eventFormData, setEventFormData] = useState<Partial<HistoricalEvent>>({});

  // 其他历史要素状态
  const [legends, setLegends] = useState<string[]>(initialHistory.legends);
  const [familySecrets, setFamilySecrets] = useState<string[]>(initialHistory.familySecrets);
  const [mysteries, setMysteries] = useState<string[]>(initialHistory.mysteries);

  // 临时输入状态
  const [newLegend, setNewLegend] = useState('');
  const [newSecret, setNewSecret] = useState('');
  const [newMystery, setNewMystery] = useState('');

  // 历史事件处理
  const handleOpenEventDialog = (event?: HistoricalEvent) => {
    setEditingEvent(event || null);
    setEventFormData(
      event
        ? { ...event }
        : {
            name: '',
            period: '',
            description: '',
            impact: '',
          }
    );
    setEventDialogOpen(true);
  };

  const handleCloseEventDialog = () => {
    setEventDialogOpen(false);
    setEditingEvent(null);
    setEventFormData({});
  };

  const handleEventFormChange =
    (field: keyof HistoricalEvent) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEventFormData(prev => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return {
    // Event states
    editingEvent,
    eventDialogOpen,
    eventFormData,
    setEventFormData,
    handleOpenEventDialog,
    handleCloseEventDialog,
    handleEventFormChange,

    // Other history elements
    legends,
    setLegends,
    familySecrets,
    setFamilySecrets,
    mysteries,
    setMysteries,

    // Input states
    newLegend,
    setNewLegend,
    newSecret,
    setNewSecret,
    newMystery,
    setNewMystery,
  };
};
