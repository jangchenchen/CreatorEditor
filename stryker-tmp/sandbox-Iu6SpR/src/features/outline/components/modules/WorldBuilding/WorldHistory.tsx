// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { selectOutline } from '../../../outlineSlice';
import { HistoricalEvent } from '../../../types/outline.types';
import { useHistoryState } from './hooks/useHistoryState';
import { handleAddItem, handleRemoveItem, createHistoryUpdate } from './utils/historyUtils';
import HistoricalTimeline from './components/HistoricalTimeline';
import LegendsManager from './components/LegendsManager';
import SecretsManager from './components/SecretsManager';
import MysteriesManager from './components/MysteriesManager';
import HistoricalEventDialog from './components/HistoricalEventDialog';
import DesignTips from './components/DesignTips';

const WorldHistory: React.FC = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const history = outline.world.history;

  const {
    editingEvent,
    eventDialogOpen,
    eventFormData,
    setEventFormData,
    handleOpenEventDialog,
    handleCloseEventDialog,
    handleEventFormChange,
    legends,
    setLegends,
    familySecrets,
    setFamilySecrets,
    mysteries,
    setMysteries,
    newLegend,
    setNewLegend,
    newSecret,
    setNewSecret,
    newMystery,
    setNewMystery,
  } = useHistoryState(history);

  const handleSaveEvent = () => {
    const eventData: HistoricalEvent = {
      id: editingEvent?.id || `event-${Date.now()}`,
      name: eventFormData.name || '',
      period: eventFormData.period || '',
      description: eventFormData.description || '',
      impact: eventFormData.impact || '',
    };

    // TODO: 使用 dispatch 更新 Redux state
    console.log('保存历史事件:', eventData);
    handleCloseEventDialog();
  };

  const handleDeleteEvent = (eventId: string) => {
    // TODO: 使用 dispatch 更新 Redux state
    console.log('删除历史事件:', eventId);
  };

  const handleAddLegend = () => {
    handleAddItem('legend', newLegend, legends, setLegends, setNewLegend);
  };

  const handleRemoveLegend = (index: number) => {
    handleRemoveItem(
      'legend',
      index,
      legends,
      setLegends,
      familySecrets,
      setFamilySecrets,
      mysteries,
      setMysteries
    );
  };

  const handleAddSecret = () => {
    handleAddItem('secret', newSecret, familySecrets, setFamilySecrets, setNewSecret);
  };

  const handleRemoveSecret = (index: number) => {
    handleRemoveItem(
      'secret',
      index,
      legends,
      setLegends,
      familySecrets,
      setFamilySecrets,
      mysteries,
      setMysteries
    );
  };

  const handleAddMystery = () => {
    handleAddItem('mystery', newMystery, mysteries, setMysteries, setNewMystery);
  };

  const handleRemoveMystery = (index: number) => {
    handleRemoveItem(
      'mystery',
      index,
      legends,
      setLegends,
      familySecrets,
      setFamilySecrets,
      mysteries,
      setMysteries
    );
  };

  const handleSaveHistory = () => {
    const updatedHistory = createHistoryUpdate(history.timeline, legends, familySecrets, mysteries);
    // TODO: 使用 dispatch 更新 Redux state
    console.log('保存世界历史:', updatedHistory);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant='h6' gutterBottom>
        世界历史设定
      </Typography>
      <Typography variant='body2' color='text.secondary' paragraph>
        构建故事世界的历史背景，包括重大历史事件、传说故事和未解之谜。
      </Typography>

      <HistoricalTimeline
        timeline={history.timeline}
        onAddEvent={() => handleOpenEventDialog()}
        onEditEvent={handleOpenEventDialog}
        onDeleteEvent={handleDeleteEvent}
      />

      <LegendsManager
        legends={legends}
        newLegend={newLegend}
        onNewLegendChange={setNewLegend}
        onAddLegend={handleAddLegend}
        onRemoveLegend={handleRemoveLegend}
      />

      <SecretsManager
        familySecrets={familySecrets}
        newSecret={newSecret}
        onNewSecretChange={setNewSecret}
        onAddSecret={handleAddSecret}
        onRemoveSecret={handleRemoveSecret}
      />

      <MysteriesManager
        mysteries={mysteries}
        newMystery={newMystery}
        onNewMysteryChange={setNewMystery}
        onAddMystery={handleAddMystery}
        onRemoveMystery={handleRemoveMystery}
      />

      <HistoricalEventDialog
        open={eventDialogOpen}
        editingEvent={editingEvent}
        eventFormData={eventFormData}
        onClose={handleCloseEventDialog}
        onSave={handleSaveEvent}
        onFormChange={handleEventFormChange}
      />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button variant='contained' size='large' onClick={handleSaveHistory} sx={{ minWidth: 120 }}>
          保存历史设定
        </Button>
      </Box>

      <DesignTips />
    </Box>
  );
};

export default WorldHistory;
