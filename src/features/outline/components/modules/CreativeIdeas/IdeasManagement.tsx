import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Lightbulb as InspirationIcon } from '@mui/icons-material';
import { selectOutline } from '../../../outlineSlice';
import { CreativeIdea, IdeaType, IdeaStatus } from '../../../types/outline.types';
import IdeasStatistics from './components/IdeasStatistics';
import IdeasFilters from './components/IdeasFilters';
import IdeaCard from './components/IdeaCard';
import IdeaEditDialog from './components/IdeaEditDialog';
import { getTypeIcon, getTypeLabel } from './utils/ideaUtils';
import { useIdeasFiltering } from './hooks/useIdeasFiltering';
import { useIdeaDialog } from './hooks/useIdeaDialog';

const IdeasManagement: React.FC = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const ideas = outline.ideas.ideas;

  const [filterType, setFilterType] = useState<IdeaType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<IdeaStatus | 'all'>('all');

  const { filteredAndSortedIdeas, ideasByType } = useIdeasFiltering(
    ideas,
    filterType,
    filterStatus
  );

  const {
    editingIdea,
    dialogOpen,
    formData,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange,
    handleArrayFieldChange,
    handlePriorityChange,
  } = useIdeaDialog();

  const handleSaveIdea = () => {
    const ideaData: CreativeIdea = {
      id: editingIdea?.id || `idea-${Date.now()}`,
      type: formData.type || 'inspiration',
      title: formData.title || '',
      content: formData.content || '',
      relatedModule: formData.relatedModule || '',
      relatedElements: formData.relatedElements || [],
      priority: formData.priority || 3,
      status: formData.status || 'draft',
      tags: formData.tags || [],
      inspiration: formData.inspiration || '',
      potentialImpact: formData.potentialImpact || '',
      createdAt: editingIdea?.createdAt || new Date(),
      lastUpdated: new Date(),
    };

    // TODO: 使用 dispatch 更新 Redux state
    console.log('保存创意:', ideaData);
    handleCloseDialog();
  };

  const handleDeleteIdea = (ideaId: string) => {
    if (window.confirm('确定要删除这个创意吗？')) {
      // TODO: 使用 dispatch 更新 Redux state
      console.log('删除创意:', ideaId);
    }
  };

  return (
    <Box>
      <IdeasStatistics ideas={ideas} />

      <IdeasFilters
        filterType={filterType}
        filterStatus={filterStatus}
        onTypeChange={setFilterType}
        onStatusChange={setFilterStatus}
        onAddIdea={() => handleOpenDialog()}
      />

      {/* 创意列表 */}
      {filteredAndSortedIdeas.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <InspirationIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant='h6' color='text.secondary' gutterBottom>
              {ideas.length === 0 ? '暂无创意记录' : '无符合条件的创意'}
            </Typography>
            <Typography variant='body2' color='text.secondary' paragraph>
              {ideas.length === 0 ? '开始记录您的创意想法和灵感' : '尝试调整筛选条件'}
            </Typography>
            <Button variant='outlined' onClick={() => handleOpenDialog()}>
              添加第一个创意
            </Button>
          </CardContent>
        </Card>
      ) : (
        Object.entries(ideasByType).map(([type, typeIdeas]) => {
          const TypeIcon = getTypeIcon(type as IdeaType);
          return (
            <Accordion key={type} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
                  <TypeIcon />
                  <Box sx={{ ml: 1 }}>
                    {getTypeLabel(type as IdeaType)} ({typeIdeas.length})
                  </Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {typeIdeas.map(idea => (
                    <Grid item xs={12} md={6} lg={4} key={idea.id}>
                      <IdeaCard idea={idea} onEdit={handleOpenDialog} onDelete={handleDeleteIdea} />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}

      <IdeaEditDialog
        open={dialogOpen}
        editingIdea={editingIdea}
        formData={formData}
        onClose={handleCloseDialog}
        onSave={handleSaveIdea}
        onFormChange={handleFormChange}
        onArrayFieldChange={handleArrayFieldChange}
        onPriorityChange={handlePriorityChange}
      />
    </Box>
  );
};

export default IdeasManagement;
