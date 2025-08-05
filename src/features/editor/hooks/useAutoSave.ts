import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fileAPI } from '../../../api/file';
import { markAsSaved, selectEditor } from '../editorSlice';

/**
 * 自动保存功能的自定义Hook
 */
export const useAutoSave = () => {
  const dispatch = useDispatch();
  const editorState = useSelector(selectEditor);

  useEffect(() => {
    let autoSaveTimer: NodeJS.Timeout;
    
    if (editorState.autoSaveEnabled && 
        editorState.isDirty && 
        editorState.filePath && 
        editorState.content) {
      // 3秒后自动保存
      autoSaveTimer = setTimeout(async () => {
        try {
          await fileAPI.saveFile(editorState.content, editorState.filePath);
          dispatch(markAsSaved());
          console.log('自动保存成功');
        } catch (error) {
          console.error('自动保存失败:', error);
        }
      }, 3000);
    }
    
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [editorState.autoSaveEnabled, editorState.isDirty, editorState.filePath, editorState.content, dispatch]);
};