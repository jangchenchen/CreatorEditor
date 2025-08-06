// @ts-nocheck
import React from 'react';
import { Box, Card, CardContent, Typography, Chip, Paper } from '@mui/material';
import { MenuBook as ChapterIcon } from '@mui/icons-material';
import { Chapter } from '../../../../types/outline.types';

interface ChapterStructureFlowProps {
  chapters: Chapter[];
  getStatusColor: (status: Chapter['status']) => string;
  getStatusLabel: (status: Chapter['status']) => string;
}

const ChapterStructureFlow: React.FC<ChapterStructureFlowProps> = ({
  chapters,
  getStatusColor,
  getStatusLabel,
}) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Typography variant='h6' gutterBottom>
        章节结构流程
      </Typography>

      {chapters.length === 0 ? (
        <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', py: 4 }}>
          暂无章节，请先添加章节
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {chapters.map((chapter, index) => (
            <Card key={chapter.id} elevation={1}>
              <CardContent sx={{ py: 2 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <ChapterIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant='subtitle1'>
                        第{chapter.number}章: {chapter.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip
                          label={getStatusLabel(chapter.status)}
                          color={getStatusColor(chapter.status)}
                          size='small'
                        />
                        <Chip
                          label={`${chapter.keyScenes.length} 场景`}
                          size='small'
                          variant='outlined'
                        />
                        <Chip
                          label={`${chapter.wordCountTarget} 字`}
                          size='small'
                          variant='outlined'
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* 章节过渡信息 */}
                  {(chapter.transitions.from || chapter.transitions.to) && (
                    <Box sx={{ ml: 2, minWidth: 200 }}>
                      <Typography variant='caption' color='text.secondary'>
                        过渡: {chapter.transitions.method || '未设置'}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* 章节概述 */}
                {chapter.summary && (
                  <Typography variant='body2' color='text.secondary' sx={{ mt: 1, ml: 5 }}>
                    {chapter.summary}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default ChapterStructureFlow;
