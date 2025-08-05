import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  Divider,
  Paper
} from '@mui/material';
import {
  FamilyRestroom as FamilyIcon,
  Favorite as LoverIcon,
  Groups as FriendIcon,
  Dangerous as EnemyIcon,
  School as MentorIcon,
  Sports as RivalIcon,
  Work as ColleagueIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccountTree as MapIcon
} from '@mui/icons-material';
import { Character, Relationship, RelationshipType } from '../../../types/outline.types';

// 模拟数据
const mockCharacters: Character[] = [
  {
    id: '1',
    name: '张三丰',
    role: 'protagonist',
    background: '武当山道士',
    personality: ['睿智', '慈祥'],
    appearance: '仙风道骨',
    goals: '传承武学',
    motivation: '维护正道',
    arc: {
      startState: '隐居',
      keyEvents: [],
      endState: '宗师',
      growthDirection: '成长'
    },
    tags: ['武当'],
    createdAt: new Date(),
    lastUpdated: new Date()
  },
  {
    id: '2',
    name: '张无忌',
    role: 'protagonist',
    background: '张三丰弟子',
    personality: ['善良', '勇敢'],
    appearance: '英俊青年',
    goals: '行侠仗义',
    motivation: '保护亲友',
    arc: {
      startState: '少年',
      keyEvents: [],
      endState: '英雄',
      growthDirection: '成长'
    },
    tags: ['武当', '明教'],
    createdAt: new Date(),
    lastUpdated: new Date()
  },
  {
    id: '3',
    name: '赵敏',
    role: 'supporting',
    background: '郡主',
    personality: ['聪明', '任性'],
    appearance: '美丽聪慧',
    goals: '得到爱情',
    motivation: '追求幸福',
    arc: {
      startState: '郡主',
      keyEvents: [],
      endState: '贤妻',
      growthDirection: '转变'
    },
    tags: ['朝廷', '郡主'],
    createdAt: new Date(),
    lastUpdated: new Date()
  }
];

const mockRelationships: Relationship[] = [
  {
    id: '1',
    fromCharacter: '1',
    toCharacter: '2',
    type: 'mentor',
    description: '师父和弟子的关系',
    intensity: 9,
    isReversible: false,
    developmentStage: '深厚师徒情'
  },
  {
    id: '2',
    fromCharacter: '2',
    toCharacter: '3',
    type: 'lover',
    description: '互相爱慕的恋人',
    intensity: 10,
    isReversible: true,
    developmentStage: '热恋期'
  }
];

const RelationshipMap: React.FC = () => {
  const [relationships] = useState<Relationship[]>(mockRelationships);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'visual'>('list');

  const getRelationshipIcon = (type: RelationshipType) => {
    switch (type) {
      case 'family': return <FamilyIcon />;
      case 'lover': return <LoverIcon />;
      case 'friend': return <FriendIcon />;
      case 'enemy': return <EnemyIcon />;
      case 'mentor': return <MentorIcon />;
      case 'rival': return <RivalIcon />;
      case 'colleague': return <ColleagueIcon />;
      default: return <FriendIcon />;
    }
  };

  const getRelationshipLabel = (type: RelationshipType): string => {
    switch (type) {
      case 'family': return '亲情';
      case 'lover': return '爱情';
      case 'friend': return '友情';
      case 'enemy': return '敌对';
      case 'mentor': return '师徒';
      case 'rival': return '竞争';
      case 'colleague': return '同事';
      default: return '未知';
    }
  };

  const getRelationshipColor = (type: RelationshipType): "primary" | "secondary" | "error" | "warning" | "info" | "success" => {
    switch (type) {
      case 'family': return 'info';
      case 'lover': return 'secondary';
      case 'friend': return 'success';
      case 'enemy': return 'error';
      case 'mentor': return 'primary';
      case 'rival': return 'warning';
      case 'colleague': return 'info';
      default: return 'primary';
    }
  };

  const getCharacterName = (characterId: string): string => {
    return mockCharacters.find(c => c.id === characterId)?.name || '未知角色';
  };

  const handleAddRelationship = () => {
    setSelectedRelationship(null);
    setDialogOpen(true);
  };

  const handleEditRelationship = (relationship: Relationship) => {
    setSelectedRelationship(relationship);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRelationship(null);
  };

  const handleSaveRelationship = () => {
    // TODO: 实现保存逻辑
    console.log('保存关系:', selectedRelationship);
    handleCloseDialog();
  };

  const handleDeleteRelationship = (relationshipId: string) => {
    // TODO: 实现删除逻辑
    console.log('删除关系:', relationshipId);
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* 顶部工具栏 */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          角色关系图谱 ({relationships.length})
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={viewMode === 'list' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setViewMode('list')}
          >
            列表视图
          </Button>
          <Button
            variant={viewMode === 'visual' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setViewMode('visual')}
            disabled // 暂时禁用，等待ReactFlow集成
          >
            关系图
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddRelationship}
          >
            新增关系
          </Button>
        </Box>
      </Box>

      {viewMode === 'list' ? (
        // 列表视图
        <Grid container spacing={2}>
          {relationships.map((relationship) => (
            <Grid item xs={12} sm={6} key={relationship.id}>
              <Card>
                <CardContent>
                  {/* 关系主体 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: getRelationshipColor(relationship.type) + '.main' }}>
                      {getRelationshipIcon(relationship.type)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3">
                        {getCharacterName(relationship.fromCharacter)} 
                        {relationship.isReversible ? ' ↔ ' : ' → '}
                        {getCharacterName(relationship.toCharacter)}
                      </Typography>
                      <Chip 
                        label={getRelationshipLabel(relationship.type)}
                        color={getRelationshipColor(relationship.type)}
                        size="small"
                      />
                    </Box>
                  </Box>

                  {/* 关系描述 */}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>关系：</strong>{relationship.description}
                  </Typography>

                  {/* 发展阶段 */}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>阶段：</strong>{relationship.developmentStage}
                  </Typography>

                  {/* 关系强度 */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      <strong>强度：</strong>{relationship.intensity}/10
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {Array.from({ length: 10 }, (_, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 16,
                            height: 4,
                            backgroundColor: i < relationship.intensity ? 
                              getRelationshipColor(relationship.type) + '.main' : 'grey.300',
                            borderRadius: 2
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  {/* 操作按钮 */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEditRelationship(relationship)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteRelationship(relationship.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        // 可视化视图 (占位符)
        <Paper sx={{ p: 4, textAlign: 'center', height: 400 }}>
          <MapIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            关系图可视化
          </Typography>
          <Typography variant="body2" color="text.secondary">
            可视化关系图功能正在开发中...
            <br />
            将使用ReactFlow实现交互式关系图谱
          </Typography>
        </Paper>
      )}

      {/* 关系编辑对话框 */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedRelationship ? '编辑关系' : '新增关系'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>起始角色</InputLabel>
                  <Select
                    value={selectedRelationship?.fromCharacter || ''}
                    label="起始角色"
                  >
                    {mockCharacters.map((character) => (
                      <MenuItem key={character.id} value={character.id}>
                        {character.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>目标角色</InputLabel>
                  <Select
                    value={selectedRelationship?.toCharacter || ''}
                    label="目标角色"
                  >
                    {mockCharacters.map((character) => (
                      <MenuItem key={character.id} value={character.id}>
                        {character.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>关系类型</InputLabel>
                  <Select
                    value={selectedRelationship?.type || 'friend'}
                    label="关系类型"
                  >
                    <MenuItem value="family">亲情</MenuItem>
                    <MenuItem value="lover">爱情</MenuItem>
                    <MenuItem value="friend">友情</MenuItem>
                    <MenuItem value="enemy">敌对</MenuItem>
                    <MenuItem value="mentor">师徒</MenuItem>
                    <MenuItem value="rival">竞争</MenuItem>
                    <MenuItem value="colleague">同事</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="关系描述"
                  value={selectedRelationship?.description || ''}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="发展阶段"
                  value={selectedRelationship?.developmentStage || ''}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSaveRelationship} variant="contained">
            {selectedRelationship ? '保存' : '创建'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RelationshipMap;