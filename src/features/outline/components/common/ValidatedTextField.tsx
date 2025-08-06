/**
 * 带验证的文本输入框组件
 * 提供统一的验证UI和错误显示
 */

import React from 'react';
import { TextField, TextFieldProps, FormHelperText } from '@mui/material';
import { ValidationError, hasFieldError, getFieldError } from '../../utils/formValidation';

interface ValidatedTextFieldProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
  name: string;
  errors?: ValidationError[];
  helperText?: string;
}

export const ValidatedTextField: React.FC<ValidatedTextFieldProps> = ({
  name,
  errors = [],
  helperText,
  ...textFieldProps
}) => {
  const hasError = hasFieldError(name, errors);
  const errorMessage = getFieldError(name, errors);

  return (
    <TextField
      {...textFieldProps}
      name={name}
      error={hasError}
      helperText={
        hasError ? (
          <FormHelperText error>{errorMessage}</FormHelperText>
        ) : (
          helperText && <FormHelperText>{helperText}</FormHelperText>
        )
      }
    />
  );
};
