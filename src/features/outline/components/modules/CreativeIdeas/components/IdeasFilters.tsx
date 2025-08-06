import React from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { IdeaType, IdeaStatus } from '../../../../types/outline.types';

interface IdeasFiltersProps {
  filterType: IdeaType | 'all';
  filterStatus: IdeaStatus | 'all';
  onTypeChange: (type: IdeaType | 'all') => void;
  onStatusChange: (status: IdeaStatus | 'all') => void;
  onAddIdea: () => void;
}

const IdeasFilters: React.FC<IdeasFiltersProps> = ({
  filterType,
  filterStatus,
  onTypeChange,
  onStatusChange,
  onAddIdea,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel>类型筛选</InputLabel>
          <Select
            value={filterType}
            onChange={e => onTypeChange(e.target.value as IdeaType | 'all')}
            label='类型筛选'
          >
            <MenuItem value='all'>全部类型</MenuItem>
            <MenuItem value='inspiration'>灵感想法</MenuItem>
            <MenuItem value='plot-extension'>情节延展</MenuItem>
            <MenuItem value='alternative-ending'>结局替代</MenuItem>
            <MenuItem value='scene-idea'>场景创意</MenuItem>
            <MenuItem value='character-twist'>角色转折</MenuItem>
            <MenuItem value='dialogue'>对话创意</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel>状态筛选</InputLabel>
          <Select
            value={filterStatus}
            onChange={e => onStatusChange(e.target.value as IdeaStatus | 'all')}
            label='状态筛选'
          >
            <MenuItem value='all'>全部状态</MenuItem>
            <MenuItem value='draft'>草稿</MenuItem>
            <MenuItem value='considering'>考虑中</MenuItem>
            <MenuItem value='adopted'>已采用</MenuItem>
            <MenuItem value='rejected'>已拒绝</MenuItem>
            <MenuItem value='archived'>已归档</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button variant='contained' startIcon={<AddIcon />} onClick={onAddIdea}>
        添加创意
      </Button>
    </Box>
  );
};

export default IdeasFilters;
