// @ts-nocheck
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useDispatch, useSelector } from 'react-redux';
import { setContent, selectEditor } from '../editorSlice';

/**
 * TipTap编辑器的自定义Hook
 */
export const useTipTapEditor = () => {
  const dispatch = useDispatch();
  const editorState = useSelector(selectEditor);

  // 初始化TipTap编辑器
  const editor = useEditor({
    extensions: [StarterKit],
    content: editorState.content,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      dispatch(setContent(content));
    },
  });

  return editor;
};
