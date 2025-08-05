import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  AutoAwesome as InspirationIcon,
  Psychology as BrainstormingIcon
} from '@mui/icons-material';
import { useInspirationSources } from './useInspirationSources';
import { InspirationSourcesManager } from './InspirationSourcesManager';
import { BrainstormingSessionsManager } from './BrainstormingSessionsManager';
import { InspirationCategoriesReference } from './InspirationCategoriesReference';
import { BrainstormingTechniquesGuide } from './BrainstormingTechniquesGuide';

const InspirationSourcesNew: React.FC = () => {
  const {
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
    handleSave
  } = useInspirationSources();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        灵感来源与创意管理
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        系统地管理和记录创作灵感的来源，以及头脑风暴的思考过程。
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <InspirationIcon sx={{ mr: 1, color: 'primary.main' }} />
            灵感来源 ({inspirationSources.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InspirationSourcesManager
            inspirationSources={inspirationSources}
            newSource={newSource}
            setNewSource={setNewSource}
            handleAddSource={handleAddSource}
            handleRemoveSource={handleRemoveSource}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <BrainstormingIcon sx={{ mr: 1, color: 'secondary.main' }} />
            头脑风暴记录 ({brainstormingSessions.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BrainstormingSessionsManager
            brainstormingSessions={brainstormingSessions}
            newSession={newSession}
            setNewSession={setNewSession}
            handleAddSession={handleAddSession}
            handleRemoveSession={handleRemoveSession}
          />
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
          startIcon={<SaveIcon />}
          sx={{ minWidth: 140 }}
        >
          保存灵感管理
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <InspirationCategoriesReference onSelectExample={setNewSource} />
      
      <BrainstormingTechniquesGuide />
    </Box>
  );
};

export default InspirationSourcesNew;