/**
 * 优化的角色列表组件
 * 使用虚拟化和性能监控处理大量角色数据
 */
// @ts-nocheck


import React, { useMemo, useCallback, useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Skeleton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import VirtualizedList from '../../../../components/common/VirtualizedList';
import { usePerformanceMonitor } from '../../../../utils/performance/PerformanceMonitor';
import { dataProcessor } from '../../../../utils/performance/DataProcessor';
import type { Character } from '../../types/outline.types';

interface OptimizedCharacterListProps {
  characters: Character[];
  onEdit: (character: Character) => void;
  onDelete: (characterId: string) => void;
  loading?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  height?: number;
}

interface ProcessedCharacter extends Character {
  searchableText: string;
  displayName: string;
  roleColor: string;
}

const ROLE_COLORS = {
  protagonist: '#2e7d32', // 绿色 - 主角
  antagonist: '#d32f2f', // 红色 - 反派
  supporting: '#1976d2', // 蓝色 - 配角
  minor: '#757575', // 灰色 - 次要角色
  neutral: '#f57c00', // 橙色 - 中性角色
} as const;

export const OptimizedCharacterList: React.FC<OptimizedCharacterListProps> = ({
  characters,
  onEdit,
  onDelete,
  loading = false,
  searchPlaceholder = '搜索角色...',
  emptyMessage = '暂无角色数据',
  height = 600,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState<ProcessedCharacter[]>([]);
  const { measureOperation } = usePerformanceMonitor('OptimizedCharacterList');

  // 预处理角色数据，添加搜索和显示相关的字段
  const processedCharacters = useMemo(() => {
    return measureOperation('processCharacters', async () => {
      const result = await dataProcessor.processBatch(
        characters,
        (character: Character): ProcessedCharacter => ({
          ...character,
          searchableText:
            `${character.name} ${character.background} ${character.personality} ${character.role}`.toLowerCase(),
          displayName: character.name || '未命名角色',
          roleColor: ROLE_COLORS[character.role as keyof typeof ROLE_COLORS] || ROLE_COLORS.neutral,
        }),
        {
          batchSize: 50,
          enableCache: true,
          cacheKey: `characters-${characters.length}-${JSON.stringify(characters.slice(0, 5))}`,
          cacheTTL: 60000, // 1分钟缓存
        }
      );
      return result.processed;
    });
  }, [characters, measureOperation]);

  // 防抖搜索
  const debouncedSearch = useMemo(
    () =>
      dataProcessor.debounce((term: string) => {
        if (!term.trim()) {
          return processedCharacters;
        }

        return processedCharacters.filter(character =>
          character.searchableText.includes(term.toLowerCase())
        );
      }, 300),
    [processedCharacters]
  );

  // 处理搜索
  useEffect(() => {
    const performSearch = async () => {
      const processed = await processedCharacters;
      if (!processed) return;

      const filtered = await debouncedSearch(searchTerm);
      setFilteredCharacters(filtered);
    };

    performSearch();
  }, [searchTerm, processedCharacters, debouncedSearch]);

  // 渲染单个角色卡片
  const renderCharacterItem = useCallback(
    (item: ProcessedCharacter, index: number) => {
      return (
        <Card
          sx={{
            m: 1,
            minHeight: 120,
            display: 'flex',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: 3,
              transform: 'translateY(-2px)',
            },
          }}
        >
          <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center', p: 2 }}>
            {/* 角色头像 */}
            <Avatar
              sx={{
                width: 60,
                height: 60,
                mr: 2,
                bgcolor: item.roleColor,
                fontSize: '1.2rem',
              }}
            >
              {item.displayName.charAt(0)}
            </Avatar>

            {/* 角色信息 */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant='h6' component='div' noWrap>
                  {item.displayName}
                </Typography>
                <Chip
                  label={item.role}
                  size='small'
                  sx={{
                    ml: 1,
                    bgcolor: item.roleColor,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
                {item.age && (
                  <Typography variant='body2' color='text.secondary' sx={{ ml: 1 }}>
                    {item.age}岁
                  </Typography>
                )}
              </Box>

              <Typography variant='body2' color='text.secondary' noWrap sx={{ mb: 1 }}>
                {item.personality || '暂无性格描述'}
              </Typography>

              <Typography
                variant='caption'
                color='text.secondary'
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {item.background || '暂无背景描述'}
              </Typography>
            </Box>

            {/* 操作按钮 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
              <IconButton
                size='small'
                onClick={e => {
                  e.stopPropagation();
                  onEdit(item);
                }}
                sx={{ mb: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size='small'
                onClick={e => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                color='error'
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      );
    },
    [onEdit, onDelete]
  );

  // 转换为虚拟化列表需要的格式
  const virtualizedItems = useMemo(() => {
    return filteredCharacters.map(character => ({
      id: character.id,
      height: 120, // 固定高度
      data: character,
    }));
  }, [filteredCharacters]);

  // 加载状态
  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} sx={{ m: 1, minHeight: 120 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <Skeleton variant='circular' width={60} height={60} sx={{ mr: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant='text' width='40%' height={32} sx={{ mb: 1 }} />
                <Skeleton variant='text' width='60%' height={20} sx={{ mb: 1 }} />
                <Skeleton variant='text' width='80%' height={16} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ height: height, display: 'flex', flexDirection: 'column' }}>
      {/* 搜索框 */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          size='small'
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon color='action' />
              </InputAdornment>
            ),
          }}
        />

        {/* 搜索结果统计 */}
        <Typography variant='caption' color='text.secondary' sx={{ mt: 1, display: 'block' }}>
          显示 {filteredCharacters.length} 个角色
          {searchTerm && ` (从 ${characters.length} 个角色中筛选)`}
        </Typography>
      </Box>

      {/* 角色列表 */}
      <Box sx={{ flex: 1 }}>
        <VirtualizedList
          items={virtualizedItems}
          renderItem={item => renderCharacterItem(item.data, 0)}
          itemHeight={120}
          containerHeight={height - 100} // 减去搜索框高度
          overscan={3}
          loading={false}
          emptyComponent={
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <PersonIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant='h6' color='text.secondary'>
                {searchTerm ? '未找到匹配的角色' : emptyMessage}
              </Typography>
              {searchTerm && (
                <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                  尝试使用不同的关键词搜索
                </Typography>
              )}
            </Box>
          }
          sx={{
            '& > div': {
              paddingRight: '8px', // 为滚动条留出空间
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default OptimizedCharacterList;
