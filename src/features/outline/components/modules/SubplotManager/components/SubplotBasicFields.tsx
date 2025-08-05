import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Subplot } from '../../../../types/outline.types';

interface SubplotBasicFieldsProps {
  formData: Partial<Subplot>;
  onFormChange: (field: keyof Subplot) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => void;
}

const SubplotBasicFields: React.FC<SubplotBasicFieldsProps> = ({
  formData,
  onFormChange
}) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="副线标题"
          value={formData.title || ''}
          onChange={onFormChange('title')}
          required
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="副线描述"
          value={formData.description || ''}
          onChange={onFormChange('description')}
          placeholder="详细描述这个副线情节的内容..."
        />
      </Grid>

      {/* 类型和状态 */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>副线目的</InputLabel>
          <Select
            value={formData.purpose || 'background'}
            onChange={onFormChange('purpose')}
            label="副线目的"
          >
            <MenuItem value="background">背景补充</MenuItem>
            <MenuItem value="contrast">对比衬托</MenuItem>
            <MenuItem value="suspense">悬念营造</MenuItem>
            <MenuItem value="character-development">角色发展</MenuItem>
            <MenuItem value="comic-relief">轻松调剂</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>当前状态</InputLabel>
          <Select
            value={formData.status || 'planned'}
            onChange={onFormChange('status')}
            label="当前状态"
          >
            <MenuItem value="planned">计划中</MenuItem>
            <MenuItem value="active">进行中</MenuItem>
            <MenuItem value="resolved">已解决</MenuItem>
            <MenuItem value="abandoned">已放弃</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default SubplotBasicFields;