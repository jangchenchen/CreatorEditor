/**
 * Distribution Analysis Component
 * Shows subplot distribution across chapters
 */
// @ts-nocheck


import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Timeline as TimelineIcon } from '@mui/icons-material';

interface DistributionAnalysisProps {
  distribution: Record<string, number>;
  averagePerChapter: number;
  maxConcentration: number;
  chaptersWithSubplots: number;
  totalChapters: number;
}

export const DistributionAnalysis: React.FC<DistributionAnalysisProps> = ({
  distribution,
  averagePerChapter,
  maxConcentration,
  chaptersWithSubplots,
  totalChapters,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          <TimelineIcon sx={{ mr: 1, color: 'info.main' }} />
          副线分布分析
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary' paragraph>
            平均每章副线数: {averagePerChapter.toFixed(1)} | 最大集中度: {maxConcentration} |
            覆盖章节: {chaptersWithSubplots}/{totalChapters}
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>章节</TableCell>
                <TableCell align='center'>副线数量</TableCell>
                <TableCell>分布状态</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(distribution).map(([chapterId, count]) => (
                <TableRow key={chapterId}>
                  <TableCell>章节 {chapterId}</TableCell>
                  <TableCell align='center'>{count}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: `${(count / maxConcentration) * 100}%`,
                        height: 20,
                        bgcolor:
                          count > averagePerChapter * 1.5
                            ? 'error.main'
                            : count > averagePerChannel
                              ? 'warning.main'
                              : 'success.main',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 12,
                      }}
                    >
                      {count > averagePerChapter * 1.5
                        ? '密集'
                        : count > averagePerChapter
                          ? '适中'
                          : '稀疏'}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
