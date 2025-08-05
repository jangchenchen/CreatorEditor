import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Chip
} from '@mui/material';
import { selectSynopsis } from '../../../outlineSlice';
import { updateSynopsis } from '../../../outlineSlice';

const StorySynopsis: React.FC = () => {
  const dispatch = useDispatch();
  const synopsis = useSelector(selectSynopsis);

  const handleFieldChange = (field: keyof typeof synopsis) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateSynopsis({
      [field]: event.target.value
    }));
  };

  // 计算完成度
  const completionFields = [
    synopsis.beginning,
    synopsis.development, 
    synopsis.climax,
    synopsis.ending,
    synopsis.overallTone
  ];
  const completedFields = completionFields.filter(field => field.trim().length > 0).length;
  const completionRate = Math.round((completedFields / completionFields.length) * 100);

  const getStageDescription = (stage: string) => {
    const descriptions = {
      beginning: '故事的开端，介绍主要角色、设定背景，提出核心问题或冲突',
      development: '情节的推进，角色关系发展，冲突逐渐升级，推动故事向前',
      climax: '故事的转折点，最激烈的冲突爆发，角色面临关键选择',
      ending: '故事的结局，冲突的解决，角色的成长和故事的收尾'
    };
    return descriptions[stage as keyof typeof descriptions] || '';
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          故事梗概
        </Typography>
        <Chip 
          label={`完成度: ${completionRate}%`}
          color={completionRate >= 80 ? 'success' : completionRate >= 40 ? 'warning' : 'default'}
          size="small"
        />
      </Box>
      
      <Typography variant="body2" color="text.secondary" paragraph>
        按照经典的"起承转合"结构，概述故事的主要发展脉络和整体基调。
      </Typography>

      {/* 完成度进度条 */}
      <Box sx={{ mb: 3 }}>
        <LinearProgress 
          variant="determinate" 
          value={completionRate} 
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      <Grid container spacing={3}>
        {/* 起 - 开端 */}
        <Grid item xs={12} md={6}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    bgcolor: 'primary.main', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.75rem',
                    mr: 1
                  }}
                >
                  起
                </Box>
                故事开端
              </Typography>
              <Typography variant="caption" color="text.secondary" paragraph>
                {getStageDescription('beginning')}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="描述故事的开始，主要角色和背景的介绍..."
                value={synopsis.beginning}
                onChange={handleFieldChange('beginning')}
                variant="outlined"
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 承 - 发展 */}
        <Grid item xs={12} md={6}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    bgcolor: 'info.main', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.75rem',
                    mr: 1
                  }}
                >
                  承
                </Box>
                情节发展
              </Typography>
              <Typography variant="caption" color="text.secondary" paragraph>
                {getStageDescription('development')}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="描述情节的推进过程，角色关系的发展..."
                value={synopsis.development}
                onChange={handleFieldChange('development')}
                variant="outlined"
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 转 - 高潮 */}
        <Grid item xs={12} md={6}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    bgcolor: 'warning.main', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.75rem',
                    mr: 1
                  }}
                >
                  转
                </Box>
                故事高潮
              </Typography>
              <Typography variant="caption" color="text.secondary" paragraph>
                {getStageDescription('climax')}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="描述故事的关键转折点和最激烈的冲突..."
                value={synopsis.climax}
                onChange={handleFieldChange('climax')}
                variant="outlined"
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 合 - 结局 */}
        <Grid item xs={12} md={6}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    bgcolor: 'success.main', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.75rem',
                    mr: 1
                  }}
                >
                  合
                </Box>
                故事结局
              </Typography>
              <Typography variant="caption" color="text.secondary" paragraph>
                {getStageDescription('ending')}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="描述故事的结局和角色的最终归宿..."
                value={synopsis.ending}
                onChange={handleFieldChange('ending')}
                variant="outlined"
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 整体基调 */}
        <Grid item xs={12}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                整体基调
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="描述故事的整体风格、情感基调和阅读感受..."
                value={synopsis.overallTone}
                onChange={handleFieldChange('overallTone')}
                variant="outlined"
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          💡 提示："起承转合"是经典的故事结构，确保每个阶段都有明确的目标和推进作用。整体基调将影响读者的情感体验。
        </Typography>
      </Box>
    </Box>
  );
};

export default StorySynopsis;