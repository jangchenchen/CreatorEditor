// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import { Chapter, ChapterTransition, Character } from '../../../../types/outline.types';
import {
  ChapterDialogProps,
  ChapterFormData,
  ChapterDialogState,
  ChapterFormField,
  ChapterTransitionField,
  ChapterArrayField,
  ChapterFormValidation,
  DEFAULT_CHAPTER_FORM_DATA,
} from './types';

export const useChapterDialog = (props: ChapterDialogProps) => {
  const { open, editingChapter, chapters, characters } = props;

  const [state, setState] = useState<ChapterDialogState>({
    formData: {},
    isSubmitting: false,
    errors: {},
  });

  // 初始化表单数据
  useEffect(() => {
    if (open) {
      if (editingChapter) {
        setState(prev => ({
          ...prev,
          formData: { ...editingChapter },
          errors: {},
        }));
      } else {
        setState(prev => ({
          ...prev,
          formData: {
            number: chapters.length + 1,
            title: '',
            summary: '',
            ...DEFAULT_CHAPTER_FORM_DATA,
          },
          errors: {},
        }));
      }
    }
  }, [open, editingChapter, chapters]);

  // 验证表单
  const validateForm = useCallback((): ChapterFormValidation => {
    const errors: Record<string, string> = {};

    if (!state.formData.title?.trim()) {
      errors.title = '章节标题不能为空';
    }

    if (!state.formData.number || state.formData.number <= 0) {
      errors.number = '章节号必须大于0';
    }

    // 检查章节号是否重复
    const duplicateChapter = chapters.find(
      chapter => chapter.number === state.formData.number && chapter.id !== editingChapter?.id
    );
    if (duplicateChapter) {
      errors.number = '章节号已存在';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }, [state.formData, chapters, editingChapter]);

  // 处理表单字段变化
  const handleFormChange = useCallback(
    (field: ChapterFormField) =>
      (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
        const value = event.target.value;
        setState(prev => ({
          ...prev,
          formData: {
            ...prev.formData,
            [field]: value,
          },
          errors: {
            ...prev.errors,
            [field]: undefined,
          },
        }));
      },
    []
  );

  // 处理过渡字段变化
  const handleTransitionChange = useCallback(
    (field: ChapterTransitionField) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setState(prev => ({
        ...prev,
        formData: {
          ...prev.formData,
          transitions: {
            ...prev.formData.transitions,
            [field]: value,
          } as ChapterTransition,
        },
      }));
    },
    []
  );

  // 处理数组字段变化
  const handleArrayFieldChange = useCallback(
    (field: ChapterArrayField) => (event: any, newValue: string[]) => {
      setState(prev => ({
        ...prev,
        formData: {
          ...prev.formData,
          [field]: newValue,
        },
      }));
    },
    []
  );

  // 处理保存
  const handleSave = useCallback(async () => {
    const validation = validateForm();

    if (!validation.isValid) {
      setState(prev => ({
        ...prev,
        errors: validation.errors,
      }));
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const chapterData: Chapter = {
        id: editingChapter?.id || `chapter-${Date.now()}`,
        number: state.formData.number || chapters.length + 1,
        title: state.formData.title || '',
        summary: state.formData.summary || '',
        keyScenes: state.formData.keyScenes || [],
        characters: state.formData.characters || [],
        plotPoints: state.formData.plotPoints || [],
        conflicts: state.formData.conflicts || [],
        themes: state.formData.themes || [],
        wordCountTarget: state.formData.wordCountTarget || 3000,
        status: state.formData.status || 'planned',
        transitions: state.formData.transitions || { from: '', to: '', method: '' },
        notes: state.formData.notes || '',
      };

      props.onSave(chapterData);
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        errors: {
          ...prev.errors,
          submit: '保存失败，请重试',
        },
      }));
    }
  }, [validateForm, editingChapter, state.formData, chapters, props]);

  // 重置表单
  const resetForm = useCallback(() => {
    setState({
      formData: {},
      isSubmitting: false,
      errors: {},
    });
  }, []);

  return {
    state,
    handleFormChange,
    handleTransitionChange,
    handleArrayFieldChange,
    handleSave,
    resetForm,
    validateForm,
  };
};
