import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Tabs, Tab, AppBar } from '@mui/material';
import { 
  Edit as EditorIcon, 
  MenuBook as OutlineIcon 
} from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import Editor from './features/editor/Editor';
import OutlineNavigator from './features/outline/components/OutlineNavigator';

// 创建主题
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* 主导航标签栏 */}
          <AppBar position="static" elevation={1}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
              variant="fullWidth"
            >
              <Tab 
                icon={<EditorIcon />} 
                label="文本编辑器" 
                iconPosition="start"
              />
              <Tab 
                icon={<OutlineIcon />} 
                label="小说大纲" 
                iconPosition="start"
              />
            </Tabs>
          </AppBar>

          {/* 内容区域 */}
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            {activeTab === 0 && <Editor />}
            {activeTab === 1 && <OutlineNavigator />}
          </Box>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;