// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider } from '@mui/material';
import { selectOutline } from '../../../outlineSlice';
import { PlotAlternative } from '../../../types/outline.types';
import AlternativeStatistics from './components/AlternativeStatistics';
import AlternativeToolbar from './components/AlternativeToolbar';
import AlternativeList from './components/AlternativeList';
import AlternativeEditDialog from './components/AlternativeEditDialog';
import AlternativeDesignGuide from './components/AlternativeDesignGuide';
import { useAlternativeState } from './hooks/useAlternativeState';

const PlotAlternatives: React.FC = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const alternatives = outline.ideas.alternatives;

  const {
    editingAlternative,
    dialogOpen,
    formData,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange,
    handleListFieldChange,
    handleAddListItem,
    handleRemoveListItem,
  } = useAlternativeState();

  const handleSaveAlternative = () => {
    const alternativeData: PlotAlternative = {
      id: editingAlternative?.id || `alternative-${Date.now()}`,
      originalElement: formData.originalElement || '',
      alternativeVersion: formData.alternativeVersion || '',
      pros: formData.pros || [],
      cons: formData.cons || [],
      impact: formData.impact || '',
    };

    // TODO: 使用 dispatch 更新 Redux state
    console.log('保存情节替代:', alternativeData);
    handleCloseDialog();
  };

  const handleDeleteAlternative = (alternativeId: string) => {
    if (window.confirm('确定要删除这个情节替代方案吗？')) {
      // TODO: 使用 dispatch 更新 Redux state
      console.log('删除情节替代:', alternativeId);
    }
  };

  return (
    <Box>
      <AlternativeStatistics alternativeCount={alternatives.length} />

      <AlternativeToolbar onAddAlternative={() => handleOpenDialog()} />

      <AlternativeList
        alternatives={alternatives}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteAlternative}
        onAddAlternative={() => handleOpenDialog()}
      />

      <AlternativeEditDialog
        open={dialogOpen}
        editingAlternative={editingAlternative}
        formData={formData}
        onClose={handleCloseDialog}
        onSave={handleSaveAlternative}
        onFormChange={handleFormChange}
        onListFieldChange={handleListFieldChange}
        onAddListItem={handleAddListItem}
        onRemoveListItem={handleRemoveListItem}
      />

      <Divider sx={{ my: 3 }} />

      <AlternativeDesignGuide />
    </Box>
  );
};

export default PlotAlternatives;
