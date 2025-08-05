/**
 * Subplot Distribution Analysis Component
 * Shows distribution of subplots across chapters
 */

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';

interface Chapter {
  id: string;
  number: number;
  title: string;
}

interface SubplotDistributionAnalysisProps {
  chapters: Chapter[];
  distribution: Record<number, string[]>;
}

export const SubplotDistributionAnalysis: React.FC<SubplotDistributionAnalysisProps> = ({
  chapters,
  distribution
}) => {
  const getStatusColor = (count: number) => {
    if (count === 0) return 'default';
    if (count > 3) return 'error';
    if (count > 1) return 'warning';
    return 'success';
  };

  const getStatusLabel = (count: number) => {
    if (count === 0) return '空白';
    if (count > 3) return '过载';
    if (count > 1) return '繁忙';
    return '正常';
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
          <TimelineIcon sx={{ mr: 1, color: 'info.main' }} />
          副线分布分析
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {chapters.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            暂无章节信息，无法进行分布分析
          </Typography>
        ) : (
          <TableContainer component={Paper} elevation={1}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>章节</TableCell>
                  <TableCell>副线数量</TableCell>
                  <TableCell>涉及副线</TableCell>
                  <TableCell>状态</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chapters.map((chapter) => {
                  const chapterSubplots = distribution[chapter.number] || [];
                  
                  return (
                    <TableRow key={chapter.id}>
                      <TableCell>第{chapter.number}章</TableCell>
                      <TableCell>{chapterSubplots.length}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {chapterSubplots.slice(0, 2).map((title, index) => (
                            <Chip key={index} label={title} size="small" variant="outlined" />
                          ))}
                          {chapterSubplots.length > 2 && (
                            <Chip label={`+${chapterSubplots.length - 2}`} size="small" variant="outlined" />
                          )}
                          {chapterSubplots.length === 0 && (
                            <Typography variant="caption" color="text.secondary">无</Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={getStatusLabel(chapterSubplots.length)}
                          color={getStatusColor(chapterSubplots.length)}
                          size="small"
                        />
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
  );
};