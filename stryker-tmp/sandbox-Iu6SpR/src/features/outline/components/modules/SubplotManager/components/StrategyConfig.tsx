/**
 * Strategy Configuration Component
 * Configures weaving strategy settings
 */
// @ts-nocheck


import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Hub as StrategyIcon } from '@mui/icons-material';

interface StrategyConfigProps {
  strategy: {
    integrationMethod: string;
    pacingStrategy: string;
  };
  onUpdate: (updates: any) => void;
}

export const StrategyConfig: React.FC<StrategyConfigProps> = ({ strategy, onUpdate }) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          <StrategyIcon sx={{ mr: 1, color: 'primary.main' }} />
          编织策略配置
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>整合方式</InputLabel>
            <Select
              value={strategy.integrationMethod}
              label='整合方式'
              onChange={e => onUpdate({ integrationMethod: e.target.value })}
            >
              <MenuItem value='parallel'>平行发展</MenuItem>
              <MenuItem value='intersecting'>交叉穿插</MenuItem>
              <MenuItem value='nested'>嵌套式</MenuItem>
              <MenuItem value='converging'>汇聚式</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>节奏策略</InputLabel>
            <Select
              value={strategy.pacingStrategy}
              label='节奏策略'
              onChange={e => onUpdate({ pacingStrategy: e.target.value })}
            >
              <MenuItem value='uniform'>均匀分布</MenuItem>
              <MenuItem value='alternating'>交替突出</MenuItem>
              <MenuItem value='climactic'>高潮集中</MenuItem>
              <MenuItem value='wave'>波浪式</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={3}
            label='策略说明'
            value={
              strategy.integrationMethod === 'parallel'
                ? '多条副线同时发展，在关键节点相互影响'
                : strategy.integrationMethod === 'intersecting'
                  ? '副线在不同章节交叉出现，形成网状结构'
                  : strategy.integrationMethod === 'nested'
                    ? '主副线相互嵌套，一条线中包含另一条线'
                    : '多条副线最终汇聚到主线，形成完整故事'
            }
            InputProps={{ readOnly: true }}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
