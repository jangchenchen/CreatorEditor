import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '../features/editor/editorSlice';
import { outlineReducer } from '../features/outline/slices/rootOutlineSlice';
import { syncMiddleware } from '../features/outline/middleware/syncMiddleware';
import { autoSaveMiddleware } from '../features/outline/middleware/autoSave';

// 配置Redux Store
export const store = configureStore({
  reducer: {
    editor: editorReducer,
    outline: outlineReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'autosave/SAVE'],
      },
    }).concat(syncMiddleware, autoSaveMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;