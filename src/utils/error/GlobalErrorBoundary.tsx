/**
 * 全局错误边界组件
 * 捕获并处理React组件树中的错误，提供用户友好的错误界面
 */

import React, { Component, ReactNode, ErrorInfo } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Alert,
  AlertTitle,
  Divider,
} from '@mui/material';
import {
  ErrorOutline as ErrorIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  BugReport as BugReportIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { ErrorLogger } from './ErrorLogger';
import type { SerializedError } from './ErrorLogger';

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
  showDetails: boolean;
  retryAttempts: number;
}

interface GlobalErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void;
  maxRetries?: number;
  enableReporting?: boolean;
  showErrorDetails?: boolean;
}

class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
  private retryTimeouts: NodeJS.Timeout[] = [];

  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      showDetails: false,
      retryAttempts: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<GlobalErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const errorId = ErrorLogger.logError(error, {
      context: 'React Error Boundary',
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });

    this.setState({
      errorInfo,
      errorId,
    });

    // 调用外部错误处理器
    this.props.onError?.(error, errorInfo, errorId);

    // 在开发环境中打印详细错误信息
    if (process.env.NODE_ENV === 'development') {
      console.group('🔴 React Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Error ID:', errorId);
      console.groupEnd();
    }
  }

  componentWillUnmount(): void {
    // 清理所有重试定时器
    this.retryTimeouts.forEach(timeout => clearTimeout(timeout));
  }

  private handleRetry = (): void => {
    const { maxRetries = 3 } = this.props;
    const { retryAttempts } = this.state;

    if (retryAttempts >= maxRetries) {
      return;
    }

    this.setState(prevState => ({
      retryAttempts: prevState.retryAttempts + 1,
    }));

    // 延迟重试，给系统时间恢复
    const retryDelay = Math.min(1000 * Math.pow(2, retryAttempts), 10000);
    const timeout = setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: null,
      });
    }, retryDelay);

    this.retryTimeouts.push(timeout);
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  private handleGoHome = (): void => {
    // 清除错误状态并导航到首页
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryAttempts: 0,
    });

    // 如果有路由器，使用路由器导航
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      window.location.href = '/';
    }
  };

  private handleToggleDetails = (): void => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails,
    }));
  };

  private handleReportBug = (): void => {
    const { error, errorInfo, errorId } = this.state;
    if (!error || !errorId) return;

    const reportData = {
      errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // 在实际应用中，这里会发送错误报告到服务器
    console.log('Error Report Data:', reportData);

    // 模拟发送报告
    alert('错误报告已发送，感谢您的反馈！');
  };

  private getErrorSeverity(): 'low' | 'medium' | 'high' {
    const { error } = this.state;
    if (!error) return 'low';

    // 根据错误类型判断严重程度
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      return 'medium'; // 资源加载错误
    }

    if (error.message.includes('Network') || error.message.includes('fetch')) {
      return 'medium'; // 网络错误
    }

    if (
      error.message.includes('Cannot read property') ||
      error.message.includes('is not defined')
    ) {
      return 'high'; // 运行时错误
    }

    return 'medium';
  }

  private getErrorMessage(): { title: string; description: string; suggestion: string } {
    const { error } = this.state;
    const severity = this.getErrorSeverity();

    if (!error) {
      return {
        title: '未知错误',
        description: '发生了一个未知错误',
        suggestion: '请尝试刷新页面或联系技术支持',
      };
    }

    // 根据错误类型提供用户友好的消息
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      return {
        title: '资源加载失败',
        description: '应用程序的某些资源无法正确加载',
        suggestion: '这通常是临时网络问题，请尝试刷新页面',
      };
    }

    if (error.message.includes('Network') || error.message.includes('fetch')) {
      return {
        title: '网络连接问题',
        description: '无法连接到服务器或网络不稳定',
        suggestion: '请检查您的网络连接，然后重试',
      };
    }

    return {
      title: severity === 'high' ? '应用程序错误' : '操作失败',
      description:
        severity === 'high' ? '应用程序遇到了意外错误，可能影响正常功能' : '当前操作未能成功完成',
      suggestion: severity === 'high' ? '建议刷新页面或重启应用程序' : '请稍后重试，或尝试其他操作',
    };
  }

  render(): ReactNode {
    const {
      children,
      fallback,
      maxRetries = 3,
      enableReporting = true,
      showErrorDetails = false,
    } = this.props;
    const { hasError, error, errorInfo, errorId, showDetails, retryAttempts } = this.state;

    if (!hasError) {
      return children;
    }

    // 如果提供了自定义 fallback，使用它
    if (fallback) {
      return fallback;
    }

    const { title, description, suggestion } = this.getErrorMessage();
    const severity = this.getErrorSeverity();
    const canRetry = retryAttempts < maxRetries;

    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: '100%',
            boxShadow: severity === 'high' ? 4 : 2,
          }}
        >
          <CardContent>
            {/* 错误图标和标题 */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ErrorIcon
                sx={{
                  fontSize: 48,
                  color: severity === 'high' ? 'error.main' : 'warning.main',
                  mr: 2,
                }}
              />
              <Box>
                <Typography variant='h5' component='h1' gutterBottom>
                  {title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  错误ID: {errorId || 'Unknown'}
                </Typography>
              </Box>
            </Box>

            {/* 错误描述 */}
            <Alert severity={severity === 'high' ? 'error' : 'warning'} sx={{ mb: 3 }}>
              <AlertTitle>发生了什么？</AlertTitle>
              {description}
            </Alert>

            {/* 建议操作 */}
            <Typography variant='body1' sx={{ mb: 2 }}>
              <strong>建议操作：</strong> {suggestion}
            </Typography>

            {/* 重试信息 */}
            {retryAttempts > 0 && (
              <Alert severity='info' sx={{ mb: 2 }}>
                已尝试恢复 {retryAttempts} 次{!canRetry && ' (已达最大重试次数)'}
              </Alert>
            )}

            {/* 错误详情 */}
            {(showErrorDetails || process.env.NODE_ENV === 'development') && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconButton
                    size='small'
                    onClick={this.handleToggleDetails}
                    sx={{
                      transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                  <Typography variant='body2' color='text.secondary'>
                    技术详情
                  </Typography>
                </Box>

                <Collapse in={showDetails}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'grey.50',
                      borderRadius: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                      overflow: 'auto',
                      maxHeight: 300,
                    }}
                  >
                    <Typography variant='caption' color='error' component='div'>
                      <strong>Error:</strong> {error?.message}
                    </Typography>
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      component='div'
                      sx={{ mt: 1 }}
                    >
                      <strong>Stack:</strong>
                    </Typography>
                    <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: 'inherit' }}>
                      {error?.stack}
                    </pre>
                    {errorInfo?.componentStack && (
                      <>
                        <Typography
                          variant='caption'
                          color='text.secondary'
                          component='div'
                          sx={{ mt: 1 }}
                        >
                          <strong>Component Stack:</strong>
                        </Typography>
                        <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: 'inherit' }}>
                          {errorInfo.componentStack}
                        </pre>
                      </>
                    )}
                  </Box>
                </Collapse>
              </>
            )}
          </CardContent>

          <Divider />

          <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
            <Box>
              {canRetry && (
                <Button
                  variant='contained'
                  startIcon={<RefreshIcon />}
                  onClick={this.handleRetry}
                  sx={{ mr: 1 }}
                >
                  重试 ({maxRetries - retryAttempts} 次机会)
                </Button>
              )}

              <Button
                variant='outlined'
                startIcon={<HomeIcon />}
                onClick={this.handleGoHome}
                sx={{ mr: 1 }}
              >
                返回首页
              </Button>

              <Button variant='outlined' startIcon={<RefreshIcon />} onClick={this.handleReload}>
                刷新页面
              </Button>
            </Box>

            {enableReporting && (
              <Button
                size='small'
                startIcon={<BugReportIcon />}
                onClick={this.handleReportBug}
                color='inherit'
              >
                报告错误
              </Button>
            )}
          </CardActions>
        </Card>
      </Box>
    );
  }
}

export default GlobalErrorBoundary;
