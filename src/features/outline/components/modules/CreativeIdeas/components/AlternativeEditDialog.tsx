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
  Typography,
  IconButton
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { PlotAlternative } from '../../../../types/outline.types';

interface AlternativeEditDialogProps {
  open: boolean;
  editingAlternative: PlotAlternative | null;
  formData: Partial<PlotAlternative>;
  onClose: () => void;
  onSave: () => void;
  onFormChange: (field: keyof PlotAlternative) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onListFieldChange: (field: 'pros' | 'cons', index: number, value: string) => void;
  onAddListItem: (field: 'pros' | 'cons') => void;
  onRemoveListItem: (field: 'pros' | 'cons', index: number) => void;
}

const AlternativeEditDialog: React.FC<AlternativeEditDialogProps> = ({
  open,
  editingAlternative,
  formData,
  onClose,
  onSave,
  onFormChange,
  onListFieldChange,
  onAddListItem,
  onRemoveListItem
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingAlternative ? '编辑替代方案' : '添加新替代方案'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* 原始情节元素 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="原始情节元素"
                value={formData.originalElement || ''}
                onChange={onFormChange('originalElement')}
                placeholder="描述当前的情节安排或角色设定..."
                required
              />
            </Grid>

            {/* 替代版本 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="替代版本"
                value={formData.alternativeVersion || ''}
                onChange={onFormChange('alternativeVersion')}
                placeholder="描述替代的情节发展或角色设定..."
                required
              />
            </Grid>

            {/* 优点 */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                优点分析
              </Typography>
              {(formData.pros || []).map((pro, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label={`优点 ${index + 1}`}
                    value={pro}
                    onChange={(e) => onListFieldChange('pros', index, e.target.value)}
                  />
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => onRemoveListItem('pros', index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button 
                size="small" 
                startIcon={<AddIcon />}
                onClick={() => onAddListItem('pros')}
              >
                添加优点
              </Button>
            </Grid>

            {/* 缺点 */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                缺点分析
              </Typography>
              {(formData.cons || []).map((con, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label={`缺点 ${index + 1}`}
                    value={con}
                    onChange={(e) => onListFieldChange('cons', index, e.target.value)}
                  />
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => onRemoveListItem('cons', index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button 
                size="small" 
                startIcon={<AddIcon />}
                onClick={() => onAddListItem('cons')}
              >
                添加缺点
              </Button>
            </Grid>

            {/* 影响分析 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="影响分析"
                value={formData.impact || ''}
                onChange={onFormChange('impact')}
                placeholder="分析这个替代方案对整体故事结构、角色发展、主题表达的影响..."
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
          disabled={!formData.originalElement || !formData.alternativeVersion}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlternativeEditDialog;