import React, { useState, useCallback } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FileDownload as ExportIcon,
  Description as JsonIcon,
  Article as WordIcon,
  PictureAsPdf as PdfIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { useDocumentExport } from '../hooks/useDocumentExport';
import DocumentExportDialog from './DocumentExportDialog';

interface ExportMenuProps {
  variant?: 'button' | 'icon';
  size?: 'small' | 'medium' | 'large';
  showQuickExport?: boolean;
}

const ExportMenu: React.FC<ExportMenuProps> = ({
  variant = 'button',
  size = 'medium',
  showQuickExport = true,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportDialogFormat, setExportDialogFormat] = useState<'json' | 'docx' | 'pdf'>('docx');

  const { isExporting, exportToJSON, exportToWord, exportToPDF, validateExportData } =
    useDocumentExport();

  const open = Boolean(anchorEl);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleQuickExport = useCallback(
    async (format: 'json' | 'docx' | 'pdf') => {
      handleMenuClose();

      const validation = validateExportData();
      if (!validation.isValid) {
        // Open dialog for problematic exports
        setExportDialogFormat(format);
        setExportDialogOpen(true);
        return;
      }

      try {
        switch (format) {
          case 'json':
            await exportToJSON();
            break;
          case 'docx':
            await exportToWord();
            break;
          case 'pdf':
            await exportToPDF();
            break;
        }
      } catch (error) {
        console.error('Export failed:', error);
      }
    },
    [handleMenuClose, validateExportData, exportToJSON, exportToWord, exportToPDF]
  );

  const handleAdvancedExport = useCallback(
    (format: 'json' | 'docx' | 'pdf') => {
      handleMenuClose();
      setExportDialogFormat(format);
      setExportDialogOpen(true);
    },
    [handleMenuClose]
  );

  const handleExportDialogClose = useCallback(() => {
    setExportDialogOpen(false);
  }, []);

  const renderTriggerButton = () => {
    if (variant === 'icon') {
      return (
        <Tooltip title='导出文档'>
          <IconButton onClick={handleMenuOpen} size={size} disabled={isExporting}>
            <ExportIcon />
          </IconButton>
        </Tooltip>
      );
    }

    return (
      <Button
        onClick={handleMenuOpen}
        startIcon={<ExportIcon />}
        size={size}
        disabled={isExporting}
        variant='outlined'
      >
        {isExporting ? '导出中...' : '导出'}
      </Button>
    );
  };

  return (
    <>
      {renderTriggerButton()}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {showQuickExport && (
          <>
            <MenuItem onClick={() => handleQuickExport('docx')}>
              <ListItemIcon>
                <WordIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>快速导出 Word</ListItemText>
            </MenuItem>

            <MenuItem onClick={() => handleQuickExport('pdf')}>
              <ListItemIcon>
                <PdfIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>快速导出 PDF</ListItemText>
            </MenuItem>

            <MenuItem onClick={() => handleQuickExport('json')}>
              <ListItemIcon>
                <JsonIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>快速导出 JSON</ListItemText>
            </MenuItem>

            <Divider />
          </>
        )}

        <MenuItem onClick={() => handleAdvancedExport('docx')}>
          <ListItemIcon>
            <WordIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>自定义 Word 导出...</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAdvancedExport('pdf')}>
          <ListItemIcon>
            <PdfIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>自定义 PDF 导出...</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAdvancedExport('json')}>
          <ListItemIcon>
            <JsonIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>自定义 JSON 导出...</ListItemText>
        </MenuItem>
      </Menu>

      <DocumentExportDialog
        open={exportDialogOpen}
        onClose={handleExportDialogClose}
        defaultFormat={exportDialogFormat}
      />
    </>
  );
};

export default ExportMenu;
