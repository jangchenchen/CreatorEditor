/**
 * Integration Tests
 * Tests for integration with other services and middleware
 */

import { Store } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { DataMigrationService } from '../../services/dataMigrationService';
import { ImportExportService } from '../../services/importExportService';
import { Character, PlotEvent } from '../../types/outline.types';
import {
  addCharacter,
  updateCharacter,
  deleteCharacter,
  addPlotEvent,
} from '../../slices/rootOutlineSlice';
import { TestDataFactory } from './TestDataFactory';

export class IntegrationTests {
  private store: Store<RootState>;

  constructor(store: Store<RootState>) {
    this.store = store;
  }

  /**
   * Test data migration functionality
   */
  async testDataMigration(): Promise<boolean> {
    try {
      // Create test data in old format
      const oldFormatData = {
        id: 'test-migration',
        name: 'Migration Test Project',
        characters: [{ id: 'char1', name: 'Test Character', role: 'protagonist' }],
        timeline: {
          events: [{ id: 'event1', title: 'Test Event', type: 'beginning' }],
        },
      };

      // Test migration
      const migratedData = await DataMigrationService.migrateToCurrentVersion(oldFormatData);

      if (!migratedData.version || migratedData.version !== '1.0.0') {
        console.error('Migration did not update version correctly');
        return false;
      }

      console.log('✓ Data migration completed successfully');
      return true;
    } catch (error) {
      console.error('Data migration test failed:', error);
      return false;
    }
  }

  /**
   * Test import/export functionality
   */
  async testImportExport(): Promise<boolean> {
    try {
      // Create test project data
      const testProject = TestDataFactory.createTestProject();

      // Test import of project data
      const importResult = await ImportExportService.handleFileImport(
        new File([JSON.stringify({ project: testProject })], 'test.json', {
          type: 'application/json',
        })
      );

      if (!importResult.success) {
        console.error('Import test failed:', importResult.errors);
        return false;
      }

      console.log('✓ Import functionality working');
      console.log('✓ Imported project:', importResult.project?.projectName);

      return true;
    } catch (error) {
      console.error('Import/export test failed:', error);
      return false;
    }
  }

  /**
   * Test integration with sync middleware
   */
  async testSyncMiddlewareIntegration(): Promise<boolean> {
    try {
      // Add a character (this should trigger sync middleware)
      const testCharacter: Character = TestDataFactory.createTestCharacter(
        'sync-test-char',
        'Sync Test Character'
      );

      this.store.dispatch(addCharacter(testCharacter));

      // Update the character (should trigger sync)
      const updatedCharacter = { ...testCharacter, name: 'Updated Sync Test Character' };
      this.store.dispatch(updateCharacter(updatedCharacter));

      // Add a timeline event that references the character
      const testEvent: PlotEvent = TestDataFactory.createTestPlotEvent('sync-test-event', [
        testCharacter.id,
      ]);

      this.store.dispatch(addPlotEvent(testEvent));

      // Delete the character (should trigger cleanup in sync middleware)
      this.store.dispatch(deleteCharacter(testCharacter.id));

      // Check if the character was removed from the timeline event
      const currentState = this.store.getState();
      const timelineEvent = currentState.outline.timeline.events.find(e => e.id === testEvent.id);

      if (timelineEvent && timelineEvent.characters.includes(testCharacter.id)) {
        console.error('Sync middleware did not clean up character references');
        return false;
      }

      console.log('✓ Sync middleware integration working correctly');
      return true;
    } catch (error) {
      console.error('Sync middleware integration test failed:', error);
      return false;
    }
  }
}
