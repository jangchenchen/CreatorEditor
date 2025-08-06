/**
 * ValidatedTextField 组件单元测试
 * 测试验证文本字段组件的功能
 */

import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, createMockChangeEvent } from '../../../../../tests/utils/testUtils';
import ValidatedTextField from '../ValidatedTextField';
import type { ValidationError } from '../../../utils/formValidation';

describe('ValidatedTextField', () => {
  const mockErrors: ValidationError[] = [];
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('basic rendering', () => {
    it('should render with required props', () => {
      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={mockErrors}
        />
      );

      expect(screen.getByLabelText('测试字段')).toBeInTheDocument();
    });

    it('should render with helper text', () => {
      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={mockErrors}
          helperText="这是帮助文本"
        />
      );

      expect(screen.getByText('这是帮助文本')).toBeInTheDocument();
    });

    it('should render as required field', () => {
      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={mockErrors}
          required
        />
      );

      const input = screen.getByLabelText('测试字段 *');
      expect(input).toBeInTheDocument();
      expect(input).toBeRequired();
    });

    it('should render as multiline', () => {
      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={mockErrors}
          multiline
          rows={4}
        />
      );

      const textarea = screen.getByLabelText('测试字段');
      expect(textarea.tagName).toBe('TEXTAREA');
    });
  });

  describe('value and onChange', () => {
    it('should display the provided value', () => {
      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value="测试值"
          onChange={mockOnChange}
          errors={mockErrors}
        />
      );

      const input = screen.getByDisplayValue('测试值');
      expect(input).toBeInTheDocument();
    });

    it('should call onChange when value changes', async () => {
      const user = userEvent.setup();
      
      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={mockErrors}
        />
      );

      const input = screen.getByLabelText('测试字段');
      await user.type(input, '新的值');

      expect(mockOnChange).toHaveBeenCalled();
    });

    it('should handle controlled input correctly', async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState('');
        
        return (
          <ValidatedTextField
            name="test"
            label="测试字段"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            errors={mockErrors}
          />
        );
      };

      renderWithProviders(<TestComponent />);
      
      const input = screen.getByLabelText('测试字段');
      await userEvent.type(input, 'Hello');

      expect(input).toHaveValue('Hello');
    });
  });

  describe('validation and errors', () => {
    it('should display validation error', () => {
      const errorsWithValidation: ValidationError[] = [
        { field: 'test', message: '此字段不能为空' }
      ];

      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={errorsWithValidation}
        />
      );

      expect(screen.getByText('此字段不能为空')).toBeInTheDocument();
    });

    it('should show error state styling', () => {
      const errorsWithValidation: ValidationError[] = [
        { field: 'test', message: '验证失败' }
      ];

      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={errorsWithValidation}
        />
      );

      const input = screen.getByLabelText('测试字段');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should display multiple errors for the same field', () => {
      const multipleErrors: ValidationError[] = [
        { field: 'test', message: '错误1' },
        { field: 'test', message: '错误2' }
      ];

      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={multipleErrors}
        />
      );

      expect(screen.getByText('错误1')).toBeInTheDocument();
      expect(screen.getByText('错误2')).toBeInTheDocument();
    });

    it('should not display errors for other fields', () => {
      const errorsForOtherField: ValidationError[] = [
        { field: 'otherField', message: '其他字段的错误' }
      ];

      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={errorsForOtherField}
        />
      );

      expect(screen.queryByText('其他字段的错误')).not.toBeInTheDocument();
    });

    it('should prioritize error text over helper text', () => {
      const errorsWithValidation: ValidationError[] = [
        { field: 'test', message: '验证错误' }
      ];

      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={errorsWithValidation}
          helperText="帮助文本"
        />
      );

      expect(screen.getByText('验证错误')).toBeInTheDocument();
      expect(screen.queryByText('帮助文本')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper aria attributes', () => {
      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={mockErrors}
          required
        />
      );

      const input = screen.getByLabelText('测试字段 *');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('should have aria-invalid when there are errors', () => {
      const errorsWithValidation: ValidationError[] = [
        { field: 'test', message: '验证失败' }
      ];

      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={errorsWithValidation}
        />
      );

      const input = screen.getByLabelText('测试字段');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should associate error messages with input', () => {
      const errorsWithValidation: ValidationError[] = [
        { field: 'test', message: '验证失败' }
      ];

      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={errorsWithValidation}
        />
      );

      const input = screen.getByLabelText('测试字段');
      const errorMessage = screen.getByText('验证失败');
      
      expect(input).toHaveAttribute('aria-describedby');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Material-UI props passthrough', () => {
    it('should pass through fullWidth prop', () => {
      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={mockErrors}
          fullWidth
        />
      );

      // TextField组件应该接收到fullWidth属性
      const textFieldContainer = screen.getByLabelText('测试字段').closest('.MuiTextField-root');
      expect(textFieldContainer).toHaveClass('MuiTextField-fullWidth');
    });

    it('should pass through disabled prop', () => {
      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={mockErrors}
          disabled
        />
      );

      const input = screen.getByLabelText('测试字段');
      expect(input).toBeDisabled();
    });

    it('should pass through placeholder prop', () => {
      renderWithProviders(
        <ValidatedTextField
          name="test"
          label="测试字段"
          value=""
          onChange={mockOnChange}
          errors={mockErrors}
          placeholder="请输入内容"
        />
      );

      const input = screen.getByPlaceholderText('请输入内容');
      expect(input).toBeInTheDocument();
    });
  });
});