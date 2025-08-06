import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, TextField, Typography, Card, CardContent, Divider } from '@mui/material';
import { selectStoryBackground } from '../../../outlineSlice';
import { updateStoryBackground } from '../../../outlineSlice';

const StoryBackground: React.FC = () => {
  const dispatch = useDispatch();
  const background = useSelector(selectStoryBackground);

  const handleFieldChange =
    (field: keyof typeof background) => (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateStoryBackground({
          [field]: event.target.value,
        })
      );
    };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant='h6' gutterBottom>
        故事背景设定
      </Typography>
      <Typography variant='body2' color='text.secondary' paragraph>
        定义故事发生的时间、地点和社会环境，为整个小说奠定基础背景。
      </Typography>

      <Grid container spacing={3}>
        {/* 时代背景 */}
        <Grid item xs={12} md={6}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant='subtitle1' gutterBottom>
                时代背景
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder='描述故事发生的历史时期、年代设定...'
                value={background.era}
                onChange={handleFieldChange('era')}
                variant='outlined'
                size='small'
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 地点设定 */}
        <Grid item xs={12} md={6}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant='subtitle1' gutterBottom>
                地点设定
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder='描述故事发生的地理位置、城市、国家...'
                value={background.location}
                onChange={handleFieldChange('location')}
                variant='outlined'
                size='small'
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 社会环境 */}
        <Grid item xs={12}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant='subtitle1' gutterBottom>
                社会环境
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder='描述当时的社会氛围、政治环境、文化背景...'
                value={background.socialEnvironment}
                onChange={handleFieldChange('socialEnvironment')}
                variant='outlined'
                size='small'
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 历史背景 */}
        <Grid item xs={12}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant='subtitle1' gutterBottom>
                历史背景
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder='描述重要的历史事件、背景信息对故事的影响...'
                value={background.historicalContext}
                onChange={handleFieldChange('historicalContext')}
                variant='outlined'
                size='small'
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant='caption' color='text.secondary'>
          💡
          提示：背景设定应该服务于故事情节，避免过度详细的描述。重点关注对角色和情节有直接影响的背景元素。
        </Typography>
      </Box>
    </Box>
  );
};

export default StoryBackground;
