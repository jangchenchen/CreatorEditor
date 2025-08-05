/**
 * Performance Tests
 * Utilities for testing storage performance
 */

import { Store } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { localStorageService } from '../../services/localStorageService';

export interface PerformanceResult {
  averageTime: number;
  minTime: number;
  maxTime: number;
  totalTime: number;
}

/**
 * Performance test utilities
 */
export const performanceUtils = {
  /**
   * Test save performance
   */
  async testSavePerformance(store: Store<RootState>, iterations: number = 10): Promise<PerformanceResult> {
    const times: number[] = [];
    
    console.log(`🚀 Testing save performance with ${iterations} iterations...`);
    
    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      await localStorageService.saveState(store.getState());
      const end = Date.now();
      times.push(end - start);
      
      if ((i + 1) % 5 === 0) {
        console.log(`✓ Completed ${i + 1}/${iterations} save operations`);
      }
    }
    
    const result = {
      averageTime: times.reduce((a, b) => a + b, 0) / times.length,
      minTime: Math.min(...times),
      maxTime: Math.max(...times),
      totalTime: times.reduce((a, b) => a + b, 0)
    };

    console.log(`📊 Save Performance Results:`);
    console.log(`   Average: ${result.averageTime.toFixed(2)}ms`);
    console.log(`   Min: ${result.minTime}ms`);
    console.log(`   Max: ${result.maxTime}ms`);
    console.log(`   Total: ${result.totalTime}ms`);
    
    return result;
  },

  /**
   * Test load performance
   */
  async testLoadPerformance(iterations: number = 10): Promise<PerformanceResult> {
    const times: number[] = [];
    
    console.log(`🚀 Testing load performance with ${iterations} iterations...`);
    
    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      await localStorageService.loadProject();
      const end = Date.now();
      times.push(end - start);
      
      if ((i + 1) % 5 === 0) {
        console.log(`✓ Completed ${i + 1}/${iterations} load operations`);
      }
    }
    
    const result = {
      averageTime: times.reduce((a, b) => a + b, 0) / times.length,
      minTime: Math.min(...times),
      maxTime: Math.max(...times),
      totalTime: times.reduce((a, b) => a + b, 0)
    };

    console.log(`📊 Load Performance Results:`);
    console.log(`   Average: ${result.averageTime.toFixed(2)}ms`);
    console.log(`   Min: ${result.minTime}ms`);
    console.log(`   Max: ${result.maxTime}ms`);
    console.log(`   Total: ${result.totalTime}ms`);
    
    return result;
  },

  /**
   * Test memory usage during operations
   */
  async testMemoryUsage(store: Store<RootState>, operations: number = 100): Promise<{
    initialMemory: number;
    peakMemory: number;
    finalMemory: number;
    memoryGrowth: number;
  }> {
    if (!performance.memory) {
      throw new Error('Performance memory API not available');
    }

    const initialMemory = performance.memory.usedJSHeapSize;
    let peakMemory = initialMemory;
    
    console.log(`🧠 Testing memory usage with ${operations} operations...`);
    
    for (let i = 0; i < operations; i++) {
      // Perform a save operation
      await localStorageService.saveState(store.getState());
      
      // Check current memory usage
      const currentMemory = performance.memory.usedJSHeapSize;
      if (currentMemory > peakMemory) {
        peakMemory = currentMemory;
      }
      
      if ((i + 1) % 25 === 0) {
        console.log(`✓ Completed ${i + 1}/${operations} memory test operations`);
      }
    }
    
    const finalMemory = performance.memory.usedJSHeapSize;
    const memoryGrowth = finalMemory - initialMemory;
    
    const result = {
      initialMemory,
      peakMemory,
      finalMemory,
      memoryGrowth
    };

    console.log(`🧠 Memory Usage Results:`);
    console.log(`   Initial: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Peak: ${(peakMemory / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Final: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Growth: ${(memoryGrowth / 1024 / 1024).toFixed(2)} MB`);
    
    return result;
  }
};