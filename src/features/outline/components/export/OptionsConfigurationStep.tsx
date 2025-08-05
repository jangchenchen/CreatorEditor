import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  TextField
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { ExportOptions } from '../../services/documentExportService';

interface OptionsConfigurationStepProps {
  exportOptions: ExportOptions;
  onModuleToggle: (module: keyof ExportOptions['includeModules']) => void;
  onFormattingChange: (field: keyof ExportOptions['formatting'], value: any) => void;
}

export const OptionsConfigurationStep: React.FC<OptionsConfigurationStepProps> = ({
  exportOptions,
  onModuleToggle,
  onFormattingChange
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        配置导出选项
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">包含模块</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeModules.story}
                      onChange={() => onModuleToggle('story')}
                    />
                  }
                  label="故事概述"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeModules.characters}
                      onChange={() => onModuleToggle('characters')}
                    />
                  }
                  label="角色设定"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeModules.timeline}
                      onChange={() => onModuleToggle('timeline')}
                    />
                  }
                  label="情节时间线"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeModules.world}
                      onChange={() => onModuleToggle('world')}
                    />
                  }
                  label="世界设定"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeModules.chapters}
                      onChange={() => onModuleToggle('chapters')}
                    />
                  }
                  label="章节大纲"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeModules.themes}
                      onChange={() => onModuleToggle('themes')}
                    />
                  }
                  label="主题分析"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeModules.subplots}
                      onChange={() => onModuleToggle('subplots')}
                    />
                  }
                  label="副线情节"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeModules.ideas}
                      onChange={() => onModuleToggle('ideas')}
                    />
                  }
                  label="创意想法"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {(exportOptions.format === 'docx' || exportOptions.format === 'pdf') && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">格式设置</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="文档标题"
                  value={exportOptions.formatting.title}
                  onChange={(e) => onFormattingChange('title', e.target.value)}
                  placeholder="输入文档标题"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="作者姓名"
                  value={exportOptions.formatting.author}
                  onChange={(e) => onFormattingChange('author', e.target.value)}
                  placeholder="输入作者姓名"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="字体大小"
                  value={exportOptions.formatting.fontSize}
                  onChange={(e) => onFormattingChange('fontSize', parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 8, max: 24 } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="字体族"
                  value={exportOptions.formatting.fontFamily}
                  onChange={(e) => onFormattingChange('fontFamily', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={exportOptions.formatting.includeCoverPage}
                        onChange={(e) => onFormattingChange('includeCoverPage', e.target.checked)}
                      />
                    }
                    label="包含封面页"
                  />
                  {exportOptions.format === 'docx' && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={exportOptions.formatting.includeTableOfContents}
                          onChange={(e) => onFormattingChange('includeTableOfContents', e.target.checked)}
                        />
                      }
                      label="包含目录"
                    />
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={exportOptions.formatting.pageNumbers}
                        onChange={(e) => onFormattingChange('pageNumbers', e.target.checked)}
                      />
                    }
                    label="页码"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};