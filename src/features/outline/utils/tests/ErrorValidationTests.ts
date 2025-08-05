/**
 * Error and Validation Tests
 * Tests for error handling and data validation
 */

import { Store } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { DataMigrationService } from '../../services/dataMigrationService';
import { ImportExportService } from '../../services/importExportService';
import { TestDataFactory } from './TestDataFactory';

export class ErrorValidationTests {
  private store: Store<RootState>;

  constructor(store: Store<RootState>) {
    this.store = store;
  }

  /**
   * Test error handling scenarios
   */
  async testErrorHandling(): Promise<boolean> {
    try {
      // Test with invalid data
      try {
        await DataMigrationService.migrateToCurrentVersion(null);
        console.error('Should have thrown error for null data');
        return false;
      } catch (error) {
        console.log('✓ Null data error handled correctly');
      }

      // Test with malformed JSON
      try {
        const malformedData = '{"invalid": json}';
        await ImportExportService.handleFileImport(
          new File([malformedData], 'malformed.json', { type: 'application/json' })
        );
        console.error('Should have thrown error for malformed JSON');
        return false;
      } catch (error) {
        console.log('✓ Malformed JSON error handled correctly');
      }

      // Test with empty file
      try {
        await ImportExportService.handleFileImport(
          new File([''], 'empty.json', { type: 'application/json' })
        );
        console.error('Should have thrown error for empty file');
        return false;
      } catch (error) {
        console.log('✓ Empty file error handled correctly');
      }

      return true;
    } catch (error) {
      console.error('Error handling test failed:', error);
      return false;
    }
  }

  /**
   * Test data validation
   */
  async testDataValidation(): Promise<boolean> {
    try {
      // Test valid data
      const validData = TestDataFactory.createTestProject();
      const isValid = DataMigrationService.validateCurrentSchema(validData);
      
      if (!isValid) {
        console.error('Valid data failed validation');
        return false;
      }
      
      console.log('✓ Valid data passed validation');
      
      // Test invalid data (missing version)
      const invalidData = { ...validData, version: undefined };
      const isInvalid = DataMigrationService.validateCurrentSchema(invalidData);
      
      if (isInvalid) {
        console.error('Invalid data (missing version) passed validation');
        return false;
      }
      
      console.log('✓ Invalid data (missing version) correctly rejected');

      // Test invalid data (missing required fields)
      const invalidData2 = { ...validData, projectName: undefined };
      const isInvalid2 = DataMigrationService.validateCurrentSchema(invalidData2);
      
      if (isInvalid2) {
        console.error('Invalid data (missing projectName) passed validation');
        return false;
      }
      
      console.log('✓ Invalid data (missing projectName) correctly rejected');
      
      return true;
    } catch (error) {
      console.error('Data validation test failed:', error);
      return false;
    }
  }
}