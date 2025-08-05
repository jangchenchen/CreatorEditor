/**
 * Storage Test Runner
 * Main entry point for running storage integration tests
 */

import { Store } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { StorageTestSuite } from './StorageTestSuite';
import { performanceUtils } from './PerformanceTests';

/**
 * Quick integration test function
 */
export async function runStorageIntegrationTest(store: Store<RootState>): Promise<boolean> {
  const testSuite = new StorageTestSuite(store);
  const results = await testSuite.runAllTests();
  
  console.log('\n🎯 Storage Integration Test Summary:');
  console.log(`Total Tests: ${results.passed + results.failed}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
  
  return results.failed === 0;
}

/**
 * Run comprehensive storage tests including performance
 */
export async function runComprehensiveStorageTests(store: Store<RootState>): Promise<{
  integrationTestsPassed: boolean;
  performanceResults: {
    save: any;
    load: any;
    memory?: any;
  };
}> {
  console.log('🧪 Starting Comprehensive Storage Tests...');
  
  // Run integration tests
  const integrationTestsPassed = await runStorageIntegrationTest(store);
  
  // Run performance tests
  console.log('\n🚀 Starting Performance Tests...');
  
  const savePerformance = await performanceUtils.testSavePerformance(store, 5);
  const loadPerformance = await performanceUtils.testLoadPerformance(5);
  
  let memoryPerformance;
  try {
    memoryPerformance = await performanceUtils.testMemoryUsage(store, 10);
  } catch (error) {
    console.warn('Memory performance test skipped:', error.message);
  }
  
  const performanceResults = {
    save: savePerformance,
    load: loadPerformance,
    memory: memoryPerformance
  };
  
  console.log('\n✅ Comprehensive Storage Tests Complete');
  
  return {
    integrationTestsPassed,
    performanceResults
  };
}