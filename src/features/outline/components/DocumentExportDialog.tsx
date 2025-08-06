import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from '@mui/material';
import { FileDownload as ExportIcon } from '@mui/icons-material';
import { useExportDialogState } from '../../hooks/useExportDialogState';
import { FormatSelectionStep } from './export/FormatSelectionStep';
import { OptionsConfigurationStep } from './export/OptionsConfigurationStep';
import { ExportConfirmationStep } from './export/ExportConfirmationStep';

interface DocumentExportDialogProps {
  open: boolean;
  onClose: () => void;
  defaultFormat?: 'json' | 'docx' | 'pdf';
}

const DocumentExportDialog: React.FC<DocumentExportDialogProps> = ({
  open,
  onClose,
  defaultFormat = 'docx',
}) => {
  const {
    state,
    resetState,
    handleFormatChange,
    handleModuleToggle,
    handleFormattingChange,
    handleNext,
    handleBack,
    handleExport,
    canProceed,
    isExporting,
    progress,
    lastExportError,
  } = useExportDialogState(defaultFormat);

  const steps = ['选择格式', '配置选项', '确认导出'];

  React.useEffect(() => {
    if (open) {
      resetState();
    }
  }, [open, resetState]);

  const handleClose = () => {
    if (!isExporting) {
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (state.activeStep) {
      case 0:
        return (
          <FormatSelectionStep
            selectedFormat={state.exportOptions.format}
            onFormatChange={handleFormatChange}
            validationResult={state.validationResult}
          />
        );
      case 1:
        return (
          <OptionsConfigurationStep
            exportOptions={state.exportOptions}
            onModuleToggle={handleModuleToggle}
            onFormattingChange={handleFormattingChange}
          />
        );
      case 2:
        return (
          <ExportConfirmationStep
            exportOptions={state.exportOptions}
            isExporting={isExporting}
            progress={progress}
            lastExportError={lastExportError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='md'
      fullWidth
      disableEscapeKeyDown={isExporting}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ExportIcon />
          导出文档
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Stepper activeStep={state.activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {renderStepContent()}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={isExporting}>
          {progress?.stage === 'complete' ? '关闭' : '取消'}
        </Button>

        {state.activeStep > 0 && (
          <Button onClick={handleBack} disabled={isExporting}>
            上一步
          </Button>
        )}

        {state.activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant='contained' disabled={!canProceed()}>
            下一步
          </Button>
        ) : (
          <Button
            onClick={handleExport}
            variant='contained'
            disabled={isExporting || !canProceed()}
            startIcon={isExporting ? undefined : <ExportIcon />}
          >
            {isExporting ? '导出中...' : '开始导出'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DocumentExportDialog;
