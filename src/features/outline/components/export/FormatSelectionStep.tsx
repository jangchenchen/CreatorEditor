import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert
} from '@mui/material';

interface FormatSelectionStepProps {
  selectedFormat: 'json' | 'docx' | 'pdf';
  onFormatChange: (format: 'json' | 'docx' | 'pdf') => void;
  validationResult: { isValid: boolean; issues: string[] } | null;
}

export const FormatSelectionStep: React.FC<FormatSelectionStepProps> = ({
  selectedFormat,
  onFormatChange,
  validationResult
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        选择导出格式
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedFormat}
          onChange={(e) => onFormatChange(e.target.value as any)}
        >
          <FormControlLabel
            value="json"
            control={<Radio />}
            label={
              <Box>
                <Typography variant="body1">JSON 格式</Typography>
                <Typography variant="body2" color="text.secondary">
                  结构化数据，适合程序处理和数据交换
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            value="docx"
            control={<Radio />}
            label={
              <Box>
                <Typography variant="body1">Word 文档 (.docx)</Typography>
                <Typography variant="body2" color="text.secondary">
                  可编辑的文档格式，适合进一步编辑和格式化
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            value="pdf"
            control={<Radio />}
            label={
              <Box>
                <Typography variant="body1">PDF 文档</Typography>
                <Typography variant="body2" color="text.secondary">
                  固定格式文档，适合阅读和打印
                </Typography>
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>

      {validationResult && !validationResult.isValid && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            数据验证发现以下问题：
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {validationResult.issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </Alert>
      )}

      {validationResult && validationResult.isValid && validationResult.issues.length > 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            数据检查发现以下提示：
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {validationResult.issues.slice(0, 3).map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
          {validationResult.issues.length > 3 && (
            <Typography variant="body2" color="text.secondary">
              ...还有 {validationResult.issues.length - 3} 个提示
            </Typography>
          )}
        </Alert>
      )}
    </Box>
  );
};