/**
 * 表单验证Hook
 * 提供表单验证状态管理和验证逻辑
 */
// @ts-nocheck


import { useState, useCallback, useMemo } from 'react';
import {
  ValidationRule,
  ValidationError,
  validateForm,
  validateField,
} from '../utils/formValidation';

interface UseFormValidationOptions {
  validationRules: Record<string, ValidationRule>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

interface UseFormValidationReturn {
  errors: ValidationError[];
  isValid: boolean;
  isSubmitted: boolean;
  validateField: (fieldName: string, value: any) => void;
  validateForm: (data: Record<string, any>) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: string) => void;
  getFieldError: (fieldName: string) => string | null;
  hasFieldError: (fieldName: string) => boolean;
  setSubmitted: (submitted: boolean) => void;
}

export function useFormValidation({
  validationRules,
  validateOnChange = false,
  validateOnBlur = true,
}: UseFormValidationOptions): UseFormValidationReturn {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 验证单个字段
  const validateSingleField = useCallback(
    (fieldName: string, value: any) => {
      const rules = validationRules[fieldName];
      if (!rules) return;

      const error = validateField(fieldName, value, rules);

      setErrors(prevErrors => {
        // 移除该字段的旧错误
        const filteredErrors = prevErrors.filter(e => e.field !== fieldName);

        // 如果有新错误，添加它
        if (error) {
          return [...filteredErrors, error];
        }

        return filteredErrors;
      });
    },
    [validationRules]
  );

  // 验证整个表单
  const validateWholeForm = useCallback(
    (data: Record<string, any>): boolean => {
      const result = validateForm(data, validationRules);
      setErrors(result.errors);
      setIsSubmitted(true);
      return result.isValid;
    },
    [validationRules]
  );

  // 清除所有错误
  const clearErrors = useCallback(() => {
    setErrors([]);
    setIsSubmitted(false);
  }, []);

  // 清除特定字段的错误
  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prevErrors => prevErrors.filter(e => e.field !== fieldName));
  }, []);

  // 获取字段错误
  const getFieldError = useCallback(
    (fieldName: string): string | null => {
      const error = errors.find(e => e.field === fieldName);
      return error ? error.message : null;
    },
    [errors]
  );

  // 检查字段是否有错误
  const hasFieldError = useCallback(
    (fieldName: string): boolean => {
      return errors.some(e => e.field === fieldName);
    },
    [errors]
  );

  // 设置提交状态
  const setSubmitted = useCallback((submitted: boolean) => {
    setIsSubmitted(submitted);
  }, []);

  // 计算表单是否有效
  const isValid = useMemo(() => {
    return errors.length === 0;
  }, [errors]);

  return {
    errors,
    isValid,
    isSubmitted,
    validateField: validateSingleField,
    validateForm: validateWholeForm,
    clearErrors,
    clearFieldError,
    getFieldError,
    hasFieldError,
    setSubmitted,
  };
}
