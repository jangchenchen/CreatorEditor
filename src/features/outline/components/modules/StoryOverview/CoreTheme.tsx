import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Add as AddIcon, Clear as ClearIcon } from '@mui/icons-material';
import { selectCoreTheme } from '../../../outlineSlice';
import { updateCoreTheme } from '../../../outlineSlice';

const CoreTheme: React.FC = () => {
  const dispatch = useDispatch();
  const coreTheme = useSelector(selectCoreTheme);
  const [newKeyword, setNewKeyword] = useState('');

  const handleFieldChange = (field: keyof Omit<typeof coreTheme, 'keywords'>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateCoreTheme({
      [field]: event.target.value
    }));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !coreTheme.keywords.includes(newKeyword.trim())) {
      dispatch(updateCoreTheme({
        keywords: [...coreTheme.keywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    dispatch(updateCoreTheme({
      keywords: coreTheme.keywords.filter(k => k !== keyword)
    }));
  };

  const handleKeywordKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        核心主题设定
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        明确故事要传达的核心思想、主要冲突和深层含义，这将指导整个故事的发展方向。
      </Typography>

      <Grid container spacing={3}>
        {/* 核心主题 */}
        <Grid item xs={12}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                核心主题
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="故事的核心主题是什么？要探讨的核心问题..."
                value={coreTheme.theme}
                onChange={handleFieldChange('theme')}
                variant="outlined"
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 主要冲突 */}
        <Grid item xs={12}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                主要冲突
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="故事的核心冲突是什么？角色间的主要矛盾..."
                value={coreTheme.conflict}
                onChange={handleFieldChange('conflict')}
                variant="outlined"
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 要表达的理念 */}
        <Grid item xs={12}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                要表达的理念
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="通过这个故事想要传达什么价值观、人生感悟..."
                value={coreTheme.message}
                onChange={handleFieldChange('message')}
                variant="outlined"
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 关键词标签 */}
        <Grid item xs={12}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                关键词标签
              </Typography>
              
              {/* 添加关键词 */}
              <TextField
                fullWidth
                placeholder="添加主题关键词，按回车确认..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={handleKeywordKeyPress}
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        size="small" 
                        onClick={handleAddKeyword}
                        disabled={!newKeyword.trim()}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* 显示关键词 */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {coreTheme.keywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    onDelete={() => handleRemoveKeyword(keyword)}
                    deleteIcon={<ClearIcon />}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                ))}
                {coreTheme.keywords.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    暂无关键词标签
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          💡 提示：主题应该具有普遍性和深度，能够引起读者的共鸣。关键词有助于后续情节发展时保持主题一致性。
        </Typography>
      </Box>
    </Box>
  );
};

export default CoreTheme;