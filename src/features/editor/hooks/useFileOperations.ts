import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fileAPI } from '../../../api/file';
import { setContent, setFileInfo, markAsSaved, newFile, selectEditor } from '../editorSlice';

/**
 * 文件操作功能的自定义Hook
 */
export const useFileOperations = (editor: any) => {
  const dispatch = useDispatch();
  const editorState = useSelector(selectEditor);

  // 处理新建文件
  const handleNewFile = useCallback(() => {
    dispatch(newFile());
    if (editor) {
      editor.commands.setContent('');
    }
  }, [dispatch, editor]);

  // 处理打开文件
  const handleOpenFile = useCallback(async () => {
    try {
      const fileInfo = await fileAPI.openFile();
      if (fileInfo) {
        dispatch(setFileInfo({ path: fileInfo.path, name: fileInfo.name }));
        dispatch(setContent(fileInfo.content));
        if (editor) {
          editor.commands.setContent(fileInfo.content);
        }
      }
    } catch (error) {
      console.error('打开文件失败:', error);
    }
  }, [dispatch, editor]);

  // 处理保存文件
  const handleSaveFile = useCallback(async () => {
    if (!editorState.content) return;

    try {
      const result = await fileAPI.saveFile(editorState.content, editorState.filePath || undefined);

      if (result) {
        dispatch(setFileInfo({ path: result.path, name: result.name }));
        dispatch(markAsSaved());
      }
    } catch (error) {
      console.error('保存文件失败:', error);
    }
  }, [editorState.content, editorState.filePath, dispatch]);

  // 处理另存为
  const handleSaveAs = useCallback(async () => {
    if (!editorState.content) return;

    try {
      const result = await fileAPI.saveFileAs(editorState.content);
      if (result) {
        dispatch(setFileInfo({ path: result.path, name: result.name }));
        dispatch(markAsSaved());
      }
    } catch (error) {
      console.error('另存为失败:', error);
    }
  }, [editorState.content, dispatch]);

  return {
    handleNewFile,
    handleOpenFile,
    handleSaveFile,
    handleSaveAs,
  };
};
