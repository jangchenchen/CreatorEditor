import { getFileName } from '../utils/pathUtils';

// 文件操作API封装
export const fileAPI = {
  // 打开文件
  async openFile() {
    if (!window.electronAPI) {
      throw new Error('Electron API 不可用');
    }
    
    // 显示打开文件对话框
    const filePath = await window.electronAPI.openFile();
    if (!filePath) return null;
    
    // 读取文件内容
    const content = await window.electronAPI.readFile(filePath);
    
    return {
      path: filePath,
      content,
      name: getFileName(filePath)
    };
  },
  
  // 保存文件
  async saveFile(content: string, filePath?: string) {
    if (!window.electronAPI) {
      throw new Error('Electron API 不可用');
    }
    
    let savePath = filePath;
    
    // 如果没有提供文件路径，显示保存对话框
    if (!savePath) {
      savePath = await window.electronAPI.saveFile();
      if (!savePath) return null;
    }
    
    // 写入文件
    await window.electronAPI.writeFile(savePath, content);
    
    return {
      path: savePath,
      name: getFileName(savePath)
    };
  },
  
  // 另存为
  async saveFileAs(content: string) {
    return this.saveFile(content);
  }
};

// 类型定义
export interface FileInfo {
  path: string;
  content: string;
  name: string;
}