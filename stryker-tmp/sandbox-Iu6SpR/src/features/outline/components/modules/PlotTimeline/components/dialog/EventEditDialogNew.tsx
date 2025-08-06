// @ts-nocheck
import React from 'react';
import { Box, Grid } from '@mui/material';
import { EventEditDialogContainerProps } from './types';
import { EventEditDialog } from './EventEditDialog';
import { BasicInfoFields } from './BasicInfoFields';
import { TypeImportanceFields } from './TypeImportanceFields';
import { DescriptionImpactFields } from './DescriptionImpactFields';
import { CharacterLocationFields } from './CharacterLocationFields';
import { TagsAndKeyEvent } from './TagsAndKeyEvent';

export const EventEditDialogNew: React.FC<EventEditDialogContainerProps> = ({
  open,
  editingEvent,
  formData,
  characters,
  onClose,
  onSave,
  onFormChange,
  onArrayFieldChange,
  onSwitchChange,
}) => {
  const isFormValid = formData.title && formData.timestamp;

  return (
    <EventEditDialog
      open={open}
      editingEvent={editingEvent}
      onClose={onClose}
      onSave={onSave}
      isFormValid={!!isFormValid}
    >
      <Box component='form' sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {/* 基本信息 */}
          <BasicInfoFields
            title={formData.title || ''}
            timestamp={formData.timestamp || ''}
            onTitleChange={value => onFormChange('title')({ target: { value } })}
            onTimestampChange={value => onFormChange('timestamp')({ target: { value } })}
          />

          {/* 类型和重要性 */}
          <TypeImportanceFields
            type={formData.type || 'development'}
            importance={formData.importance || 'important'}
            onTypeChange={value => onFormChange('type')({ target: { value } })}
            onImportanceChange={value => onFormChange('importance')({ target: { value } })}
          />

          {/* 描述 */}
          <DescriptionImpactFields
            description={formData.description || ''}
            impact={formData.impact || ''}
            consequences={formData.consequences || []}
            onDescriptionChange={value => onFormChange('description')({ target: { value } })}
            onImpactChange={value => onFormChange('impact')({ target: { value } })}
            onConsequencesChange={onArrayFieldChange('consequences')}
          />

          {/* 涉及角色 */}
          <CharacterLocationFields
            characters={characters}
            selectedCharacters={formData.characters || []}
            locations={formData.locations || []}
            onCharactersChange={onArrayFieldChange('characters')}
            onLocationsChange={onArrayFieldChange('locations')}
          />

          {/* 标签和关键事件 */}
          <TagsAndKeyEvent
            tags={formData.tags || []}
            isKeyEvent={formData.isKeyEvent || false}
            onTagsChange={onArrayFieldChange('tags')}
            onKeyEventChange={onSwitchChange('isKeyEvent')}
          />
        </Grid>
      </Box>
    </EventEditDialog>
  );
};

export default EventEditDialogNew;
