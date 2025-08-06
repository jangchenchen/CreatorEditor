import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Box,
} from '@mui/material';
import { Timeline as ArcIcon } from '@mui/icons-material';
import { CharacterStepData } from './types';

interface ArcTimelineProps {
  steps: CharacterStepData[];
  activeStep: number;
  onStepClick: (step: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onEdit: (eventIndex: number) => void;
  isEditing: boolean;
  editingEvent: number | null;
  eventText: string;
  onEventTextChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ArcTimeline: React.FC<ArcTimelineProps> = ({
  steps,
  activeStep,
  onStepClick,
  onNext,
  onPrevious,
  onEdit,
  isEditing,
  editingEvent,
  eventText,
  onEventTextChange,
  onSave,
  onCancel,
}) => {
  const getStepColor = (type: string) => {
    switch (type) {
      case 'start':
        return 'primary';
      case 'end':
        return 'success';
      default:
        return 'inherit';
    }
  };

  const getStepBgColor = (type: string) => {
    switch (type) {
      case 'start':
        return 'grey.50';
      case 'end':
        return 'success.50';
      default:
        return 'primary.50';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ArcIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant='h6'>角色发展弧线</Typography>
        </Box>

        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, index) => (
            <Step key={index} completed={step.isCompleted}>
              <StepLabel onClick={() => onStepClick(step.index)} sx={{ cursor: 'pointer' }}>
                <Typography variant='subtitle1' color={getStepColor(step.type) as any}>
                  {step.title}
                </Typography>
              </StepLabel>
              <StepContent>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    mb: 2,
                    bgcolor: getStepBgColor(step.type),
                  }}
                >
                  {isEditing && editingEvent === step.index ? (
                    <Box>
                      <Typography variant='body2' gutterBottom>
                        编辑事件内容:
                      </Typography>
                      <Typography
                        contentEditable
                        suppressContentEditableWarning
                        onInput={e => onEventTextChange(e.currentTarget.textContent || '')}
                        sx={{
                          border: '1px solid #ccc',
                          padding: '8px',
                          borderRadius: '4px',
                          minHeight: '60px',
                          '&:focus': {
                            outline: 'none',
                            borderColor: 'primary.main',
                          },
                        }}
                      >
                        {eventText}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Button variant='contained' size='small' onClick={onSave} sx={{ mr: 1 }}>
                          保存
                        </Button>
                        <Button variant='outlined' size='small' onClick={onCancel}>
                          取消
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant='body1'>{step.content}</Typography>
                      {step.type === 'event' && (
                        <Button
                          variant='outlined'
                          size='small'
                          onClick={() => onEdit(step.index)}
                          sx={{ mt: 1 }}
                        >
                          编辑
                        </Button>
                      )}
                    </Box>
                  )}
                </Paper>

                <Box sx={{ mb: 1 }}>
                  {index > 0 && (
                    <Button variant='outlined' size='small' onClick={onPrevious} sx={{ mr: 1 }}>
                      上一步
                    </Button>
                  )}
                  {index < steps.length - 1 && (
                    <Button variant='contained' size='small' onClick={onNext}>
                      {index === steps.length - 2 ? '查看结果' : '下一步'}
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {/* 完成状态显示 */}
        {activeStep >= steps.length && (
          <Paper elevation={2} sx={{ p: 3, mt: 2, bgcolor: 'success.50' }}>
            <Typography variant='h6' color='success.main' gutterBottom>
              🎉 角色发展弧线完成！
            </Typography>
            <Typography variant='body1'>
              已经完成了从"{steps[0]?.content}"到"{steps[steps.length - 1]?.content}"的完整转变。
            </Typography>
            <Button variant='contained' size='small' onClick={() => onStepClick(0)} sx={{ mt: 2 }}>
              重新查看
            </Button>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};
