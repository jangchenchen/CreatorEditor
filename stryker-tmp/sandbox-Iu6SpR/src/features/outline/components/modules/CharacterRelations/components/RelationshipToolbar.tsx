/**
 * Relationship Toolbar Component
 * Top toolbar with view mode toggle and add button
 */
// @ts-nocheck


import React from 'react';
import { Box, Typography, Button, IconButton, Tooltip } from '@mui/material';
import { Add as AddIcon, ViewList as ListIcon, AccountTree as MapIcon } from '@mui/icons-material';

interface RelationshipToolbarProps {
  relationshipCount: number;
  viewMode: 'list' | 'visual';
  onViewModeChange: (mode: 'list' | 'visual') => void;
  onAddRelationship: () => void;
  visualModeDisabled?: boolean;
}

export const RelationshipToolbar: React.FC<RelationshipToolbarProps> = ({
  relationshipCount,
  viewMode,
  onViewModeChange,
  onAddRelationship,
  visualModeDisabled = true,
}) => {
  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant='h6'>角色关系图谱 ({relationshipCount})</Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title='列表视图'>
          <IconButton
            color={viewMode === 'list' ? 'primary' : 'default'}
            onClick={() => onViewModeChange('list')}
            size='small'
          >
            <ListIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={visualModeDisabled ? '关系图功能开发中' : '关系图'}>
          <span>
            <IconButton
              color={viewMode === 'visual' ? 'primary' : 'default'}
              onClick={() => onViewModeChange('visual')}
              disabled={visualModeDisabled}
              size='small'
            >
              <MapIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Button
          variant='contained'
          size='small'
          startIcon={<AddIcon />}
          onClick={onAddRelationship}
        >
          新增关系
        </Button>
      </Box>
    </Box>
  );
};
