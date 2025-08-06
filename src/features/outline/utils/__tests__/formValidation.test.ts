/**
 * FormValidation 单元测试
 * 测试表单验证工具函数
 */

import {
  ValidationRule,
  ValidationError,
  validateField,
  validateForm,
  formValidationSets,
  createValidationRule
} from '../formValidation';

describe('formValidation', () => {
  describe('createValidationRule', () => {
    it('should create a basic validation rule', () => {
      const rule = createValidationRule('不能为空', (value) => value.length > 0);
      
      expect(rule.message).toBe('不能为空');
      expect(rule.validate('test')).toBe(true);
      expect(rule.validate('')).toBe(false);
    });

    it('should create rule with custom error message', () => {
      const rule = createValidationRule(
        '长度必须超过5个字符',
        (value) => value.length > 5
      );
      
      expect(rule.validate('hello')).toBe(false);
      expect(rule.validate('hello world')).toBe(true);
    });
  });

  describe('validateField', () => {
    const rules: ValidationRule[] = [
      createValidationRule('不能为空', (value) => value.trim().length > 0),
      createValidationRule('长度不能超过50个字符', (value) => value.length <= 50)
    ];

    it('should return empty array for valid input', () => {
      const errors = validateField('有效的输入', rules);
      
      expect(errors).toEqual([]);
    });

    it('should return error for empty input', () => {
      const errors = validateField('', rules);
      
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('');
      expect(errors[0].message).toBe('不能为空');
    });

    it('should return error for too long input', () => {
      const longText = 'a'.repeat(51);
      const errors = validateField(longText, rules);
      
      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe('长度不能超过50个字符');
    });

    it('should return multiple errors', () => {
      const errors = validateField('', [
        createValidationRule('错误1', () => false),
        createValidationRule('错误2', () => false)
      ]);
      
      expect(errors).toHaveLength(2);
      expect(errors[0].message).toBe('错误1');
      expect(errors[1].message).toBe('错误2');
    });
  });

  describe('validateForm', () => {
    const formData = {
      name: '张三',
      email: 'zhangsan@example.com',
      age: '25'
    };

    const validationRules = {
      name: [createValidationRule('姓名不能为空', (value) => value.length > 0)],
      email: [
        createValidationRule('邮箱不能为空', (value) => value.length > 0),
        createValidationRule('邮箱格式不正确', (value) => /@/.test(value))
      ],
      age: [createValidationRule('年龄必须是数字', (value) => !isNaN(Number(value)))]
    };

    it('should return empty array for valid form', () => {
      const errors = validateForm(formData, validationRules);
      
      expect(errors).toEqual([]);
    });

    it('should return errors for invalid form', () => {
      const invalidData = {
        name: '',
        email: 'invalid-email',
        age: 'not-a-number'
      };

      const errors = validateForm(invalidData, validationRules);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.find(e => e.field === 'name')).toBeTruthy();
      expect(errors.find(e => e.field === 'email')).toBeTruthy();
      expect(errors.find(e => e.field === 'age')).toBeTruthy();
    });

    it('should validate only provided fields', () => {
      const partialData = { name: '李四' };
      const errors = validateForm(partialData, validationRules);
      
      expect(errors).toEqual([]);
    });
  });

  describe('formValidationSets', () => {
    describe('character validation', () => {
      it('should validate character name', () => {
        const { name } = formValidationSets.character;
        
        expect(validateField('张三', name)).toEqual([]);
        expect(validateField('', name)).toHaveLength(1);
        expect(validateField('a'.repeat(51), name)).toHaveLength(1);
      });

      it('should validate character age', () => {
        const { age } = formValidationSets.character;
        
        expect(validateField('25', age)).toEqual([]);
        expect(validateField('0', age)).toHaveLength(1);
        expect(validateField('101', age)).toHaveLength(1);
        expect(validateField('abc', age)).toHaveLength(1);
      });

      it('should validate character background', () => {
        const { background } = formValidationSets.character;
        
        expect(validateField('简短背景', background)).toEqual([]);
        expect(validateField('', background)).toHaveLength(1);
        expect(validateField('a'.repeat(501), background)).toHaveLength(1);
      });
    });

    describe('event validation', () => {
      it('should validate event title', () => {
        const { title } = formValidationSets.event;
        
        expect(validateField('事件标题', title)).toEqual([]);
        expect(validateField('', title)).toHaveLength(1);
        expect(validateField('a'.repeat(101), title)).toHaveLength(1);
      });

      it('should validate event description', () => {
        const { description } = formValidationSets.event;
        
        expect(validateField('事件描述', description)).toEqual([]);
        expect(validateField('', description)).toHaveLength(1);
        expect(validateField('a'.repeat(1001), description)).toHaveLength(1);
      });
    });

    describe('chapter validation', () => {
      it('should validate chapter title', () => {
        const { title } = formValidationSets.chapter;
        
        expect(validateField('章节标题', title)).toEqual([]);
        expect(validateField('', title)).toHaveLength(1);
        expect(validateField('a'.repeat(101), title)).toHaveLength(1);
      });

      it('should validate chapter summary', () => {
        const { summary } = formValidationSets.chapter;
        
        expect(validateField('章节摘要', summary)).toEqual([]);
        expect(validateField('', summary)).toHaveLength(1);
        expect(validateField('a'.repeat(501), summary)).toHaveLength(1);
      });
    });

    describe('region validation', () => {
      it('should validate region name', () => {
        const { name } = formValidationSets.region;
        
        expect(validateField('地区名称', name)).toEqual([]);
        expect(validateField('', name)).toHaveLength(1);
        expect(validateField('a'.repeat(51), name)).toHaveLength(1);
      });

      it('should validate region description', () => {
        const { description } = formValidationSets.region;
        
        expect(validateField('地区描述', description)).toEqual([]);
        expect(validateField('', description)).toHaveLength(1);
        expect(validateField('a'.repeat(301), description)).toHaveLength(1);
      });
    });

    describe('relationship validation', () => {
      it('should validate relationship description', () => {
        const { description } = formValidationSets.relationship;
        
        expect(validateField('关系描述', description)).toEqual([]);
        expect(validateField('', description)).toHaveLength(1);
        expect(validateField('a'.repeat(301), description)).toHaveLength(1);
      });

      it('should validate relationship notes', () => {
        const { developmentNotes } = formValidationSets.relationship;
        
        expect(validateField('发展笔记', developmentNotes)).toEqual([]);
        expect(validateField('a'.repeat(1001), developmentNotes)).toHaveLength(1);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle null and undefined values', () => {
      const rule = createValidationRule('不能为空', (value) => value && value.length > 0);
      
      expect(validateField(null as any, [rule])).toHaveLength(1);
      expect(validateField(undefined as any, [rule])).toHaveLength(1);
    });

    it('should handle empty validation rules', () => {
      const errors = validateField('任何值', []);
      
      expect(errors).toEqual([]);
    });

    it('should handle validation errors with field names', () => {
      const errors = validateField('', [
        createValidationRule('错误信息', () => false)
      ], 'testField');
      
      expect(errors[0].field).toBe('testField');
    });
  });
});