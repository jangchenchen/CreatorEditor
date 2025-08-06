import React from 'react';
import { Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Chapter } from '../../../../types/outline.types';

interface ChapterSelectorProps {
  chapters: Chapter[];
  selectedChapter: string;
  onChapterChange: (chapterId: string) => void;
}

const ChapterSelector: React.FC<ChapterSelectorProps> = ({
  chapters,
  selectedChapter,
  onChapterChange,
}) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel>选择章节</InputLabel>
        <Select
          value={selectedChapter}
          onChange={e => onChapterChange(e.target.value)}
          label='选择章节'
        >
          <MenuItem value=''>
            <em>请选择章节</em>
          </MenuItem>
          {chapters.map(chapter => (
            <MenuItem key={chapter.id} value={chapter.id}>
              第{chapter.number}章: {chapter.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default ChapterSelector;
