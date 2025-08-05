import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Chip,
  Divider,
  Grid,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp as GrowthIcon,
  Psychology as MotivationIcon,
  Timeline as ArcIcon
} from '@mui/icons-material';
import { Character } from '../../../types/outline.types';

// 模拟数据
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
      startState: '隐居修道的老道士',
      keyEvents: [
        '收下七名弟子',
        '创立武当派武学',
        '抗击外敌入侵',
        '成为武林盟主',
        '传承太极心法'
      ],
      endState: '德高望重的武学宗师',
      growthDirection: '从隐世高人到武林领袖'
    },
    tags: ['武当', '道教', '宗师'],
    createdAt: new Date(),
    lastUpdated: new Date()
  },
  {
    id: '2',
    name: '灭绝师太',
    role: 'antagonist',
    background: '峨眉派掌门，性格刚烈',
    personality: ['严厉', '固执', '正义感强'],
    appearance: '面容严肃，不苟言笑',
    goals: '维护峨眉声誉',
    motivation: '对正邪分明的执着',
    arc: {
      startState: '正义但偏激的师太',
      keyEvents: [
        '与其他门派结仇',
        '偏听偏信谣言',
        '做出错误判断',
        '意识到自己的错误',
        '最终和解'
      ],
      endState: '学会宽容的长者',
      growthDirection: '从偏激到宽容'
    },
    tags: ['峨眉', '师太', '正派'],
    createdAt: new Date(),
    lastUpdated: new Date()
  }
];

const CharacterArc: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(mockCharacters[0]);
  const [activeStep, setActiveStep] = useState(0);

  const handleCharacterChange = (characterId: string) => {
    const character = mockCharacters.find(c => c.id === characterId) || null;
    setSelectedCharacter(character);
    setActiveStep(0);
  };

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  if (!selectedCharacter) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <Typography color="text.secondary">请选择要查看的角色</Typography>
      </Box>
    );
  }

  const progress = ((activeStep + 1) / (selectedCharacter.arc.keyEvents.length + 2)) * 100;

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* 角色选择器 */}
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>选择角色</InputLabel>
          <Select
            value={selectedCharacter.id}
            label="选择角色"
            onChange={(e) => handleCharacterChange(e.target.value)}
          >
            {mockCharacters.map((character) => (
              <MenuItem key={character.id} value={character.id}>
                {character.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* 角色基本信息 */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {selectedCharacter.name}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={selectedCharacter.role === 'protagonist' ? '主角' : 
                        selectedCharacter.role === 'antagonist' ? '反派' : '配角'}
                  color={selectedCharacter.role === 'protagonist' ? 'primary' : 
                         selectedCharacter.role === 'antagonist' ? 'secondary' : 'success'}
                  size="small"
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* 成长方向 */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <GrowthIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle2">成长方向</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {selectedCharacter.arc.growthDirection}
                </Typography>
              </Box>

              {/* 核心动机 */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <MotivationIcon sx={{ mr: 1, color: 'secondary.main' }} />
                  <Typography variant="subtitle2">核心动机</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {selectedCharacter.motivation}
                </Typography>
              </Box>

              {/* 进度指示器 */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  发展进度 ({Math.round(progress)}%)
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={progress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 发展弧线时间线 */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ArcIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">角色发展弧线</Typography>
              </Box>

              <Stepper activeStep={activeStep} orientation="vertical">
                {/* 起始状态 */}
                <Step completed={activeStep > 0}>
                  <StepLabel onClick={() => handleStepClick(0)} sx={{ cursor: 'pointer' }}>
                    <Typography variant="subtitle1" color="primary">
                      起始状态
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="body1">
                        {selectedCharacter.arc.startState}
                      </Typography>
                    </Paper>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleStepClick(1)}
                    >
                      下一步
                    </Button>
                  </StepContent>
                </Step>

                {/* 关键事件 */}
                {selectedCharacter.arc.keyEvents.map((event, index) => (
                  <Step key={index} completed={activeStep > index + 1}>
                    <StepLabel 
                      onClick={() => handleStepClick(index + 1)} 
                      sx={{ cursor: 'pointer' }}
                    >
                      <Typography variant="subtitle1">
                        关键事件 {index + 1}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'primary.50' }}>
                        <Typography variant="body1">
                          {event}
                        </Typography>
                      </Paper>
                      <Box sx={{ mb: 1 }}>
                        {index > 0 && (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleStepClick(index)}
                            sx={{ mr: 1 }}
                          >
                            上一步
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleStepClick(index + 2)}
                        >
                          {index === selectedCharacter.arc.keyEvents.length - 1 ? '查看结果' : '下一步'}
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}

                {/* 最终状态 */}
                <Step completed={activeStep >= selectedCharacter.arc.keyEvents.length + 1}>
                  <StepLabel 
                    onClick={() => handleStepClick(selectedCharacter.arc.keyEvents.length + 1)} 
                    sx={{ cursor: 'pointer' }}
                  >
                    <Typography variant="subtitle1" color="success.main">
                      最终状态
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'success.50' }}>
                      <Typography variant="body1">
                        {selectedCharacter.arc.endState}
                      </Typography>
                    </Paper>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleStepClick(selectedCharacter.arc.keyEvents.length)}
                    >
                      上一步
                    </Button>
                  </StepContent>
                </Step>
              </Stepper>

              {/* 完成状态显示 */}
              {activeStep > selectedCharacter.arc.keyEvents.length + 1 && (
                <Paper elevation={2} sx={{ p: 3, mt: 2, bgcolor: 'success.50' }}>
                  <Typography variant="h6" color="success.main" gutterBottom>
                    🎉 角色发展弧线完成！
                  </Typography>
                  <Typography variant="body1">
                    {selectedCharacter.name} 已经完成了从"{selectedCharacter.arc.startState}"到"{selectedCharacter.arc.endState}"的完整转变。
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleStepClick(0)}
                    sx={{ mt: 2 }}
                  >
                    重新查看
                  </Button>
                </Paper>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterArc;