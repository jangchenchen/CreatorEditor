import React from 'react';
import { AppBar, Typography, IconButton, Tooltip } from '@mui/material';
import {
  Save as SaveIcon,
  SaveAs as SaveAsIcon,
  FolderOpen as FolderOpenIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { StyledToolbar } from '../styles/editor.styles';

interface EditorToolbarProps {
  fileName: string | null;
  isDirty: boolean;
  onNewFile: () => void;
  onOpenFile: () => void;
  onSaveFile: () => void;
  onSaveAs: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  fileName,
  isDirty,
  onNewFile,
  onOpenFile,
  onSaveFile,
  onSaveAs,
}) => {
  return (
    <AppBar position="static" elevation={0}>
      <StyledToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          创作编辑器
          {fileName && ` - ${fileName}`}
          {isDirty && ' *'}
        </Typography>
        
        <Tooltip title="新建文件">
          <IconButton color="inherit" onClick={onNewFile}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="打开文件">
          <IconButton color="inherit" onClick={onOpenFile}>
            <FolderOpenIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="保存">
          <IconButton 
            color="inherit" 
            onClick={onSaveFile}
            disabled={!isDirty}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="另存为">
          <IconButton color="inherit" onClick={onSaveAs}>
            <SaveAsIcon />
          </IconButton>
        </Tooltip>
      </StyledToolbar>
    </AppBar>
  );
};

export default EditorToolbar;