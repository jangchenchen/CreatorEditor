/**
 * Storage Status Indicator
 * Component that displays storage status and connection state
 */
// @ts-nocheck


import React from 'react';
import { Chip, Box } from '@mui/material';
import {
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

interface StorageStatusIndicatorProps {
  isInitialized: boolean;
  isLoading: boolean;
  error?: string | null;
  autoSaveEnabled: boolean;
  hasPendingChanges: boolean;
}

export const StorageStatusIndicator: React.FC<StorageStatusIndicatorProps> = ({
  isInitialized,
  isLoading,
  error,
  autoSaveEnabled,
  hasPendingChanges,
}) => {
  // Determine primary status
  const getPrimaryStatus = () => {
    if (error) {
      return {
        icon: <ErrorIcon />,
        label: 'Storage Error',
        color: 'error' as const,
      };
    }

    if (!isInitialized) {
      return {
        icon: <WarningIcon />,
        label: 'Storage Not Ready',
        color: 'warning' as const,
      };
    }

    if (isLoading) {
      return {
        icon: <InfoIcon />,
        label: 'Loading...',
        color: 'info' as const,
      };
    }

    return {
      icon: <SuccessIcon />,
      label: 'Storage Ready',
      color: 'success' as const,
    };
  };

  // Get auto-save status
  const getAutoSaveStatus = () => {
    if (!isInitialized || error) return null;

    if (hasPendingChanges) {
      return {
        icon: <WarningIcon />,
        label: 'Unsaved Changes',
        color: 'warning' as const,
      };
    }

    if (autoSaveEnabled) {
      return {
        icon: <SuccessIcon />,
        label: 'Auto-save On',
        color: 'success' as const,
      };
    }

    return {
      icon: <InfoIcon />,
      label: 'Auto-save Off',
      color: 'default' as const,
    };
  };

  const primaryStatus = getPrimaryStatus();
  const autoSaveStatus = getAutoSaveStatus();

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip
        icon={primaryStatus.icon}
        label={primaryStatus.label}
        color={primaryStatus.color}
        size='small'
        variant={error ? 'filled' : 'outlined'}
      />

      {autoSaveStatus && (
        <Chip
          icon={autoSaveStatus.icon}
          label={autoSaveStatus.label}
          color={autoSaveStatus.color}
          size='small'
          variant='outlined'
        />
      )}
    </Box>
  );
};
