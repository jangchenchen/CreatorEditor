/**
 * 性能监控仪表板
 * 开发环境下显示实时性能数据
 */

import React, { useState, useEffect } from 'react';
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
  Tab,
  Tabs,
  Alert,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Refresh as RefreshIcon,
  Clear as ClearIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { performanceCollector } from './PerformanceProfiler';

interface PerformanceDashboardProps {
  open: boolean;
  onClose: () => void;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  open,
  onClose,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [performanceData, setPerformanceData] = useState<Record<string, any>>({});
  const [refreshKey, setRefreshKey] = useState(0);

  // 刷新性能数据
  const refreshData = () => {
    const data = performanceCollector.getPerformanceReport();
    setPerformanceData(data);
    setRefreshKey(prev => prev + 1);
  };

  // 清除所有性能数据
  const clearAllData = () => {
    performanceCollector.clearMetrics();
    setPerformanceData({});
  };

  // 自动刷新数据
  useEffect(() => {
    if (open) {
      refreshData();
      const interval = setInterval(refreshData, 2000); // 每2秒刷新
      return () => clearInterval(interval);
    }
  }, [open]);

  // 获取性能状态
  const getPerformanceStatus = (avgTime: number) => {
    if (avgTime < 5) return { status: 'excellent', color: 'success', icon: CheckCircleIcon };
    if (avgTime < 16) return { status: 'good', color: 'primary', icon: CheckCircleIcon };
    if (avgTime < 30) return { status: 'warning', color: 'warning', icon: WarningIcon };
    return { status: 'poor', color: 'error', icon: WarningIcon };
  };

  // 性能建议
  const getPerformanceAdvice = (componentData: any) => {
    const { averageTime, maxTime, renderCount } = componentData;
    const advice = [];

    if (averageTime > 16) {
      advice.push('Consider memoizing this component with React.memo()');
    }
    
    if (maxTime > 50) {
      advice.push('Large render times detected - check for expensive calculations');
    }
    
    if (renderCount > 100) {
      advice.push('High render frequency - check for unnecessary re-renders');
    }
    
    if (maxTime > averageTime * 3) {
      advice.push('Inconsistent performance - check for conditional heavy operations');
    }

    return advice;
  };

  const sortedComponents = Object.entries(performanceData).sort(
    ([, a], [, b]) => (b as any).averageTime - (a as any).averageTime
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { height: '80vh' }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <SpeedIcon />
          <Typography variant="h6">性能监控仪表板</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="刷新数据">
            <IconButton onClick={refreshData} size="small">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="清除所有数据">
            <IconButton onClick={clearAllData} size="small">
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)}>
          <Tab label="组件性能" />
          <Tab label="性能建议" />
          <Tab label="系统信息" />
        </Tabs>

        {/* 组件性能表格 */}
        {tabValue === 0 && (
          <Box mt={2}>
            {sortedComponents.length === 0 ? (
              <Alert severity="info">
                暂无性能数据。请与应用交互后刷新数据。
              </Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>组件ID</TableCell>
                      <TableCell align="center">状态</TableCell>
                      <TableCell align="right">渲染次数</TableCell>
                      <TableCell align="right">平均耗时 (ms)</TableCell>
                      <TableCell align="right">最大耗时 (ms)</TableCell>
                      <TableCell align="right">最小耗时 (ms)</TableCell>
                      <TableCell align="right">总耗时 (ms)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedComponents.map(([componentId, data]) => {
                      const { status, color, icon: StatusIcon } = getPerformanceStatus((data as any).averageTime);
                      return (
                        <TableRow key={componentId}>
                          <TableCell>
                            <Typography variant="body2" fontFamily="monospace">
                              {componentId}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              icon={<StatusIcon />}
                              label={status}
                              color={color as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">{(data as any).renderCount}</TableCell>
                          <TableCell align="right">{(data as any).averageTime}</TableCell>
                          <TableCell align="right">{(data as any).maxTime}</TableCell>
                          <TableCell align="right">{(data as any).minTime}</TableCell>
                          <TableCell align="right">{(data as any).totalTime}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}

        {/* 性能建议 */}
        {tabValue === 1 && (
          <Box mt={2}>
            {sortedComponents.length === 0 ? (
              <Alert severity="info">
                暂无性能数据可分析。
              </Alert>
            ) : (
              <Box>
                {sortedComponents.map(([componentId, data]) => {
                  const advice = getPerformanceAdvice(data);
                  if (advice.length === 0) return null;
                  
                  return (
                    <Box key={componentId} mb={2}>
                      <Typography variant="h6" gutterBottom>
                        {componentId}
                      </Typography>
                      <Box ml={2}>
                        {advice.map((tip, index) => (
                          <Alert 
                            key={index} 
                            severity="warning" 
                            sx={{ mb: 1 }}
                          >
                            {tip}
                          </Alert>
                        ))}
                      </Box>
                      <Divider sx={{ mt: 2 }} />
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        )}

        {/* 系统信息 */}
        {tabValue === 2 && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>系统性能信息</Typography>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>用户代理</TableCell>
                  <TableCell>{navigator.userAgent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>内存信息</TableCell>
                  <TableCell>
                    {(performance as any).memory ? 
                      `已使用: ${((performance as any).memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB / 
                       总计: ${((performance as any).memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB / 
                       限制: ${((performance as any).memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB` :
                      '不支持'
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>硬件并发</TableCell>
                  <TableCell>{navigator.hardwareConcurrency || '未知'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>连接类型</TableCell>
                  <TableCell>
                    {(navigator as any).connection?.effectiveType || '未知'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Typography variant="caption" sx={{ flexGrow: 1 }}>
          自动刷新: 每2秒 | 数据键: {refreshKey}
        </Typography>
        <Button onClick={onClose}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PerformanceDashboard;