/**
 * Storage Test Utilities
 * Main entry point for storage testing - delegates to modular test suite
 *
 * @deprecated This file maintains backward compatibility.
 * Use individual test modules from ./tests/ for new development.
 */
// @ts-nocheck


// Re-export all test utilities from the modular structure
export {
  StorageTestSuite,
  StorageTests,
  IntegrationTests,
  ErrorValidationTests,
  TestDataFactory,
  performanceUtils,
  runStorageIntegrationTest,
  runComprehensiveStorageTests,
  type PerformanceResult,
} from './tests';

// Maintain backward compatibility
import {
  StorageTestSuite as ModularStorageTestSuite,
  runStorageIntegrationTest,
  performanceUtils,
} from './tests';

/**
 * @deprecated Use the modular StorageTestSuite from ./tests/StorageTestSuite
 */
export const StorageTestSuite = ModularStorageTestSuite;

/**
 * @deprecated Use runStorageIntegrationTest from ./tests/StorageTestRunner
 */
export { runStorageIntegrationTest };

/**
 * @deprecated Use performanceUtils from ./tests/PerformanceTests
 */
export { performanceUtils };

export default StorageTestSuite;
