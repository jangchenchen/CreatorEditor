/**
 * Storage Test Suite Core
 * Main test suite orchestrator for storage testing
 */

import { Store } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { StorageTests } from './StorageTests';
import { IntegrationTests } from './IntegrationTests';
import { ErrorValidationTests } from './ErrorValidationTests';

/**
 * Main test suite for storage integration
 */
export class StorageTestSuite {
  private store: Store<RootState>;
  private testResults: { [key: string]: boolean } = {};
  private storageTests: StorageTests;
  private integrationTests: IntegrationTests;
  private errorValidationTests: ErrorValidationTests;

  constructor(store: Store<RootState>) {
    this.store = store;
    this.storageTests = new StorageTests(store);
    this.integrationTests = new IntegrationTests(store);
    this.errorValidationTests = new ErrorValidationTests(store);
  }

  /**
   * Run all storage tests
   */
  async runAllTests(): Promise<{ passed: number; failed: number; results: any }> {
    console.log('🧪 Starting Storage Integration Tests...');
    
    const tests = [
      { name: 'Storage Initialization', test: () => this.storageTests.testStorageInitialization() },
      { name: 'Auto-save Functionality', test: () => this.storageTests.testAutoSave() },
      { name: 'Manual Save/Load', test: () => this.storageTests.testManualSaveLoad() },
      { name: 'Data Migration', test: () => this.integrationTests.testDataMigration() },
      { name: 'Import/Export', test: () => this.integrationTests.testImportExport() },
      { name: 'Sync Middleware Integration', test: () => this.integrationTests.testSyncMiddlewareIntegration() },
      { name: 'Error Handling', test: () => this.errorValidationTests.testErrorHandling() },
      { name: 'Data Validation', test: () => this.errorValidationTests.testDataValidation() }
    ];

    for (const testCase of tests) {
      try {
        console.log(`\n🔍 Testing: ${testCase.name}`);
        const result = await testCase.test();
        this.testResults[testCase.name] = result;
        console.log(`${result ? '✅' : '❌'} ${testCase.name}: ${result ? 'PASSED' : 'FAILED'}`);
      } catch (error) {
        console.error(`❌ ${testCase.name}: ERROR - ${error.message}`);
        this.testResults[testCase.name] = false;
      }
    }

    const passed = Object.values(this.testResults).filter(r => r).length;
    const failed = Object.values(this.testResults).filter(r => !r).length;

    console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
    
    return { passed, failed, results: this.testResults };
  }

  /**
   * Get test results
   */
  getResults(): { [key: string]: boolean } {
    return this.testResults;
  }

  /**
   * Utility method to create delay
   */
  static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}