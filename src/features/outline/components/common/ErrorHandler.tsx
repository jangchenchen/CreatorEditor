/**
 * 统一错误处理组件
 * 提供统一的错误显示和处理机制
 */

import React, { ReactNode } from 'react';
import { Alert, AlertTitle, Snackbar, Box, Typography, Button, Paper } from '@mui/material';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Refresh as RetryIcon,
} from '@mui/icons-material';

export type ErrorType = 'error' | 'warning' | 'info' | 'success';
export type ErrorDisplayMode = 'inline' | 'snackbar' | 'modal';

export interface ErrorInfo {
  type: ErrorType;
  title?: string;
  message: string;
  details?: string[];
  timestamp?: Date;
  retry?: boolean;
}

interface ErrorHandlerProps {
  error: ErrorInfo | null;
  displayMode?: ErrorDisplayMode;
  onClose?: () => void;
  onRetry?: () => void;
  autoHideDuration?: number;
  children?: ReactNode;
}

// 错误图标映射
const errorIcons = {
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
  success: SuccessIcon,
};

// 错误消息模板
export const errorMessages = {
  // 网络错误
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  CONNECTION_TIMEOUT: '连接超时，请稍后重试',
  SERVER_ERROR: '服务器错误，请稍后重试',

  // 数据错误
  INVALID_DATA: '数据格式不正确',
  MISSING_REQUIRED_FIELD: '缺少必填字段',
  VALIDATION_FAILED: '数据验证失败',

  // 操作错误
  SAVE_FAILED: '保存失败，请重试',
  LOAD_FAILED: '加载失败，请刷新页面',
  DELETE_FAILED: '删除失败，请重试',
  UPDATE_FAILED: '更新失败，请重试',

  // 权限错误
  ACCESS_DENIED: '权限不足，无法执行此操作',
  LOGIN_REQUIRED: '请先登录',

  // 通用错误
  UNKNOWN_ERROR: '未知错误，请联系支持人员',
  OPERATION_CANCELLED: '操作已取消',
};

/**
 * 内联错误显示组件
 */
const InlineError: React.FC<{ error: ErrorInfo; onRetry?: () => void }> = ({ error, onRetry }) => {
  const IconComponent = errorIcons[error.type];

  return (
    <Alert
      severity={error.type}
      icon={<IconComponent />}
      action={
        error.retry && onRetry ? (
          <Button color='inherit' size='small' onClick={onRetry} startIcon={<RetryIcon />}>
            重试
          </Button>
        ) : undefined
      }
    >
      {error.title && <AlertTitle>{error.title}</AlertTitle>}
      <Typography variant='body2'>{error.message}</Typography>
      {error.details && error.details.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant='caption' component='div'>
            详细信息：
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {error.details.map((detail, index) => (
              <li key={index}>
                <Typography variant='caption'>{detail}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
      {error.timestamp && (
        <Typography variant='caption' sx={{ mt: 1, display: 'block' }}>
          时间：{error.timestamp.toLocaleString()}
        </Typography>
      )}
    </Alert>
  );
};

/**
 * Snackbar错误显示组件
 */
const SnackbarError: React.FC<{
  error: ErrorInfo;
  open: boolean;
  onClose?: () => void;
  autoHideDuration?: number;
}> = ({ error, open, onClose, autoHideDuration = 6000 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={error.type} onClose={onClose} sx={{ width: '100%' }}>
        {error.title && <AlertTitle>{error.title}</AlertTitle>}
        {error.message}
      </Alert>
    </Snackbar>
  );
};

/**
 * 主错误处理组件
 */
export const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  error,
  displayMode = 'inline',
  onClose,
  onRetry,
  autoHideDuration,
  children,
}) => {
  if (!error) {
    return <>{children}</>;
  }

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  switch (displayMode) {
    case 'snackbar':
      return (
        <>
          {children}
          <SnackbarError
            error={error}
            open={true}
            onClose={handleClose}
            autoHideDuration={autoHideDuration}
          />
        </>
      );

    case 'inline':
    default:
      return (
        <>
          <InlineError error={error} onRetry={onRetry} />
          {children}
        </>
      );
  }
};

/**
 * 创建错误信息的工具函数
 */
export const createError = (
  type: ErrorType,
  message: string,
  options?: {
    title?: string;
    details?: string[];
    retry?: boolean;
  }
): ErrorInfo => ({
  type,
  message,
  title: options?.title,
  details: options?.details,
  retry: options?.retry,
  timestamp: new Date(),
});

/**
 * 常用错误创建函数
 */
export const createValidationError = (fieldErrors: string[], title = '表单验证失败'): ErrorInfo =>
  createError('error', '请修正以下错误后重试', {
    title,
    details: fieldErrors,
  });

export const createNetworkError = (message = errorMessages.NETWORK_ERROR): ErrorInfo =>
  createError('error', message, {
    title: '网络错误',
    retry: true,
  });

export const createSaveError = (message = errorMessages.SAVE_FAILED): ErrorInfo =>
  createError('error', message, {
    title: '保存失败',
    retry: true,
  });

export const createLoadError = (message = errorMessages.LOAD_FAILED): ErrorInfo =>
  createError('error', message, {
    title: '加载失败',
    retry: true,
  });

export const createSuccessMessage = (message: string, title = '操作成功'): ErrorInfo =>
  createError('success', message, { title });

/**
 * 错误边界包装组件
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: createError('error', '组件渲染错误', {
        title: '应用错误',
        details: [error.message],
        retry: true,
      }),
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        this.props.fallback || (
          <Box sx={{ p: 2 }}>
            <Paper sx={{ p: 2 }}>
              <ErrorHandler error={this.state.error} onRetry={this.handleRetry} />
            </Paper>
          </Box>
        )
      );
    }

    return this.props.children;
  }
}
