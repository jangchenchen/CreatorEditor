import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import {
  selectChapterList,
  selectCharacters,
  addChapter,
  updateChapter,
  deleteChapter,
} from '../../../outlineSlice';
import { Chapter } from '../../../types/outline.types';
import ChapterStatistics from './components/ChapterStatistics';
import ChapterCard from './components/ChapterCard';
import ChapterDialog from './components/ChapterDialog';

const ChapterManagement: React.FC = () => {
  const dispatch = useDispatch();
  const chapters = useSelector(selectChapterList);
  const characters = useSelector(selectCharacters);

  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (chapter?: Chapter) => {
    setEditingChapter(chapter || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingChapter(null);
  };

  const handleSaveChapter = (chapterData: Chapter) => {
    if (editingChapter) {
      dispatch(updateChapter(chapterData));
    } else {
      dispatch(addChapter(chapterData));
    }
    handleCloseDialog();
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (window.confirm('确定要删除这个章节吗？')) {
      dispatch(deleteChapter(chapterId));
    }
  };

  return (
    <Box sx={{ height: '100%' }}>
      <ChapterStatistics chapters={chapters} />

      {/* 工具栏 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='h6'>章节列表</Typography>
        <Button variant='contained' startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          添加章节
        </Button>
      </Box>

      {/* 章节列表 */}
      {chapters.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant='h6' color='text.secondary' gutterBottom>
              暂无章节
            </Typography>
            <Typography variant='body2' color='text.secondary' paragraph>
              开始添加章节来构建您的小说结构
            </Typography>
            <Button variant='outlined' onClick={() => handleOpenDialog()}>
              添加第一章
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {chapters.map(chapter => (
            <Grid item xs={12} md={6} lg={4} key={chapter.id}>
              <ChapterCard
                chapter={chapter}
                characters={characters}
                onEdit={handleOpenDialog}
                onDelete={handleDeleteChapter}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <ChapterDialog
        open={dialogOpen}
        editingChapter={editingChapter}
        chapters={chapters}
        characters={characters}
        onClose={handleCloseDialog}
        onSave={handleSaveChapter}
      />
    </Box>
  );
};

export default ChapterManagement;
