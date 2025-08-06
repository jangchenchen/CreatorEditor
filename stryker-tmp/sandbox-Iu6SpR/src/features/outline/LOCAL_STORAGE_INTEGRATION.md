# Local Storage Integration Guide

This guide explains how to integrate and use the LowDB local storage system in the Novel Creation Editor application.

## Overview

The local storage system provides:
- **Persistent local storage** using LowDB with JSON files
- **Auto-save functionality** that works alongside existing sync middleware
- **Data migration and versioning** for schema compatibility
- **Import/export capabilities** for project portability
- **Backup and recovery utilities** for data safety

## Architecture

### Core Components

1. **LocalStorageService** (`services/localStorageService.ts`)
   - Main storage service using LowDB
   - Handles project CRUD operations
   - Manages database initialization and cleanup

2. **AutoSaveMiddleware** (`middleware/autoSaveMiddleware.ts`)
   - Redux middleware for automatic state persistence
   - Debounced saving to prevent excessive disk I/O
   - Works alongside existing syncMiddleware

3. **DataMigrationService** (`services/dataMigrationService.ts`)
   - Handles data schema versioning and migration
   - Ensures backward compatibility when schema changes

4. **ImportExportService** (`services/importExportService.ts`)
   - Project import/export functionality
   - Multiple format support with validation
   - Backup and restore capabilities

5. **React Integration** (`hooks/useLocalStorage.ts`, `components/StorageControls.tsx`)
   - React hooks for easy component integration
   - UI components for storage operations

## Integration Steps

### 1. Store Configuration

The store has been updated to include the auto-save middleware:

```typescript
// src/app/store.ts
import { autoSaveMiddleware } from '../features/outline/middleware/autoSaveMiddleware';

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
    }).concat(syncMiddleware, autoSaveMiddleware), // Order matters: sync first, then auto-save
});
```

### 2. Application Initialization

Initialize the storage system when your app starts:

```typescript
// In your main App component or initialization code
import { initializeStorageSystem } from './features/outline/utils/storageInitializer';
import { store } from './app/store';

// Initialize storage on app startup
useEffect(() => {
  const initStorage = async () => {
    try {
      const result = await initializeStorageSystem(store);
      
      if (result.success) {
        console.log('Storage initialized successfully');
        if (result.loadedProject) {
          console.log(`Loaded project: ${result.loadedProject}`);
        }
        if (result.warnings.length > 0) {
          console.warn('Initialization warnings:', result.warnings);
        }
      } else {
        console.error('Storage initialization failed:', result.errors);
      }
    } catch (error) {
      console.error('Storage initialization error:', error);
    }
  };

  initStorage();
}, []);
```

### 3. Using Storage in Components

Use the `useLocalStorage` hook in your React components:

```typescript
import { useLocalStorage } from './features/outline/hooks/useLocalStorage';

function MyComponent() {
  const storage = useLocalStorage();

  // Check storage status
  if (!storage.isInitialized) {
    return <div>Initializing storage...</div>;
  }

  // Handle manual save
  const handleSave = async () => {
    try {
      await storage.saveProject();
      alert('Project saved successfully!');
    } catch (error) {
      alert('Save failed: ' + error.message);
    }
  };

  // Handle project import
  const handleImport = async (file: File) => {
    try {
      const result = await storage.importProject(file);
      if (result.success) {
        alert(`Imported: ${result.project?.projectName}`);
      } else {
        alert('Import failed: ' + result.errors.join(', '));
      }
    } catch (error) {
      alert('Import error: ' + error.message);
    }
  };

  return (
    <div>
      {/* Auto-save status */}
      <div>
        Auto-save: {storage.autoSave.enabled ? 'ON' : 'OFF'}
        {storage.autoSave.saving && ' (Saving...)'}
      </div>

      {/* Manual controls */}
      <button onClick={handleSave}>Save Project</button>
      <button onClick={() => storage.enableAutoSave()}>Enable Auto-save</button>
      
      {/* Error display */}
      {storage.error && (
        <div style={{color: 'red'}}>
          Error: {storage.error}
          <button onClick={storage.clearError}>Clear</button>
        </div>
      )}
    </div>
  );
}
```

### 4. Adding Storage Controls UI

Include the storage controls component in your UI:

```typescript
import StorageControls from './features/outline/components/StorageControls';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';

function SettingsPanel() {
  const currentProjectId = useSelector((state: RootState) => state.outline.project.id);

  return (
    <div>
      <h2>Project Settings</h2>
      <StorageControls 
        currentProjectId={currentProjectId}
        onProjectLoad={(projectId) => console.log('Loaded:', projectId)}
      />
    </div>
  );
}
```

## Features

### Auto-Save

Auto-save is enabled by default and works automatically:

- **Debounced saving**: Waits 2 seconds after last change before saving
- **Retry mechanism**: Automatically retries failed saves up to 3 times
- **Error handling**: Provides user feedback on save failures
- **Works with sync middleware**: Saves final state after sync operations complete

```typescript
// Control auto-save programmatically
import { autoSaveUtils } from './features/outline/middleware/autoSaveMiddleware';

// Enable/disable
autoSaveUtils.enable();
autoSaveUtils.disable();

// Force immediate save
await autoSaveUtils.forceSave(store.getState());

// Check status
const status = autoSaveUtils.getStatus();
console.log('Auto-save enabled:', status.enabled);
console.log('Currently saving:', status.saving);
```

### Data Migration

The system automatically handles data migration when schema changes:

```typescript
import { DataMigrationService } from './features/outline/services/dataMigrationService';

// Check if data needs migration
if (DataMigrationService.needsMigration(data)) {
  const migratedData = await DataMigrationService.migrateToCurrentVersion(data);
}

// Get migration info
const info = DataMigrationService.getMigrationInfo('0.9.0');
console.log('Migration needed:', info.needed);
console.log('Migration path:', info.path);
```

### Import/Export

Support for multiple import/export operations:

```typescript
import ImportExportService from './features/outline/services/importExportService';

// Export project
const result = await ImportExportService.exportProject(
  'project-id', 
  'my-project.json',
  { format: 'json-pretty', includeMetadata: true }
);

// Import project
const importResult = await ImportExportService.handleFileImport(file);

// Create backup
const backupResult = await ImportExportService.exportBackup('backup.json');
```

## Data Structure

The storage system uses the following database schema:

```typescript
interface DatabaseSchema {
  version: string;                          // Schema version
  projects: Record<string, OutlineData>;    // All projects by ID
  activeProject: string | null;             // Currently active project ID
  settings: {
    autoSave: boolean;
    backupEnabled: boolean;
    lastBackup: string | null;
  };
  metadata: {
    created: string;
    lastModified: string;
    totalProjects: number;
  };
}
```

## File Locations

- **Database file**: `novel-editor-data.json` (in app data directory)
- **Backups**: `backup_[timestamp]_novel-editor-data.backup.json`
- **Exports**: User-specified locations

## Configuration

### Storage Configuration

```typescript
// In localStorageService.ts
const STORAGE_CONFIG = {
  fileName: 'novel-editor-data.json',
  backupFileName: 'novel-editor-data.backup.json',
  currentVersion: '1.0.0',
  autoSaveInterval: 5000, // 5 seconds
  maxBackups: 5
};
```

### Auto-Save Configuration

```typescript
// In autoSaveMiddleware.ts
const AUTO_SAVE_CONFIG = {
  debounceDelay: 2000,    // 2 seconds
  maxRetries: 3,
  retryDelay: 1000,       // 1 second
  enabledByDefault: true
};
```

## Error Handling

The system provides comprehensive error handling:

1. **Initialization errors**: Graceful fallback if storage can't be initialized
2. **Save errors**: Retry mechanism with user feedback
3. **Load errors**: Validation and migration with fallback options
4. **Import errors**: Detailed error messages and partial recovery
5. **Migration errors**: Safe fallback to prevent data loss

## Best Practices

### 1. Initialization
- Always initialize storage before using other features
- Handle initialization errors gracefully
- Provide user feedback during initialization

### 2. Error Handling
- Always check storage.error state in components
- Provide clear error messages to users
- Implement retry mechanisms for critical operations

### 3. Performance
- Use auto-save for most operations
- Only use force-save when immediate persistence is required
- Monitor storage status to avoid unnecessary operations

### 4. Data Safety
- Regular backups (automated through backup functionality)
- Validate imported data before loading
- Test migration scenarios thoroughly

## Troubleshooting

### Common Issues

1. **Storage not initializing**
   - Check file permissions in app data directory
   - Verify LowDB installation
   - Check for corrupted database files

2. **Auto-save not working**
   - Verify middleware is properly configured
   - Check that triggering actions are correctly defined
   - Monitor console for auto-save events

3. **Import/export failures**
   - Validate JSON file format
   - Check file paths and permissions
   - Verify data schema compatibility

### Recovery Options

```typescript
import { recoveryUtils } from './features/outline/utils/storageInitializer';

// Attempt automatic recovery
const result = await recoveryUtils.attemptRecovery();

// Nuclear option: clear all data (use with caution)
await recoveryUtils.clearAllData();
```

## Testing Integration

To test the integration:

1. **Start the application** - Storage should initialize automatically
2. **Make changes** - Should auto-save after 2 seconds
3. **Manual save** - Use storage controls to test manual save
4. **Import/export** - Test with sample project files
5. **Data migration** - Test with older format data files
6. **Error scenarios** - Test with corrupted data, network issues, etc.

## Future Enhancements

Potential improvements for future versions:

1. **Compression**: Add data compression for large projects  
2. **Encryption**: Add optional data encryption
3. **Cloud sync**: Integration with cloud storage services
4. **Conflict resolution**: Handle concurrent editing scenarios
5. **Performance monitoring**: Track storage performance metrics
6. **Advanced backup strategies**: Incremental backups, retention policies

## Support

For issues or questions about the local storage integration:

1. Check the console for error messages and warnings
2. Review the integration guide for proper setup
3. Test with sample data to isolate issues
4. Use recovery utilities for data recovery scenarios

The storage system is designed to be robust and provide clear feedback about its operations. Monitor the console output and storage status indicators for the best development experience.