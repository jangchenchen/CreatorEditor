/**
 * React性能监控组件
 * 提供生产环境性能数据收集和开发环境性能分析
 */
// @ts-nocheck


import React, { Profiler, ProfilerOnRenderCallback } from 'react';

interface PerformanceProfilerProps {
  id: string;
  children: React.ReactNode;
  onRender?: ProfilerOnRenderCallback;
  enableLogging?: boolean;
}

// 性能数据收集器
class PerformanceCollector {
  private static instance: PerformanceCollector;
  private metrics: Map<string, PerformanceEntry[]> = new Map();
  
  static getInstance(): PerformanceCollector {
    if (!this.instance) {
      this.instance = new PerformanceCollector();
    }
    return this.instance;
  }
  
  // 记录渲染性能
  recordRender(id: string, phase: string, actualDuration: number, baseDuration: number) {
    const entry = {
      name: `${id}:${phase}`,
      entryType: 'measure',
      startTime: performance.now(),
      duration: actualDuration,
      detail: {
        actualDuration,
        baseDuration,
        phase,
        componentId: id
      }
    } as PerformanceEntry;
    
    if (!this.metrics.has(id)) {
      this.metrics.set(id, []);
    }
    
    this.metrics.get(id)!.push(entry);
    
    // 开发环境输出警告
    if (process.env.NODE_ENV === 'development') {
      if (actualDuration > 16) { // 超过一帧时间
        console.warn(`🐌 Slow render in ${id}: ${actualDuration.toFixed(2)}ms`);
      }
      
      if (actualDuration > baseDuration * 2) { // 实际时间超过基准时间2倍
        console.warn(`⚠️  Performance regression in ${id}: actual(${actualDuration.toFixed(2)}ms) vs base(${baseDuration.toFixed(2)}ms)`);
      }
    }
  }
  
  // 获取性能报告
  getPerformanceReport(componentId?: string) {
    if (componentId) {
      return this.metrics.get(componentId) || [];
    }
    
    const report: Record<string, any> = {};
    this.metrics.forEach((entries, id) => {
      const totalTime = entries.reduce((sum, entry) => sum + entry.duration, 0);
      const avgTime = totalTime / entries.length;
      const maxTime = Math.max(...entries.map(e => e.duration));
      const minTime = Math.min(...entries.map(e => e.duration));
      
      report[id] = {
        renderCount: entries.length,
        totalTime: parseFloat(totalTime.toFixed(2)),
        averageTime: parseFloat(avgTime.toFixed(2)),
        maxTime: parseFloat(maxTime.toFixed(2)),
        minTime: parseFloat(minTime.toFixed(2)),
        lastRender: entries[entries.length - 1]?.startTime
      };
    });
    
    return report;
  }
  
  // 清除指定组件的性能数据
  clearMetrics(componentId?: string) {
    if (componentId) {
      this.metrics.delete(componentId);
    } else {
      this.metrics.clear();
    }
  }
}

// 默认的渲染回调
const defaultOnRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
  PerformanceCollector.getInstance().recordRender(id, phase, actualDuration, baseDuration);
  
  // 开发环境详细日志
  if (process.env.NODE_ENV === 'development') {
    const isSlowRender = actualDuration > 16;
    const logLevel = isSlowRender ? 'warn' : 'log';
    
    console[logLevel](`🔍 Profiler [${id}]:`, {
      phase,
      actualDuration: `${actualDuration.toFixed(2)}ms`,
      baseDuration: `${baseDuration.toFixed(2)}ms`,
      startTime: `${startTime.toFixed(2)}ms`,
      commitTime: `${commitTime.toFixed(2)}ms`,
      interactions: interactions.size
    });
  }
};

// 性能监控组件
const PerformanceProfiler: React.FC<PerformanceProfilerProps> = ({
  id,
  children,
  onRender = defaultOnRender,
  enableLogging = process.env.NODE_ENV === 'development'
}) => {
  // 生产环境可以禁用Profiler
  if (process.env.NODE_ENV === 'production' && !enableLogging) {
    return <>{children}</>;
  }
  
  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
};

// 性能监控Hook
export const usePerformanceMetrics = (componentId?: string) => {
  const collector = PerformanceCollector.getInstance();
  
  const getMetrics = React.useCallback(() => {
    return collector.getPerformanceReport(componentId);
  }, [componentId]);
  
  const clearMetrics = React.useCallback(() => {
    collector.clearMetrics(componentId);
  }, [componentId]);
  
  // 在组件卸载时清理数据（可选）
  React.useEffect(() => {
    return () => {
      if (componentId) {
        collector.clearMetrics(componentId);
      }
    };
  }, [componentId]);
  
  return {
    getMetrics,
    clearMetrics,
    collector
  };
};

// 导出全局性能监控实例
export const performanceCollector = PerformanceCollector.getInstance();

export default PerformanceProfiler;