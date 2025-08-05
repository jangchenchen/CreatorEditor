import { styled } from '@mui/material/styles';
import { Box, Toolbar } from '@mui/material';

// 编辑器容器样式
export const EditorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}));

// 工具栏样式
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// 编辑内容区域样式
export const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  overflow: 'auto',
  '& .ProseMirror': {
    outline: 'none',
    fontSize: '16px',
    lineHeight: 1.8,
    minHeight: '100%',
    '& p': {
      marginBottom: theme.spacing(1),
    },
    '& h1': {
      fontSize: '2em',
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
    },
    '& h2': {
      fontSize: '1.5em',
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
    },
    '& h3': {
      fontSize: '1.17em',
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
    },
  },
}));

// 状态栏样式
export const StatusBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));