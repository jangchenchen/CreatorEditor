// @ts-nocheck
import React from 'react';
import { Box, Typography } from '@mui/material';
import { StatusBar } from '../styles/editor.styles';

interface EditorStatusBarProps {
  wordCount: number;
  isDirty: boolean;
  lastSaved: Date | null;
  autoSaveEnabled: boolean;
}

const EditorStatusBar: React.FC<EditorStatusBarProps> = ({
  wordCount,
  isDirty,
  lastSaved,
  autoSaveEnabled,
}) => {
  return (
    <StatusBar>
      <Box display='flex' alignItems='center' gap={2}>
        <Typography variant='body2'>字数: {wordCount}</Typography>
        {isDirty && (
          <Typography variant='body2' color='warning.main'>
            未保存
          </Typography>
        )}
        {lastSaved && (
          <Typography variant='body2' color='text.secondary'>
            上次保存: {lastSaved.toLocaleTimeString()}
          </Typography>
        )}
      </Box>

      <Box display='flex' alignItems='center' gap={1}>
        <Typography variant='body2' color='text.secondary'>
          自动保存: {autoSaveEnabled ? '开启' : '关闭'}
        </Typography>
      </Box>
    </StatusBar>
  );
};

export default EditorStatusBar;
