import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { Character, CharacterRole } from '../../../types/outline.types';

// 模拟数据 - 后续将从Redux store获取
const mockCharacters: Character[] = [
  {
    id: '1',
    name: '张三丰',
    role: 'protagonist',
    background: '武当山道士，武学宗师',
    personality: ['睿智', '慈祥', '武艺高强'],
    appearance: '须发皆白，仙风道骨',
    goals: '保护武当，传承武学',
    motivation: '维护武林正道',
    arc: {
      startState: '隐居修道',
      keyEvents: ['收徒', '抗击外敌', '创立武当'],
      endState: '武学大成',
      growthDirection: '从隐士到领袖'
    },
    tags: ['武当', '道教', '宗师'],
    createdAt: new Date(),
    lastUpdated: new Date()
  }
];

const CharacterProfile: React.FC = () => {
  const [characters] = useState<Character[]>(mockCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const getRoleColor = (role: CharacterRole): "primary" | "secondary" | "success" | "warning" => {
    switch (role) {
      case 'protagonist': return 'primary';
      case 'antagonist': return 'secondary';
      case 'supporting': return 'success';
      case 'minor': return 'warning';
      default: return 'primary';
    }
  };

  const getRoleLabel = (role: CharacterRole): string => {
    switch (role) {
      case 'protagonist': return '主角';
      case 'antagonist': return '反派';
      case 'supporting': return '配角';
      case 'minor': return '次要';
      default: return '未知';
    }
  };

  const handleEditCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleAddCharacter = () => {
    setSelectedCharacter(null);
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCharacter(null);
    setEditMode(false);
  };

  const handleSaveCharacter = () => {
    // TODO: 实现保存逻辑
    console.log('保存角色:', selectedCharacter);
    handleCloseDialog();
  };

  const handleDeleteCharacter = (characterId: string) => {
    // TODO: 实现删除逻辑
    console.log('删除角色:', characterId);
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* 角色列表 */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          角色档案 ({characters.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCharacter}
          size="small"
        >
          新增角色
        </Button>
      </Box>

      <Grid container spacing={2}>
        {characters.map((character) => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                {/* 角色头像和基本信息 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    <PersonIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3">
                      {character.name}
                    </Typography>
                    <Chip 
                      label={getRoleLabel(character.role)}
                      color={getRoleColor(character.role)}
                      size="small"
                    />
                  </Box>
                </Box>

                {/* 角色背景 */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>背景：</strong>{character.background}
                </Typography>

                {/* 外貌描述 */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>外貌：</strong>{character.appearance}
                </Typography>

                {/* 性格特征 */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    <strong>性格：</strong>
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                    {character.personality.slice(0, 3).map((trait, index) => (
                      <Chip 
                        key={index}
                        label={trait} 
                        variant="outlined" 
                        size="small"
                      />
                    ))}
                    {character.personality.length > 3 && (
                      <Chip 
                        label={`+${character.personality.length - 3}`}
                        variant="outlined" 
                        size="small"
                        color="secondary"
                      />
                    )}
                  </Stack>
                </Box>

                {/* 目标动机 */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>目标：</strong>{character.goals}
                </Typography>

                {/* 标签 */}
                <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                  {character.tags.slice(0, 2).map((tag, index) => (
                    <Chip 
                      key={index}
                      label={tag} 
                      size="small" 
                      color="primary"
                      variant="filled"
                    />
                  ))}
                  {character.tags.length > 2 && (
                    <Chip 
                      label="..."
                      size="small" 
                      color="primary"
                      variant="outlined"
                    />
                  )}
                </Stack>
              </CardContent>

              <Divider />
              
              <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  更新: {character.lastUpdated.toLocaleDateString()}
                </Typography>
                
                <Box>
                  <IconButton 
                    size="small" 
                    onClick={() => handleEditCharacter(character)}
                    color="primary"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDeleteCharacter(character.id)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 角色编辑对话框 */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editMode ? '编辑角色' : '新增角色'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="角色姓名"
                  value={selectedCharacter?.name || ''}
                  onChange={(e) => setSelectedCharacter(prev => 
                    prev ? { ...prev, name: e.target.value } : null
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>角色类型</InputLabel>
                  <Select
                    value={selectedCharacter?.role || 'supporting'}
                    label="角色类型"
                    onChange={(e) => setSelectedCharacter(prev => 
                      prev ? { ...prev, role: e.target.value as CharacterRole } : null
                    )}
                  >
                    <MenuItem value="protagonist">主角</MenuItem>
                    <MenuItem value="antagonist">反派</MenuItem>
                    <MenuItem value="supporting">配角</MenuItem>
                    <MenuItem value="minor">次要</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="角色背景"
                  value={selectedCharacter?.background || ''}
                  onChange={(e) => setSelectedCharacter(prev => 
                    prev ? { ...prev, background: e.target.value } : null
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="外貌描述"
                  value={selectedCharacter?.appearance || ''}
                  onChange={(e) => setSelectedCharacter(prev => 
                    prev ? { ...prev, appearance: e.target.value } : null
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="目标动机"
                  value={selectedCharacter?.goals || ''}
                  onChange={(e) => setSelectedCharacter(prev => 
                    prev ? { ...prev, goals: e.target.value } : null
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSaveCharacter} variant="contained">
            {editMode ? '保存' : '创建'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CharacterProfile;