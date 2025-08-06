/**
 * 表单验证工具
 * 为对话框提供统一的验证逻辑和错误提示
 */
// @ts-nocheck


export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// 验证规则配置
export const validationRules = {
  // 角色相关验证
  characterName: {
    required: true,
    minLength: 1,
    maxLength: 50,
  } as ValidationRule,

  characterAge: {
    required: true,
    custom: (value: any) => {
      const age = Number(value);
      return !isNaN(age) && age >= 0 && age <= 200;
    },
  } as ValidationRule,

  characterBackground: {
    maxLength: 500,
  } as ValidationRule,

  // 时间线事件验证
  eventTitle: {
    required: true,
    minLength: 1,
    maxLength: 100,
  } as ValidationRule,

  eventDescription: {
    maxLength: 1000,
  } as ValidationRule,

  // 章节验证
  chapterTitle: {
    required: true,
    minLength: 1,
    maxLength: 100,
  } as ValidationRule,

  chapterSummary: {
    maxLength: 500,
  } as ValidationRule,

  // 地区验证
  regionName: {
    required: true,
    minLength: 1,
    maxLength: 50,
  } as ValidationRule,

  regionDescription: {
    maxLength: 300,
  } as ValidationRule,

  // 关系验证
  relationshipDescription: {
    required: true,
    minLength: 1,
    maxLength: 200,
  } as ValidationRule,

  // 通用字段验证
  title: {
    required: true,
    minLength: 1,
    maxLength: 100,
  } as ValidationRule,

  description: {
    maxLength: 1000,
  } as ValidationRule,

  notes: {
    maxLength: 500,
  } as ValidationRule,
};

// 错误消息模板
export const errorMessages = {
  required: (fieldName: string) => `${fieldName}不能为空`,
  minLength: (fieldName: string, minLength: number) => `${fieldName}至少需要${minLength}个字符`,
  maxLength: (fieldName: string, maxLength: number) => `${fieldName}不能超过${maxLength}个字符`,
  pattern: (fieldName: string) => `${fieldName}格式不正确`,
  custom: (fieldName: string) => `${fieldName}输入无效`,
  characterAge: '年龄必须是0-200之间的数字',
  email: '请输入有效的邮箱地址',
  url: '请输入有效的URL地址',
};

// 字段名称映射
export const fieldLabels: Record<string, string> = {
  name: '名称',
  title: '标题',
  description: '描述',
  age: '年龄',
  background: '背景',
  summary: '概要',
  notes: '备注',
  characterName: '角色名称',
  characterAge: '角色年龄',
  characterBackground: '角色背景',
  eventTitle: '事件标题',
  eventDescription: '事件描述',
  chapterTitle: '章节标题',
  chapterSummary: '章节概要',
  regionName: '地区名称',
  regionDescription: '地区描述',
  relationshipDescription: '关系描述',
};

/**
 * 验证单个字段
 */
export function validateField(
  fieldName: string,
  value: any,
  rules: ValidationRule
): ValidationError | null {
  // 如果rules为undefined或null，返回null
  if (!rules) {
    return null;
  }

  const label = fieldLabels[fieldName] || fieldName;

  // 必填验证
  if (rules.required && (!value || String(value).trim() === '')) {
    return {
      field: fieldName,
      message: errorMessages.required(label),
    };
  }

  // 如果值为空且不是必填，跳过其他验证
  if (!value || String(value).trim() === '') {
    return null;
  }

  const stringValue = String(value).trim();

  // 最小长度验证
  if (rules.minLength && stringValue.length < rules.minLength) {
    return {
      field: fieldName,
      message: errorMessages.minLength(label, rules.minLength),
    };
  }

  // 最大长度验证
  if (rules.maxLength && stringValue.length > rules.maxLength) {
    return {
      field: fieldName,
      message: errorMessages.maxLength(label, rules.maxLength),
    };
  }

  // 正则表达式验证
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    return {
      field: fieldName,
      message: errorMessages.pattern(label),
    };
  }

  // 自定义验证
  if (rules.custom && !rules.custom(value)) {
    // 特殊字段的自定义错误消息
    if (fieldName === 'characterAge' || fieldName === 'age') {
      return {
        field: fieldName,
        message: errorMessages.characterAge,
      };
    }

    return {
      field: fieldName,
      message: errorMessages.custom(label),
    };
  }

  return null;
}

/**
 * 验证整个表单
 */
export function validateForm(
  data: Record<string, any>,
  ruleSet: Record<string, ValidationRule>
): ValidationResult {
  const errors: ValidationError[] = [];

  for (const [fieldName, rules] of Object.entries(ruleSet)) {
    const value = data[fieldName];
    const error = validateField(fieldName, value, rules);

    if (error) {
      errors.push(error);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 获取字段的错误消息
 */
export function getFieldError(fieldName: string, errors: ValidationError[]): string | null {
  const error = errors.find(e => e.field === fieldName);
  return error ? error.message : null;
}

/**
 * 检查字段是否有错误
 */
export function hasFieldError(fieldName: string, errors: ValidationError[]): boolean {
  return errors.some(e => e.field === fieldName);
}

/**
 * 常用验证规则组合
 */
export const formValidationSets = {
  // 角色编辑表单
  character: {
    name: validationRules.characterName,
    age: validationRules.characterAge,
    background: validationRules.characterBackground,
  },

  // 事件编辑表单
  event: {
    title: validationRules.eventTitle,
    description: validationRules.eventDescription,
  },

  // 章节编辑表单
  chapter: {
    title: validationRules.chapterTitle,
    summary: validationRules.chapterSummary,
  },

  // 地区编辑表单
  region: {
    name: validationRules.regionName,
    description: validationRules.regionDescription,
  },

  // 关系编辑表单
  relationship: {
    description: validationRules.relationshipDescription,
  },
};

/**
 * 创建自定义验证规则
 * @param message 错误消息
 * @param validator 验证函数
 * @returns ValidationRule with validate method
 */
export function createValidationRule(message: string, validator: (value: any) => boolean) {
  return {
    message,
    validate: validator,
    custom: validator,
  };
}
