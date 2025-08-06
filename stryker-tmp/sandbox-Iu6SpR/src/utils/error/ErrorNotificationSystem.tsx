/**
 * 错误通知系统
 * 提供用户友好的错误提示和通知功能
 */
// @ts-nocheck


import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Slide,
  Stack,
  Portal,
  IconButton,
  Box,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Refresh as RetryIcon,
} from '@mui/icons-material';
import { ErrorLogger } from './ErrorLogger';
import type { ErrorLevel } from './ErrorLogger';

export interface ErrorNotification {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  actions?: NotificationAction[];
  metadata?: Record<string, any>;
  timestamp: number;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

interface ErrorNotificationContextType {
  notifications: ErrorNotification[];
  showError: (message: string, options?: Partial<ErrorNotification>) => string;
  showWarning: (message: string, options?: Partial<ErrorNotification>) => string;
  showInfo: (message: string, options?: Partial<ErrorNotification>) => string;
  showSuccess: (message: string, options?: Partial<ErrorNotification>) => string;
  hideNotification: (id: string) => void;
  clearAll: () => void;
  handleError: (error: Error | string, context?: string, retryAction?: () => void) => string;
}

const ErrorNotificationContext = createContext<ErrorNotificationContextType | null>(null);

export const useErrorNotification = () => {
  const context = useContext(ErrorNotificationContext);
  if (!context) {
    throw new Error('useErrorNotification must be used within ErrorNotificationProvider');
  }
  return context;
};

interface ErrorNotificationProviderProps {
  children: React.ReactNode;
  maxNotifications?: number;
  defaultDuration?: number;
  position?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

export const ErrorNotificationProvider: React.FC<ErrorNotificationProviderProps> = ({
  children,
  maxNotifications = 5,
  defaultDuration = 6000,
  position = { vertical: 'top', horizontal: 'right' },
}) => {
  const [notifications, setNotifications] = useState<ErrorNotification[]>([]);

  const generateId = useCallback(() => {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const addNotification = useCallback(
    (notification: ErrorNotification) => {
      setNotifications(prev => {
        const newNotifications = [notification, ...prev];

        // 限制通知数量
        if (newNotifications.length > maxNotifications) {
          return newNotifications.slice(0, maxNotifications);
        }

        return newNotifications;
      });

      // 自动隐藏非持久化通知
      if (!notification.persistent && notification.duration !== 0) {
        const duration = notification.duration || defaultDuration;
        setTimeout(() => {
          hideNotification(notification.id);
        }, duration);
      }
    },
    [maxNotifications, defaultDuration]
  );

  const hideNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const showError = useCallback(
    (message: string, options: Partial<ErrorNotification> = {}) => {
      const id = options.id || generateId();
      const notification: ErrorNotification = {
        id,
        type: 'error',
        title: options.title || '操作失败',
        message,
        duration: options.duration,
        persistent: options.persistent,
        actions: options.actions,
        metadata: options.metadata,
        timestamp: Date.now(),
      };

      addNotification(notification);
      return id;
    },
    [addNotification, generateId]
  );

  const showWarning = useCallback(
    (message: string, options: Partial<ErrorNotification> = {}) => {
      const id = options.id || generateId();
      const notification: ErrorNotification = {
        id,
        type: 'warning',
        title: options.title || '注意',
        message,
        duration: options.duration,
        persistent: options.persistent,
        actions: options.actions,
        metadata: options.metadata,
        timestamp: Date.now(),
      };

      addNotification(notification);
      return id;
    },
    [addNotification, generateId]
  );

  const showInfo = useCallback(
    (message: string, options: Partial<ErrorNotification> = {}) => {
      const id = options.id || generateId();
      const notification: ErrorNotification = {
        id,
        type: 'info',
        title: options.title || '提示',
        message,
        duration: options.duration,
        persistent: options.persistent,
        actions: options.actions,
        metadata: options.metadata,
        timestamp: Date.now(),
      };

      addNotification(notification);
      return id;
    },
    [addNotification, generateId]
  );

  const showSuccess = useCallback(
    (message: string, options: Partial<ErrorNotification> = {}) => {
      const id = options.id || generateId();
      const notification: ErrorNotification = {
        id,
        type: 'success',
        title: options.title || '成功',
        message,
        duration: options.duration || 4000, // 成功消息默认较短时间
        persistent: options.persistent,
        actions: options.actions,
        metadata: options.metadata,
        timestamp: Date.now(),
      };

      addNotification(notification);
      return id;
    },
    [addNotification, generateId]
  );

  const handleError = useCallback(
    (error: Error | string, context: string = '操作', retryAction?: () => void) => {
      const errorMessage = typeof error === 'string' ? error : error.message;
      const errorObj = typeof error === 'string' ? new Error(error) : error;

      // 记录错误到日志系统
      const errorId = ErrorLogger.logError(errorObj, { context });

      // 生成用户友好的错误消息
      const { title, message, actions } = generateUserFriendlyError(errorObj, context, retryAction);

      return showError(message, {
        title,
        actions,
        persistent: errorObj.name === 'NetworkError' || errorObj.message.includes('网络'),
        metadata: { errorId, context, originalError: errorMessage },
      });
    },
    [showError]
  );

  const value: ErrorNotificationContextType = {
    notifications,
    showError,
    showWarning,
    showInfo,
    showSuccess,
    hideNotification,
    clearAll,
    handleError,
  };

  return (
    <ErrorNotificationContext.Provider value={value}>
      {children}
      <NotificationContainer
        notifications={notifications}
        onClose={hideNotification}
        position={position}
      />
    </ErrorNotificationContext.Provider>
  );
};

interface NotificationContainerProps {
  notifications: ErrorNotification[];
  onClose: (id: string) => void;
  position: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onClose,
  position,
}) => {
  const getIcon = (type: ErrorNotification['type']) => {
    const iconProps = { fontSize: 'inherit' as const };
    switch (type) {
      case 'error':
        return <ErrorIcon {...iconProps} />;
      case 'warning':
        return <WarningIcon {...iconProps} />;
      case 'info':
        return <InfoIcon {...iconProps} />;
      case 'success':
        return <SuccessIcon {...iconProps} />;
    }
  };

  const getPositionStyles = () => {
    const styles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 1400,
      maxWidth: 400,
      width: '100%',
    };

    if (position.vertical === 'top') {
      styles.top = 24;
    } else {
      styles.bottom = 24;
    }

    if (position.horizontal === 'left') {
      styles.left = 24;
    } else if (position.horizontal === 'right') {
      styles.right = 24;
    } else {
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
    }

    return styles;
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Portal>
      <Box sx={getPositionStyles()}>
        <Stack spacing={1}>
          {notifications.map(notification => (
            <Slide
              key={notification.id}
              direction={position.horizontal === 'right' ? 'left' : 'right'}
              in={true}
              timeout={300}
            >
              <Alert
                severity={notification.type}
                icon={getIcon(notification.type)}
                action={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {notification.actions?.map((action, index) => (
                      <Button
                        key={index}
                        size='small'
                        variant={action.variant || 'text'}
                        color={action.color || 'inherit'}
                        onClick={action.action}
                        sx={{ minWidth: 'auto' }}
                      >
                        {action.label}
                      </Button>
                    ))}
                    <IconButton
                      size='small'
                      onClick={() => onClose(notification.id)}
                      color='inherit'
                    >
                      <CloseIcon fontSize='small' />
                    </IconButton>
                  </Box>
                }
                sx={{
                  width: '100%',
                  boxShadow: 3,
                  '& .MuiAlert-message': { width: '100%' },
                }}
              >
                <AlertTitle>{notification.title}</AlertTitle>
                <Typography variant='body2' component='div'>
                  {notification.message}
                </Typography>

                {notification.metadata?.errorId && (
                  <Chip
                    label={`错误ID: ${notification.metadata.errorId.slice(-8)}`}
                    size='small'
                    variant='outlined'
                    sx={{ mt: 1, fontSize: '0.75rem', height: 20 }}
                  />
                )}
              </Alert>
            </Slide>
          ))}
        </Stack>
      </Box>
    </Portal>
  );
};

/**
 * 生成用户友好的错误消息
 */
function generateUserFriendlyError(
  error: Error,
  context: string,
  retryAction?: () => void
): {
  title: string;
  message: string;
  actions?: NotificationAction[];
} {
  const actions: NotificationAction[] = [];

  // 网络错误
  if (
    error.name === 'NetworkError' ||
    error.message.includes('网络') ||
    error.message.includes('fetch')
  ) {
    if (retryAction) {
      actions.push({
        label: '重试',
        action: retryAction,
        variant: 'contained',
        color: 'primary',
      });
    }

    return {
      title: '网络连接失败',
      message: '请检查您的网络连接，然后重试操作',
      actions,
    };
  }

  // 权限错误
  if (error.name === 'PermissionError' || error.message.includes('权限')) {
    return {
      title: '权限不足',
      message: '您没有执行此操作的权限，请联系管理员',
      actions,
    };
  }

  // 验证错误
  if (error.message.includes('验证') || error.message.includes('格式')) {
    return {
      title: '数据验证失败',
      message: '请检查输入的数据格式是否正确',
      actions,
    };
  }

  // 资源加载错误
  if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
    actions.push({
      label: '刷新页面',
      action: () => window.location.reload(),
      variant: 'contained',
      color: 'primary',
    });

    return {
      title: '资源加载失败',
      message: '应用程序资源加载失败，请刷新页面重试',
      actions,
    };
  }

  // 默认错误处理
  if (retryAction) {
    actions.push({
      label: '重试',
      action: retryAction,
      variant: 'outlined',
      color: 'primary',
    });
  }

  return {
    title: `${context}失败`,
    message: error.message || '发生未知错误，请稍后重试',
    actions,
  };
}

export default ErrorNotificationProvider;
