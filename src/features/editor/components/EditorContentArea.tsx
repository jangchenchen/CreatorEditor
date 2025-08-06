import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/react';
import { ContentArea } from '../styles/editor.styles';

interface EditorContentAreaProps {
  editor: Editor | null;
}

const EditorContentArea: React.FC<EditorContentAreaProps> = ({ editor }) => {
  return (
    <ContentArea>
      {editor ? (
        <EditorContent editor={editor} />
      ) : (
        <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
          <CircularProgress />
        </Box>
      )}
    </ContentArea>
  );
};

export default EditorContentArea;
