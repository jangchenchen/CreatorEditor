import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Autocomplete
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { PlotEvent, Character } from '../../../../types/outline.types';

interface EventEditDialogProps {
  open: boolean;
  editingEvent: PlotEvent | null;
  formData: Partial<PlotEvent>;
  characters: Character[];
  onClose: () => void;
  onSave: () => void;
  onFormChange: (field: keyof PlotEvent) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => void;
  onArrayFieldChange: (field: keyof Pick<PlotEvent, 'characters' | 'locations' | 'consequences' | 'relatedEvents' | 'tags'>) => (
    event: any,
    newValue: string[]
  ) => void;
  onSwitchChange: (field: keyof PlotEvent) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const EventEditDialog: React.FC<EventEditDialogProps> = ({
  open,
  editingEvent,
  formData,
  characters,
  onClose,
  onSave,
  onFormChange,
  onArrayFieldChange,
  onSwitchChange
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingEvent ? '编辑事件' : '添加新事件'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* 基本信息 */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="事件标题"
                value={formData.title || ''}
                onChange={onFormChange('title')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="时间点"
                value={formData.timestamp || ''}
                onChange={onFormChange('timestamp')}
                placeholder="例如: 第三天晚上, 2023年春天"
                required
              />
            </Grid>

            {/* 类型和重要性 */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>事件类型</InputLabel>
                <Select
                  value={formData.type || 'development'}
                  onChange={onFormChange('type')}
                  label="事件类型"
                >
                  <MenuItem value="beginning">开端</MenuItem>
                  <MenuItem value="development">发展</MenuItem>
                  <MenuItem value="climax">高潮</MenuItem>
                  <MenuItem value="resolution">结局</MenuItem>
                  <MenuItem value="transition">过渡</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>重要性</InputLabel>
                <Select
                  value={formData.importance || 'important'}
                  onChange={onFormChange('importance')}
                  label="重要性"
                >
                  <MenuItem value="critical">关键</MenuItem>
                  <MenuItem value="important">重要</MenuItem>
                  <MenuItem value="minor">次要</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* 描述 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="事件描述"
                value={formData.description || ''}
                onChange={onFormChange('description')}
              />
            </Grid>

            {/* 影响和后果 */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="对故事的影响"
                value={formData.impact || ''}
                onChange={onFormChange('impact')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.consequences || []}
                onChange={onArrayFieldChange('consequences')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="后续影响"
                    placeholder="输入后果并按回车"
                  />
                )}
              />
            </Grid>

            {/* 涉及角色 */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={characters.map(c => c.id)}
                getOptionLabel={(option) => characters.find(c => c.id === option)?.name || option}
                value={formData.characters || []}
                onChange={onArrayFieldChange('characters')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="涉及角色"
                    placeholder="选择相关角色"
                  />
                )}
              />
            </Grid>

            {/* 地点和标签 */}
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.locations || []}
                onChange={onArrayFieldChange('locations')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="发生地点"
                    placeholder="输入地点并按回车"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.tags || []}
                onChange={onArrayFieldChange('tags')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="标签"
                    placeholder="输入标签并按回车"
                  />
                )}
              />
            </Grid>

            {/* 关键事件开关 */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isKeyEvent || false}
                    onChange={onSwitchChange('isKeyEvent')}
                  />
                }
                label="标记为关键事件"
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
          onClick={onSave} 
          variant="contained" 
          startIcon={<SaveIcon />}
          disabled={!formData.title || !formData.timestamp}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventEditDialog;