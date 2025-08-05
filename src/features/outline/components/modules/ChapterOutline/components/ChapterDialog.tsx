import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Autocomplete
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { Chapter, ChapterTransition, Character } from '../../../../types/outline.types';

interface ChapterDialogProps {
  open: boolean;
  editingChapter: Chapter | null;
  chapters: Chapter[];
  characters: Character[];
  onClose: () => void;
  onSave: (chapterData: Chapter) => void;
}

const ChapterDialog: React.FC<ChapterDialogProps> = ({
  open,
  editingChapter,
  chapters,
  characters,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Chapter>>({});

  // 初始化表单数据
  useEffect(() => {
    if (open) {
      if (editingChapter) {
        setFormData({ ...editingChapter });
      } else {
        setFormData({
          number: chapters.length + 1,
          title: '',
          summary: '',
          keyScenes: [],
          characters: [],
          plotPoints: [],
          conflicts: [],
          themes: [],
          wordCountTarget: 3000,
          status: 'planned',
          transitions: {
            from: '',
            to: '',
            method: ''
          },
          notes: ''
        });
      }
    }
  }, [open, editingChapter, chapters]);

  const handleSave = () => {
    const chapterData: Chapter = {
      id: editingChapter?.id || `chapter-${Date.now()}`,
      number: formData.number || chapters.length + 1,
      title: formData.title || '',
      summary: formData.summary || '',
      keyScenes: formData.keyScenes || [],
      characters: formData.characters || [],
      plotPoints: formData.plotPoints || [],
      conflicts: formData.conflicts || [],
      themes: formData.themes || [],
      wordCountTarget: formData.wordCountTarget || 3000,
      status: formData.status || 'planned',
      transitions: formData.transitions || { from: '', to: '', method: '' },
      notes: formData.notes || ''
    };

    onSave(chapterData);
  };

  const handleFormChange = (field: keyof Chapter) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleTransitionChange = (field: keyof ChapterTransition) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      transitions: {
        ...prev.transitions,
        [field]: event.target.value
      } as ChapterTransition
    }));
  };

  const handleArrayFieldChange = (field: keyof Pick<Chapter, 'characters' | 'plotPoints' | 'conflicts' | 'themes'>) => (
    event: any,
    newValue: string[]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingChapter ? '编辑章节' : '添加新章节'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* 基本信息 */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="章节号"
                value={formData.number || ''}
                onChange={handleFormChange('number')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="章节标题"
                value={formData.title || ''}
                onChange={handleFormChange('title')}
                required
              />
            </Grid>

            {/* 状态和字数 */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>状态</InputLabel>
                <Select
                  value={formData.status || 'planned'}
                  onChange={handleFormChange('status')}
                  label="状态"
                >
                  <MenuItem value="planned">计划中</MenuItem>
                  <MenuItem value="writing">写作中</MenuItem>
                  <MenuItem value="completed">已完成</MenuItem>
                  <MenuItem value="revision">修订中</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="目标字数"
                value={formData.wordCountTarget || ''}
                onChange={handleFormChange('wordCountTarget')}
              />
            </Grid>

            {/* 章节概述 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="章节概述"
                value={formData.summary || ''}
                onChange={handleFormChange('summary')}
              />
            </Grid>

            {/* 涉及角色 */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={characters.map(c => c.id)}
                getOptionLabel={(option) => characters.find(c => c.id === option)?.name || option}
                value={formData.characters || []}
                onChange={handleArrayFieldChange('characters')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="涉及角色"
                    placeholder="选择相关角色"
                  />
                )}
              />
            </Grid>

            {/* 情节要点 */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.plotPoints || []}
                onChange={handleArrayFieldChange('plotPoints')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="情节要点"
                    placeholder="输入情节要点并按回车"
                  />
                )}
              />
            </Grid>

            {/* 冲突和主题 */}
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.conflicts || []}
                onChange={handleArrayFieldChange('conflicts')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="章节冲突"
                    placeholder="输入冲突点并按回车"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.themes || []}
                onChange={handleArrayFieldChange('themes')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="涉及主题"
                    placeholder="输入主题并按回车"
                  />
                )}
              />
            </Grid>

            {/* 章节过渡 */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                章节过渡设置
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="承接内容"
                value={formData.transitions?.from || ''}
                onChange={handleTransitionChange('from')}
                placeholder="从上一章承接什么..."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="引导内容"
                value={formData.transitions?.to || ''}
                onChange={handleTransitionChange('to')}
                placeholder="为下一章铺垫什么..."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="过渡方式"
                value={formData.transitions?.method || ''}
                onChange={handleTransitionChange('method')}
                placeholder="如何进行过渡..."
              />
            </Grid>

            {/* 备注 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="备注"
                value={formData.notes || ''}
                onChange={handleFormChange('notes')}
                placeholder="章节创作备注..."
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CancelIcon />}>
          取消
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          startIcon={<SaveIcon />}
          disabled={!formData.title || !formData.number}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChapterDialog;