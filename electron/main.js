const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs').promises;
const path = require('path');

// 创建主窗口
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // 加载应用
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

// 应用准备就绪时创建窗口
app.whenReady().then(createWindow);

// 当所有窗口关闭时退出应用（macOS除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 在macOS上，当点击dock图标时重新创建窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 处理打开文件对话框
ipcMain.handle('dialog:openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  if (!canceled) {
    return filePaths[0];
  }
  return null;
});

// 处理保存文件对话框
ipcMain.handle('dialog:saveFile', async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    filters: [
      { name: 'Markdown Files', extensions: ['md'] },
      { name: 'Text Files', extensions: ['txt'] }
    ]
  });
  
  if (!canceled) {
    return filePath;
  }
  return null;
});

// 读取文件内容
ipcMain.handle('fs:readFile', async (event, filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('读取文件失败:', error);
    throw error;
  }
});

// 写入文件内容
ipcMain.handle('fs:writeFile', async (event, filePath, content) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  } catch (error) {
    console.error('写入文件失败:', error);
    throw error;
  }
});