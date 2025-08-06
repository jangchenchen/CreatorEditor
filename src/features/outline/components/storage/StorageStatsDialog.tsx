/**
 * Storage Stats Dialog
 * Dialog component that displays storage statistics and information
 */

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
} from '@mui/material';
import { formatFileSize } from '../../utils/storageControlsUtils';

interface StorageStatsDialogProps {
  open: boolean;
  onClose: () => void;
  storageStats: any;
}

export const StorageStatsDialog: React.FC<StorageStatsDialogProps> = ({
  open,
  onClose,
  storageStats,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Storage Statistics</DialogTitle>
      <DialogContent>
        {!storageStats ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant='h6' gutterBottom>
              General Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary='Storage Version'
                  secondary={storageStats.version || 'Unknown'}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='Total Projects'
                  secondary={storageStats.totalProjects || 0}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='Current Project Size'
                  secondary={
                    storageStats.currentProjectSize
                      ? formatFileSize(storageStats.currentProjectSize)
                      : 'Unknown'
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='Total Storage Used'
                  secondary={
                    storageStats.totalSize ? formatFileSize(storageStats.totalSize) : 'Unknown'
                  }
                />
              </ListItem>
            </List>

            {storageStats.settings && (
              <>
                <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                  Settings
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary='Auto-save Enabled'
                      secondary={storageStats.settings.autoSave ? 'Yes' : 'No'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='Last Backup'
                      secondary={
                        storageStats.settings.lastBackup
                          ? new Date(storageStats.settings.lastBackup).toLocaleString()
                          : 'Never'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='Storage Location'
                      secondary={storageStats.settings.location || 'Browser Local Storage'}
                    />
                  </ListItem>
                </List>
              </>
            )}

            {storageStats.performance && (
              <>
                <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                  Performance
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary='Average Save Time'
                      secondary={`${storageStats.performance.avgSaveTime || 0}ms`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='Average Load Time'
                      secondary={`${storageStats.performance.avgLoadTime || 0}ms`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='Total Operations'
                      secondary={storageStats.performance.totalOperations || 0}
                    />
                  </ListItem>
                </List>
              </>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
