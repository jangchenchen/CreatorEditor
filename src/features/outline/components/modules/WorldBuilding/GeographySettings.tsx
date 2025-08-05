import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Autocomplete,
  Divider,
  Paper
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  LocationOn as LocationIcon,
  Terrain as TerrainIcon
} from '@mui/icons-material';
import { selectOutline } from '../../../outlineSlice';
import { Region } from '../../../types/outline.types';

const GeographySettings: React.FC = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const geography = outline.world.geography;
  
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Region>>({});

  // 地理基本信息
  const [climate, setClimate] = useState(geography.climate);
  const [landmarks, setLandmarks] = useState<string[]>(geography.landmarks);
  const [naturalFeatures, setNaturalFeatures] = useState<string[]>(geography.naturalFeatures);
  const [newLandmark, setNewLandmark] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const handleOpenRegionDialog = (region?: Region) => {
    setEditingRegion(region || null);
    setFormData(region ? { ...region } : {
      name: '',
      description: '',
      significance: '',
      connectedRegions: []
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingRegion(null);
    setFormData({});
  };

  const handleSaveRegion = () => {
    const regionData: Region = {
      id: editingRegion?.id || `region-${Date.now()}`,
      name: formData.name || '',
      description: formData.description || '',
      significance: formData.significance || '',
      connectedRegions: formData.connectedRegions || []
    };

    let updatedRegions = [...geography.regions];
    
    if (editingRegion) {
      const index = updatedRegions.findIndex(r => r.id === editingRegion.id);
      if (index !== -1) {
        updatedRegions[index] = regionData;
      }
    } else {
      updatedRegions.push(regionData);
    }

    // TODO: 使用 dispatch 更新 Redux state
    console.log('更新地区:', regionData);
    handleCloseDialog();
  };

  const handleDeleteRegion = (regionId: string) => {
    if (window.confirm('确定要删除这个地区吗？')) {
      // TODO: 使用 dispatch 更新 Redux state
      console.log('删除地区:', regionId);
    }
  };

  const handleFormChange = (field: keyof Region) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleConnectedRegionsChange = (event: any, newValue: string[]) => {
    setFormData(prev => ({
      ...prev,
      connectedRegions: newValue
    }));
  };

  const handleAddItem = (type: 'landmark' | 'feature') => {
    if (type === 'landmark' && newLandmark.trim()) {
      setLandmarks([...landmarks, newLandmark.trim()]);
      setNewLandmark('');
    } else if (type === 'feature' && newFeature.trim()) {
      setNaturalFeatures([...naturalFeatures, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveItem = (type: 'landmark' | 'feature', index: number) => {
    if (type === 'landmark') {
      setLandmarks(landmarks.filter((_, i) => i !== index));
    } else {
      setNaturalFeatures(naturalFeatures.filter((_, i) => i !== index));
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        地理环境设定
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        构建故事世界的地理背景，包括气候条件、重要地标和自然特征。
      </Typography>

      <Grid container spacing={3}>
        {/* 气候设定 */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TerrainIcon sx={{ mr: 1 }} />
                气候环境
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="气候描述"
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
                placeholder="描述故事世界的气候特点、季节变化、天气模式..."
                variant="outlined"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 重要地标 */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                重要地标
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="添加地标"
                  value={newLandmark}
                  onChange={(e) => setNewLandmark(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem('landmark')}
                />
                <Button 
                  variant="outlined" 
                  onClick={() => handleAddItem('landmark')}
                  disabled={!newLandmark.trim()}
                >
                  添加
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {landmarks.map((landmark, index) => (
                  <Chip
                    key={index}
                    label={landmark}
                    onDelete={() => handleRemoveItem('landmark', index)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
                {landmarks.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    暂无地标信息
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 自然特征 */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                自然特征
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="添加自然特征"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem('feature')}
                />
                <Button 
                  variant="outlined" 
                  onClick={() => handleAddItem('feature')}
                  disabled={!newFeature.trim()}
                >
                  添加
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {naturalFeatures.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    onDelete={() => handleRemoveItem('feature', index)}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
                {naturalFeatures.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    暂无自然特征信息
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 地区管理 */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ mr: 1 }} />
                  地区设定 ({geography.regions.length})
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenRegionDialog()}
                >
                  添加地区
                </Button>
              </Box>

              {geography.regions.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                  <Typography variant="body2" color="text.secondary">
                    暂无地区设定，点击上方按钮添加第一个地区
                  </Typography>
                </Paper>
              ) : (
                <Grid container spacing={2}>
                  {geography.regions.map((region) => (
                    <Grid item xs={12} sm={6} md={4} key={region.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {region.name}
                          </Typography>
                          <Typography variant="body2" paragraph sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            '-webkit-line-clamp': 2,
                            '-webkit-box-orient': 'vertical',
                            minHeight: '40px'
                          }}>
                            {region.description || '暂无描述'}
                          </Typography>
                          {region.significance && (
                            <Typography variant="caption" color="primary">
                              重要性: {region.significance}
                            </Typography>
                          )}
                          {region.connectedRegions.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="caption" color="text.secondary">
                                相连地区: {region.connectedRegions.length}
                              </Typography>
                            </Box>
                          )}
                        </CardContent>
                        <CardActions>
                          <IconButton size="small" onClick={() => handleOpenRegionDialog(region)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteRegion(region.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 地区编辑对话框 */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingRegion ? '编辑地区' : '添加新地区'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="地区名称"
                  value={formData.name || ''}
                  onChange={handleFormChange('name')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="地区描述"
                  value={formData.description || ''}
                  onChange={handleFormChange('description')}
                  placeholder="详细描述这个地区的特点、环境、文化等..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="故事重要性"
                  value={formData.significance || ''}
                  onChange={handleFormChange('significance')}
                  placeholder="这个地区在故事中的重要性和作用..."
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={geography.regions.map(r => r.name).filter(name => name !== formData.name)}
                  value={formData.connectedRegions || []}
                  onChange={handleConnectedRegionsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="相连地区"
                      placeholder="选择或输入相连的地区名称"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<CancelIcon />}>
            取消
          </Button>
          <Button 
            onClick={handleSaveRegion} 
            variant="contained" 
            startIcon={<SaveIcon />}
            disabled={!formData.name}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          💡 提示：地理设定应该与故事情节密切相关，避免过度复杂。重点关注对角色行动和情节发展有影响的地理要素。
        </Typography>
      </Box>
    </Box>
  );
};

export default GeographySettings;