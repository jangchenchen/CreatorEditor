import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 编辑器状态接口
interface EditorState {
  content: string;
  filePath: string | null;
  fileName: string | null;
  isDirty: boolean;
  wordCount: number;
  lastSaved: Date | null;
  autoSaveEnabled: boolean;
}

// 初始状态
const initialState: EditorState = {
  content: '',
  filePath: null,
  fileName: null,
  isDirty: false,
  wordCount: 0,
  lastSaved: null,
  autoSaveEnabled: true,
};

// 创建编辑器切片
const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    // 设置内容
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
      state.isDirty = true;
      // 计算字数：中文字符 + 英文单词
      const text = action.payload.replace(/<[^>]*>/g, ''); // 移除HTML标签
      const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
      const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
      const numbers = (text.match(/[0-9]+/g) || []).length;
      state.wordCount = chineseChars + englishWords + numbers;
    },

    // 设置文件信息
    setFileInfo: (state, action: PayloadAction<{ path: string; name: string }>) => {
      state.filePath = action.payload.path;
      state.fileName = action.payload.name;
      state.isDirty = false;
    },

    // 标记为已保存
    markAsSaved: state => {
      state.isDirty = false;
      state.lastSaved = new Date();
    },

    // 新建文件
    newFile: state => {
      state.content = '';
      state.filePath = null;
      state.fileName = null;
      state.isDirty = false;
      state.wordCount = 0;
      state.lastSaved = null;
    },

    // 切换自动保存
    toggleAutoSave: state => {
      state.autoSaveEnabled = !state.autoSaveEnabled;
    },
  },
});

// 导出动作
export const { setContent, setFileInfo, markAsSaved, newFile, toggleAutoSave } =
  editorSlice.actions;

// 导出reducer
export default editorSlice.reducer;

// 选择器
export const selectEditor = (state: { editor: EditorState }) => state.editor;
