/**
 * 性能监控工具
 * 监控渲染性能、内存使用和操作延迟
 */
// @ts-nocheck


import React from 'react';

export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  operationTime: number;
  timestamp: number;
  component?: string;
  operation?: string;
}

export interface PerformanceThresholds {
  renderTime: number; // 毫秒
  memoryUsage: number; // MB
  operationTime: number; // 毫秒
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private timers: Map<string, number> = new Map();
  private observers: Array<(metric: PerformanceMetrics) => void> = [];
  private thresholds: PerformanceThresholds = {
    renderTime: 16, // 60fps 的理想渲染时间
    memoryUsage: 100, // 100MB 内存警告线
    operationTime: 100, // 100ms 操作延迟警告线
  };

  /**
   * 设置性能阈值
   */
  setThresholds(thresholds: Partial<PerformanceThresholds>): void {
    this.thresholds = { ...this.thresholds, ...thresholds };
  }

  /**
   * 订阅性能指标
   */
  subscribe(observer: (metric: PerformanceMetrics) => void): () => void {
    this.observers.push(observer);
    return () => {
      const index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  /**
   * 开始计时
   */
  startTimer(key: string): void {
    this.timers.set(key, performance.now());
  }

  /**
   * 结束计时并记录指标
   */
  endTimer(
    key: string,
    type: 'render' | 'operation' = 'operation',
    meta?: { component?: string; operation?: string }
  ): number {
    const startTime = this.timers.get(key);
    if (!startTime) {
      console.warn(`Performance timer '${key}' was not found`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(key);

    const metric: PerformanceMetrics = {
      renderTime: type === 'render' ? duration : 0,
      memoryUsage: this.getMemoryUsage(),
      operationTime: type === 'operation' ? duration : 0,
      timestamp: Date.now(),
      component: meta?.component,
      operation: meta?.operation,
    };

    this.recordMetric(metric);
    return duration;
  }

  /**
   * 记录性能指标
   */
  recordMetric(metric: PerformanceMetrics): void {
    this.metrics.push(metric);

    // 保持最近的1000条记录
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // 检查性能阈值
    this.checkThresholds(metric);

    // 通知观察者
    this.observers.forEach(observer => observer(metric));
  }

  /**
   * 获取内存使用情况
   */
  private getMemoryUsage(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return Math.round(memory.usedJSHeapSize / 1024 / 1024); // 转换为 MB
    }
    return 0;
  }

  /**
   * 检查性能阈值
   */
  private checkThresholds(metric: PerformanceMetrics): void {
    const warnings: string[] = [];

    if (metric.renderTime > this.thresholds.renderTime) {
      warnings.push(
        `Render time exceeded threshold: ${metric.renderTime}ms > ${this.thresholds.renderTime}ms`
      );
    }

    if (metric.memoryUsage > this.thresholds.memoryUsage) {
      warnings.push(
        `Memory usage exceeded threshold: ${metric.memoryUsage}MB > ${this.thresholds.memoryUsage}MB`
      );
    }

    if (metric.operationTime > this.thresholds.operationTime) {
      warnings.push(
        `Operation time exceeded threshold: ${metric.operationTime}ms > ${this.thresholds.operationTime}ms`
      );
    }

    if (warnings.length > 0) {
      console.warn('Performance Warning:', warnings.join(', '), metric);
    }
  }

  /**
   * 获取性能统计
   */
  getStats(timeWindow: number = 60000): {
    avgRenderTime: number;
    maxRenderTime: number;
    avgMemoryUsage: number;
    maxMemoryUsage: number;
    avgOperationTime: number;
    maxOperationTime: number;
    totalMetrics: number;
  } {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(metric => now - metric.timestamp <= timeWindow);

    if (recentMetrics.length === 0) {
      return {
        avgRenderTime: 0,
        maxRenderTime: 0,
        avgMemoryUsage: 0,
        maxMemoryUsage: 0,
        avgOperationTime: 0,
        maxOperationTime: 0,
        totalMetrics: 0,
      };
    }

    const renderTimes = recentMetrics.map(m => m.renderTime).filter(t => t > 0);
    const memoryUsages = recentMetrics.map(m => m.memoryUsage).filter(m => m > 0);
    const operationTimes = recentMetrics.map(m => m.operationTime).filter(t => t > 0);

    return {
      avgRenderTime:
        renderTimes.length > 0 ? renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length : 0,
      maxRenderTime: renderTimes.length > 0 ? Math.max(...renderTimes) : 0,
      avgMemoryUsage:
        memoryUsages.length > 0 ? memoryUsages.reduce((a, b) => a + b, 0) / memoryUsages.length : 0,
      maxMemoryUsage: memoryUsages.length > 0 ? Math.max(...memoryUsages) : 0,
      avgOperationTime:
        operationTimes.length > 0
          ? operationTimes.reduce((a, b) => a + b, 0) / operationTimes.length
          : 0,
      maxOperationTime: operationTimes.length > 0 ? Math.max(...operationTimes) : 0,
      totalMetrics: recentMetrics.length,
    };
  }

  /**
   * 清除所有指标
   */
  clear(): void {
    this.metrics = [];
    this.timers.clear();
  }

  /**
   * 获取所有指标
   */
  getAllMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }
}

// 全局性能监控实例
export const performanceMonitor = new PerformanceMonitor();

/**
 * 性能监控装饰器
 */
export function performanceTrack(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const key = `${target.constructor.name}.${propertyKey}`;
    performanceMonitor.startTimer(key);

    try {
      const result = originalMethod.apply(this, args);

      // 处理异步方法
      if (result instanceof Promise) {
        return result.finally(() => {
          performanceMonitor.endTimer(key, 'operation', {
            component: target.constructor.name,
            operation: propertyKey,
          });
        });
      }

      performanceMonitor.endTimer(key, 'operation', {
        component: target.constructor.name,
        operation: propertyKey,
      });

      return result;
    } catch (error) {
      performanceMonitor.endTimer(key, 'operation', {
        component: target.constructor.name,
        operation: propertyKey,
      });
      throw error;
    }
  };

  return descriptor;
}

/**
 * React 组件性能监控 Hook
 */
export function usePerformanceMonitor(componentName: string) {
  React.useEffect(() => {
    const renderKey = `${componentName}.render`;
    performanceMonitor.startTimer(renderKey);

    return () => {
      performanceMonitor.endTimer(renderKey, 'render', {
        component: componentName,
      });
    };
  });

  const measureOperation = React.useCallback(
    (operationName: string, operation: () => void | Promise<void>) => {
      const key = `${componentName}.${operationName}`;
      performanceMonitor.startTimer(key);

      try {
        const result = operation();

        if (result instanceof Promise) {
          return result.finally(() => {
            performanceMonitor.endTimer(key, 'operation', {
              component: componentName,
              operation: operationName,
            });
          });
        }

        performanceMonitor.endTimer(key, 'operation', {
          component: componentName,
          operation: operationName,
        });

        return result;
      } catch (error) {
        performanceMonitor.endTimer(key, 'operation', {
          component: componentName,
          operation: operationName,
        });
        throw error;
      }
    },
    [componentName]
  );

  const startOperation = React.useCallback(
    (operationName: string) => {
      const key = `${componentName}.${operationName}`;
      performanceMonitor.startTimer(key);
    },
    [componentName]
  );

  const endOperation = React.useCallback(
    (operationName: string) => {
      const key = `${componentName}.${operationName}`;
      performanceMonitor.endTimer(key, 'operation', {
        component: componentName,
        operation: operationName,
      });
    },
    [componentName]
  );

  return {
    measureOperation,
    startOperation,
    endOperation,
  };
}
