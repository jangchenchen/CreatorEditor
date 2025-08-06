/**
 * 虚拟化列表组件
 * 用于高效渲染大量数据列表，支持固定高度和动态高度
 */

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

export interface VirtualizedListItem {
  id: string | number;
  height?: number;
  data: any;
}

export interface VirtualizedListProps {
  items: VirtualizedListItem[];
  renderItem: (item: VirtualizedListItem, index: number) => React.ReactNode;
  itemHeight?: number; // 固定高度，如果不设置则使用动态高度
  containerHeight: number;
  overscan?: number; // 超出视窗的渲染项目数量
  onScroll?: (scrollTop: number) => void;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  sx?: SxProps<Theme>;
  className?: string;
}

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  overscan = 5,
  onScroll,
  loading = false,
  loadingComponent = null,
  emptyComponent = null,
  sx,
  className,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  // 计算每个项目的位置和高度
  const itemPositions = useMemo(() => {
    const positions: Array<{ top: number; height: number }> = [];
    let currentTop = 0;

    for (let i = 0; i < items.length; i++) {
      const height = itemHeight || items[i].height || 50;
      positions.push({
        top: currentTop,
        height,
      });
      currentTop += height;
    }

    return positions;
  }, [items, itemHeight]);

  // 计算总高度
  const totalHeight = useMemo(() => {
    if (itemPositions.length === 0) return 0;
    const lastItem = itemPositions[itemPositions.length - 1];
    return lastItem.top + lastItem.height;
  }, [itemPositions]);

  // 计算可见范围
  const visibleRange = useMemo(() => {
    if (itemPositions.length === 0) {
      return { start: 0, end: 0 };
    }

    let start = 0;
    let end = itemPositions.length - 1;

    // 查找第一个可见项目
    for (let i = 0; i < itemPositions.length; i++) {
      if (itemPositions[i].top + itemPositions[i].height > scrollTop) {
        start = i;
        break;
      }
    }

    // 查找最后一个可见项目
    for (let i = start; i < itemPositions.length; i++) {
      if (itemPositions[i].top > scrollTop + containerHeight) {
        end = i - 1;
        break;
      }
    }

    // 添加超出视窗的项目
    start = Math.max(0, start - overscan);
    end = Math.min(itemPositions.length - 1, end + overscan);

    return { start, end };
  }, [scrollTop, containerHeight, itemPositions, overscan]);

  // 处理滚动事件
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const newScrollTop = event.currentTarget.scrollTop;
      setScrollTop(newScrollTop);
      onScroll?.(newScrollTop);
    },
    [onScroll]
  );

  // 渲染可见项目
  const visibleItems = useMemo(() => {
    const rendered: React.ReactNode[] = [];

    for (let i = visibleRange.start; i <= visibleRange.end; i++) {
      if (i >= items.length) break;

      const item = items[i];
      const position = itemPositions[i];

      rendered.push(
        <Box
          key={item.id}
          sx={{
            position: 'absolute',
            top: position.top,
            left: 0,
            right: 0,
            height: position.height,
            overflow: 'hidden',
          }}
        >
          {renderItem(item, i)}
        </Box>
      );
    }

    return rendered;
  }, [visibleRange, items, itemPositions, renderItem]);

  // 滚动到指定项目
  const scrollToItem = useCallback(
    (index: number, align: 'start' | 'center' | 'end' = 'start') => {
      if (!scrollElementRef.current || index < 0 || index >= itemPositions.length) {
        return;
      }

      const position = itemPositions[index];
      let scrollTop = position.top;

      if (align === 'center') {
        scrollTop = position.top - (containerHeight - position.height) / 2;
      } else if (align === 'end') {
        scrollTop = position.top - containerHeight + position.height;
      }

      scrollTop = Math.max(0, Math.min(totalHeight - containerHeight, scrollTop));
      scrollElementRef.current.scrollTop = scrollTop;
    },
    [itemPositions, containerHeight, totalHeight]
  );

  // 暴露滚动方法
  React.useImperativeHandle(scrollElementRef, () => ({
    scrollToItem,
    scrollToTop: () => scrollElementRef.current?.scrollTo({ top: 0 }),
    scrollToBottom: () => scrollElementRef.current?.scrollTo({ top: totalHeight }),
  }));

  if (loading && loadingComponent) {
    return (
      <Box
        sx={{
          height: containerHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx,
        }}
        className={className}
      >
        {loadingComponent}
      </Box>
    );
  }

  if (items.length === 0 && emptyComponent) {
    return (
      <Box
        sx={{
          height: containerHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx,
        }}
        className={className}
      >
        {emptyComponent}
      </Box>
    );
  }

  return (
    <Box
      ref={scrollElementRef}
      onScroll={handleScroll}
      sx={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
        ...sx,
      }}
      className={className}
    >
      {/* 虚拟容器，用于创建滚动条 */}
      <Box
        sx={{
          height: totalHeight,
          position: 'relative',
        }}
      >
        {visibleItems}
      </Box>
    </Box>
  );
};

export default VirtualizedList;
