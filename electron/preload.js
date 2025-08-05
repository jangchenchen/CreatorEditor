const { contextBridge, ipcRenderer } = require('electron');

// 向渲染进程暴露安全的API
contextBridge.exposeInMainWorld('electronAPI', {
  // 打开文件
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  
  // 保存文件
  saveFile: () => ipcRenderer.invoke('dialog:saveFile'),
  
  // 读取文件内容
  readFile: (filePath) => ipcRenderer.invoke('fs:readFile', filePath),
  
  // 写入文件内容
  writeFile: (filePath, content) => ipcRenderer.invoke('fs:writeFile', filePath, content),
});