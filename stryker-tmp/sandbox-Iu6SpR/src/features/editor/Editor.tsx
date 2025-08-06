// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import { selectEditor } from './editorSlice';
import { useTipTapEditor, useAutoSave, useFileOperations } from './hooks';
import EditorToolbar from './components/EditorToolbar';
import EditorContentArea from './components/EditorContentArea';
import EditorStatusBar from './components/EditorStatusBar';
import { EditorContainer } from './styles/editor.styles';

const Editor: React.FC = () => {
  const editorState = useSelector(selectEditor);

  // 使用自定义hooks
  const editor = useTipTapEditor();
  useAutoSave();
  const { handleNewFile, handleOpenFile, handleSaveFile, handleSaveAs } = useFileOperations(editor);

  return (
    <EditorContainer>
      <EditorToolbar
        fileName={editorState.fileName}
        isDirty={editorState.isDirty}
        onNewFile={handleNewFile}
        onOpenFile={handleOpenFile}
        onSaveFile={handleSaveFile}
        onSaveAs={handleSaveAs}
      />

      <EditorContentArea editor={editor} />

      <EditorStatusBar
        wordCount={editorState.wordCount}
        isDirty={editorState.isDirty}
        lastSaved={editorState.lastSaved}
        autoSaveEnabled={editorState.autoSaveEnabled}
      />
    </EditorContainer>
  );
};

export default Editor;
