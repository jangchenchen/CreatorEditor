/**
 * Redux选择器性能监控工具
 * 用于开发环境监控选择器性能和缓存效率
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  LinearProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Assessment as AssessmentIcon } from '@mui/icons-material';

// 选择器性能数据类型
interface SelectorPerformanceData {
  name: string;
  callCount: number;
  totalTime: number;
  averageTime: number;
  lastCallTime: number;
  cacheHits: number;
  cacheMisses: number;
  cacheEfficiency: number;
  memoryUsage?: number;
  dataSize?: {
    inputSize: number;
    outputSize: number;
  };
}

// 性能监控器类
class SelectorPerformanceTracker {
  private static instance: SelectorPerformanceTracker;
  private metrics: Map<string, SelectorPerformanceData> = new Map();
  private isEnabled = process.env.NODE_ENV === 'development';
  
  static getInstance(): SelectorPerformanceTracker {
    if (!this.instance) {
      this.instance = new SelectorPerformanceTracker();
    }
    return this.instance;
  }
  
  // 包装选择器以进行性能监控
  wrapSelector<TState, TResult>(
    selector: (state: TState) => TResult,
    name: string
  ): (state: TState) => TResult {
    if (!this.isEnabled) {
      return selector;
    }
    
    let lastResult: TResult;
    let lastState: TState;
    
    return (state: TState): TResult => {
      const startTime = performance.now();
      const startMemory = (performance as any).memory?.usedJSHeapSize || 0;
      
      // 检查是否可以使用缓存（简单的引用比较）
      const canUseCache = lastState === state;
      let result: TResult;
      let cacheHit = false;
      
      if (canUseCache && lastResult !== undefined) {
        result = lastResult;
        cacheHit = true;
      } else {
        result = selector(state);
        lastResult = result;
        lastState = state;
      }
      
      const endTime = performance.now();
      const endMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const duration = endTime - startTime;
      
      this.recordMetrics(name, duration, cacheHit, endMemory - startMemory, state, result);
      
      return result;
    };
  }
  
  private recordMetrics<TState, TResult>(
    name: string,
    duration: number,
    cacheHit: boolean,
    memoryDelta: number,
    state: TState,
    result: TResult
  ) {
    const existing = this.metrics.get(name) || {
      name,
      callCount: 0,
      totalTime: 0,
      averageTime: 0,
      lastCallTime: 0,
      cacheHits: 0,
      cacheMisses: 0,
      cacheEfficiency: 0,
      memoryUsage: 0,
    };
    
    existing.callCount++;
    existing.totalTime += duration;
    existing.averageTime = existing.totalTime / existing.callCount;
    existing.lastCallTime = duration;
    existing.memoryUsage = (existing.memoryUsage || 0) + memoryDelta;
    
    if (cacheHit) {
      existing.cacheHits++;
    } else {
      existing.cacheMisses++;
    }
    
    existing.cacheEfficiency = existing.callCount > 0 
      ? (existing.cacheHits / existing.callCount) * 100 
      : 0;
    
    // 尝试估算数据大小
    try {
      existing.dataSize = {
        inputSize: JSON.stringify(state).length,
        outputSize: JSON.stringify(result).length,
      };
    } catch (e) {
      // 如果无法序列化，忽略数据大小统计
    }
    
    this.metrics.set(name, existing);
  }
  
  // 获取所有性能指标
  getMetrics(): SelectorPerformanceData[] {
    return Array.from(this.metrics.values()).sort((a, b) => b.totalTime - a.totalTime);
  }
  
  // 重置指标
  reset() {
    this.metrics.clear();
  }
  
  // 获取性能摘要
  getSummary() {
    const metrics = this.getMetrics();
    const totalCalls = metrics.reduce((sum, m) => sum + m.callCount, 0);
    const totalTime = metrics.reduce((sum, m) => sum + m.totalTime, 0);
    const averageCacheEfficiency = metrics.length > 0 
      ? metrics.reduce((sum, m) => sum + m.cacheEfficiency, 0) / metrics.length 
      : 0;
    
    return {
      totalSelectors: metrics.length,
      totalCalls,
      totalTime,
      averageTime: totalCalls > 0 ? totalTime / totalCalls : 0,
      averageCacheEfficiency,
      slowestSelector: metrics[0]?.name || null,
      fastestSelector: metrics[metrics.length - 1]?.name || null,
    };
  }
}

// 性能监控Hook
export const useSelectorPerformanceMonitoring = () => {
  const tracker = SelectorPerformanceTracker.getInstance();
  
  const wrapSelector = useCallback(
    <TState, TResult>(selector: (state: TState) => TResult, name: string) =>
      tracker.wrapSelector(selector, name),
    []
  );
  
  const getMetrics = useCallback(() => tracker.getMetrics(), []);
  const getSummary = useCallback(() => tracker.getSummary(), []);
  const reset = useCallback(() => tracker.reset(), []);
  
  return {
    wrapSelector,
    getMetrics,
    getSummary,
    reset,
  };
};

// 性能监控面板组件
interface SelectorPerformancePanelProps {
  open: boolean;
  onClose: () => void;
}

export const SelectorPerformancePanel: React.FC<SelectorPerformancePanelProps> = ({
  open,
  onClose,
}) => {
  const { getMetrics, getSummary, reset } = useSelectorPerformanceMonitoring();
  const [metrics, setMetrics] = useState<SelectorPerformanceData[]>([]);
  const [summary, setSummary] = useState<ReturnType<typeof getSummary>>();
  const [refreshKey, setRefreshKey] = useState(0);
  
  const refreshData = useCallback(() => {
    setMetrics(getMetrics());
    setSummary(getSummary());
    setRefreshKey(prev => prev + 1);
  }, [getMetrics, getSummary]);
  
  const handleReset = useCallback(() => {
    reset();
    refreshData();
  }, [reset, refreshData]);
  
  // 自动刷新数据
  useEffect(() => {
    if (open) {
      refreshData();
      const interval = setInterval(refreshData, 1000);
      return () => clearInterval(interval);
    }
  }, [open, refreshData]);
  
  // 性能状态判断
  const getPerformanceStatus = (avgTime: number, cacheEfficiency: number) => {
    if (avgTime > 10 || cacheEfficiency < 50) {
      return { color: 'error', label: '需要优化' };
    }
    if (avgTime > 5 || cacheEfficiency < 80) {
      return { color: 'warning', label: '可以改进' };
    }
    return { color: 'success', label: '性能良好' };
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <AssessmentIcon />
          <Typography variant="h6">Redux选择器性能监控</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button size="small" onClick={refreshData}>刷新</Button>
          <Button size="small" onClick={handleReset} color="warning">重置</Button>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        {/* 性能摘要 */}
        {summary && (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">性能摘要</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">{summary.totalSelectors}</Typography>
                    <Typography variant="body2">监控的选择器</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary">{summary.totalCalls}</Typography>
                    <Typography variant="body2">总调用次数</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{summary.averageTime.toFixed(2)}ms</Typography>
                    <Typography variant="body2">平均执行时间</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {summary.averageCacheEfficiency.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2">平均缓存效率</Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              {summary.averageCacheEfficiency < 80 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  缓存效率较低，建议检查选择器是否正确使用了memoization
                </Alert>
              )}
            </AccordionDetails>
          </Accordion>
        )}
        
        {/* 详细性能数据 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">选择器详细性能</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {metrics.length === 0 ? (
              <Alert severity="info">
                暂无性能数据。请与应用交互后刷新数据。
              </Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>选择器名称</TableCell>
                      <TableCell align="center">状态</TableCell>
                      <TableCell align="right">调用次数</TableCell>
                      <TableCell align="right">平均时间 (ms)</TableCell>
                      <TableCell align="right">最后调用 (ms)</TableCell>
                      <TableCell align="right">总时间 (ms)</TableCell>
                      <TableCell align="right">缓存效率</TableCell>
                      <TableCell align="right">内存使用</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metrics.map((metric) => {
                      const status = getPerformanceStatus(metric.averageTime, metric.cacheEfficiency);
                      return (
                        <TableRow key={metric.name}>
                          <TableCell>
                            <Typography variant="body2" fontFamily="monospace">
                              {metric.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={status.label} 
                              color={status.color as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">{metric.callCount}</TableCell>
                          <TableCell align="right">{metric.averageTime.toFixed(2)}</TableCell>
                          <TableCell align="right">{metric.lastCallTime.toFixed(2)}</TableCell>
                          <TableCell align="right">{metric.totalTime.toFixed(2)}</TableCell>
                          <TableCell align="right">
                            <Box display="flex" alignItems="center" gap={1}>
                              <LinearProgress 
                                variant="determinate" 
                                value={metric.cacheEfficiency}
                                sx={{ flexGrow: 1, height: 8 }}
                                color={
                                  metric.cacheEfficiency > 80 ? 'success' :
                                  metric.cacheEfficiency > 50 ? 'warning' : 'error'
                                }
                              />
                              <Typography variant="caption">
                                {metric.cacheEfficiency.toFixed(1)}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            {metric.memoryUsage ? 
                              `${(metric.memoryUsage / 1024).toFixed(1)} KB` : 'N/A'
                            }
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      
      <DialogActions>
        <Typography variant="caption" sx={{ flexGrow: 1 }}>
          刷新间隔: 1秒 | 数据版本: {refreshKey}
        </Typography>
        <Button onClick={onClose}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
};

// 全局监控实例
export const selectorPerformanceTracker = SelectorPerformanceTracker.getInstance();