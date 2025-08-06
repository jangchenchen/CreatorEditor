/**
 * 错误日志记录系统
 * 收集、格式化和存储应用程序错误，提供错误分析功能
 */
// @ts-nocheck


export interface SerializedError {
  id: string;
  message: string;
  name: string;
  stack?: string;
  timestamp: string;
  level: ErrorLevel;
  context?: Record<string, any>;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId: string;
}

export type ErrorLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorContext {
  context?: string;
  operation?: string;
  componentStack?: string;
  timestamp?: string;
  userAgent?: string;
  url?: string;
  userId?: string;
  [key: string]: any;
}

export interface ErrorStats {
  totalErrors: number;
  errorsByLevel: Record<ErrorLevel, number>;
  errorsByType: Record<string, number>;
  recentErrors: number;
  topErrors: Array<{ message: string; count: number; level: ErrorLevel }>;
}

class ErrorLoggerService {
  private errors: SerializedError[] = [];
  private maxErrors = 1000;
  private sessionId: string;
  private errorCounts = new Map<string, number>();

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeGlobalErrorHandlers();
  }

  /**
   * 记录错误
   */
  logError(error: Error | string, context?: ErrorContext): string {
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    const errorId = this.generateErrorId();

    const serializedError: SerializedError = {
      id: errorId,
      message: errorObj.message,
      name: errorObj.name,
      stack: errorObj.stack,
      timestamp: new Date().toISOString(),
      level: this.determineErrorLevel(errorObj, context),
      context: context || {},
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: context?.userId,
      sessionId: this.sessionId,
    };

    this.addError(serializedError);
    this.updateErrorCounts(serializedError);

    // 根据错误级别决定是否立即报告
    if (serializedError.level === 'critical') {
      this.reportCriticalError(serializedError);
    }

    return errorId;
  }

  /**
   * 记录网络错误
   */
  logNetworkError(url: string, status: number, statusText: string, context?: ErrorContext): string {
    const error = new Error(`Network Error: ${status} ${statusText} for ${url}`);
    error.name = 'NetworkError';

    return this.logError(error, {
      ...context,
      context: 'Network Request',
      requestUrl: url,
      status,
      statusText,
    });
  }

  /**
   * 记录Promise拒绝错误
   */
  logPromiseRejection(reason: any, promise: Promise<any>, context?: ErrorContext): string {
    const error =
      reason instanceof Error
        ? reason
        : new Error(`Unhandled Promise Rejection: ${String(reason)}`);
    error.name = 'PromiseRejectionError';

    return this.logError(error, {
      ...context,
      context: 'Unhandled Promise Rejection',
      rejectionReason: String(reason),
    });
  }

  /**
   * 记录性能相关错误
   */
  logPerformanceError(
    message: string,
    metrics: Record<string, number>,
    context?: ErrorContext
  ): string {
    const error = new Error(`Performance Issue: ${message}`);
    error.name = 'PerformanceError';

    return this.logError(error, {
      ...context,
      context: 'Performance Monitoring',
      metrics,
    });
  }

  /**
   * 记录用户操作错误
   */
  logUserActionError(action: string, error: Error, context?: ErrorContext): string {
    return this.logError(error, {
      ...context,
      context: 'User Action',
      action,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * 获取所有错误
   */
  getErrors(filter?: {
    level?: ErrorLevel[];
    timeRange?: { start: Date; end: Date };
    limit?: number;
    context?: string;
  }): SerializedError[] {
    let filteredErrors = [...this.errors];

    if (filter) {
      // 按级别筛选
      if (filter.level && filter.level.length > 0) {
        filteredErrors = filteredErrors.filter(error => filter.level!.includes(error.level));
      }

      // 按时间范围筛选
      if (filter.timeRange) {
        const { start, end } = filter.timeRange;
        filteredErrors = filteredErrors.filter(error => {
          const errorTime = new Date(error.timestamp);
          return errorTime >= start && errorTime <= end;
        });
      }

      // 按上下文筛选
      if (filter.context) {
        filteredErrors = filteredErrors.filter(error => error.context?.context === filter.context);
      }

      // 限制数量
      if (filter.limit) {
        filteredErrors = filteredErrors.slice(-filter.limit);
      }
    }

    return filteredErrors.reverse(); // 最新的在前面
  }

  /**
   * 获取错误统计信息
   */
  getErrorStats(timeWindow: number = 3600000): ErrorStats {
    const now = new Date();
    const windowStart = new Date(now.getTime() - timeWindow);

    const recentErrors = this.errors.filter(error => new Date(error.timestamp) >= windowStart);

    const errorsByLevel: Record<ErrorLevel, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    };

    const errorsByType: Record<string, number> = {};

    recentErrors.forEach(error => {
      errorsByLevel[error.level]++;
      errorsByType[error.name] = (errorsByType[error.name] || 0) + 1;
    });

    // 获取最常见的错误
    const topErrors = Array.from(this.errorCounts.entries())
      .map(([message, count]) => {
        const error = this.errors.find(e => e.message === message);
        return {
          message,
          count,
          level: error?.level || ('medium' as ErrorLevel),
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalErrors: this.errors.length,
      errorsByLevel,
      errorsByType,
      recentErrors: recentErrors.length,
      topErrors,
    };
  }

  /**
   * 清除所有错误日志
   */
  clearErrors(): void {
    this.errors = [];
    this.errorCounts.clear();
  }

  /**
   * 导出错误日志
   */
  exportErrors(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      return this.exportAsCSV();
    }

    return JSON.stringify(this.errors, null, 2);
  }

  /**
   * 添加错误到存储
   */
  private addError(error: SerializedError): void {
    this.errors.push(error);

    // 保持错误数量在限制内
    if (this.errors.length > this.maxErrors) {
      const removed = this.errors.splice(0, this.errors.length - this.maxErrors);
      // 更新计数
      removed.forEach(removedError => {
        const count = this.errorCounts.get(removedError.message);
        if (count && count > 1) {
          this.errorCounts.set(removedError.message, count - 1);
        } else {
          this.errorCounts.delete(removedError.message);
        }
      });
    }

    // 尝试持久化到本地存储
    this.persistToStorage();
  }

  /**
   * 更新错误计数
   */
  private updateErrorCounts(error: SerializedError): void {
    const count = this.errorCounts.get(error.message) || 0;
    this.errorCounts.set(error.message, count + 1);
  }

  /**
   * 确定错误级别
   */
  private determineErrorLevel(error: Error, context?: ErrorContext): ErrorLevel {
    // 根据错误类型和上下文判断级别
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      return 'medium';
    }

    if (error.name === 'NetworkError' || error.message.includes('Network')) {
      return 'medium';
    }

    if (error.name === 'PermissionError' || error.message.includes('Permission')) {
      return 'high';
    }

    if (error.name === 'SecurityError' || error.message.includes('Security')) {
      return 'critical';
    }

    if (
      error.message.includes('Cannot read property') ||
      error.message.includes('is not defined') ||
      error.message.includes('is not a function')
    ) {
      return 'high';
    }

    // 根据上下文判断
    if (context?.context === 'React Error Boundary') {
      return 'high';
    }

    if (context?.context === 'Performance Monitoring') {
      return 'medium';
    }

    return 'medium';
  }

  /**
   * 报告严重错误
   */
  private reportCriticalError(error: SerializedError): void {
    // 在实际应用中，这里会发送到错误监控服务
    console.error('🚨 CRITICAL ERROR:', error);

    // 可以集成第三方服务如 Sentry, LogRocket 等
    if (window.Sentry) {
      window.Sentry.captureException(new Error(error.message), {
        contexts: {
          errorLogger: {
            errorId: error.id,
            level: error.level,
            sessionId: error.sessionId,
          },
        },
        extra: error.context,
      });
    }
  }

  /**
   * 初始化全局错误处理器
   */
  private initializeGlobalErrorHandlers(): void {
    // 捕获未处理的JavaScript错误
    window.addEventListener('error', event => {
      this.logError(event.error || new Error(event.message), {
        context: 'Global Error Handler',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // 捕获未处理的Promise拒绝
    window.addEventListener('unhandledrejection', event => {
      this.logPromiseRejection(event.reason, event.promise);
    });

    // 捕获资源加载错误
    window.addEventListener(
      'error',
      event => {
        if (event.target !== window) {
          this.logError(
            new Error(`Resource load error: ${(event.target as any)?.src || 'unknown'}`),
            {
              context: 'Resource Load Error',
              element: event.target?.nodeName,
              src: (event.target as any)?.src,
            }
          );
        }
      },
      true
    );
  }

  /**
   * 持久化错误到本地存储
   */
  private persistToStorage(): void {
    try {
      const recentErrors = this.errors.slice(-100); // 只保存最近100个错误
      localStorage.setItem('errorLogs', JSON.stringify(recentErrors));
    } catch (error) {
      // 忽略存储错误，避免无限循环
    }
  }

  /**
   * 从本地存储恢复错误日志
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('errorLogs');
      if (stored) {
        const errors = JSON.parse(stored) as SerializedError[];
        this.errors = errors;

        // 重建错误计数
        errors.forEach(error => {
          this.updateErrorCounts(error);
        });
      }
    } catch (error) {
      // 忽略加载错误
    }
  }

  /**
   * 导出为CSV格式
   */
  private exportAsCSV(): string {
    const headers = ['ID', 'Timestamp', 'Level', 'Name', 'Message', 'URL', 'User Agent'];
    const rows = [headers.join(',')];

    this.errors.forEach(error => {
      const row = [
        error.id,
        error.timestamp,
        error.level,
        error.name,
        `"${error.message.replace(/"/g, '""')}"`,
        error.url,
        `"${error.userAgent}"`,
      ];
      rows.push(row.join(','));
    });

    return rows.join('\n');
  }

  /**
   * 生成错误ID
   */
  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 生成会话ID
   */
  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// 全局错误记录器实例
export const ErrorLogger = new ErrorLoggerService();

// 全局可访问
(window as any).ErrorLogger = ErrorLogger;

export default ErrorLoggerService;
