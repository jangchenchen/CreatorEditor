/**
 * 数据处理优化器
 * 提供批量处理、分页、缓存和防抖功能
 */

export interface ProcessingOptions {
  batchSize?: number;
  delay?: number;
  maxConcurrency?: number;
  enableCache?: boolean;
  cacheKey?: string;
  cacheTTL?: number; // 缓存生存时间（毫秒）
}

export interface BatchProcessResult<T> {
  processed: T[];
  errors: Array<{ index: number; error: any }>;
  duration: number;
  totalItems: number;
}

class DataProcessor {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private processingQueue = new Map<string, Promise<any>>();

  /**
   * 批量处理数据
   */
  async processBatch<T, R>(
    items: T[],
    processor: (item: T, index: number) => Promise<R> | R,
    options: ProcessingOptions = {}
  ): Promise<BatchProcessResult<R>> {
    const startTime = performance.now();
    const {
      batchSize = 50,
      delay = 10,
      maxConcurrency = 3,
      enableCache = false,
      cacheKey,
      cacheTTL = 300000, // 5分钟默认缓存
    } = options;

    // 检查缓存
    if (enableCache && cacheKey) {
      const cached = this.getFromCache<BatchProcessResult<R>>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const results: R[] = [];
    const errors: Array<{ index: number; error: any }> = [];
    const batches = this.createBatches(items, batchSize);

    // 限制并发执行的批次数量
    for (let i = 0; i < batches.length; i += maxConcurrency) {
      const currentBatches = batches.slice(i, i + maxConcurrency);
      const batchPromises = currentBatches.map(async (batch, batchIndex) => {
        const actualBatchIndex = i + batchIndex;

        try {
          const batchResults = await Promise.allSettled(
            batch.items.map((item, itemIndex) =>
              Promise.resolve(processor(item, batch.startIndex + itemIndex))
            )
          );

          batchResults.forEach((result, itemIndex) => {
            const globalIndex = batch.startIndex + itemIndex;
            if (result.status === 'fulfilled') {
              results[globalIndex] = result.value;
            } else {
              errors.push({ index: globalIndex, error: result.reason });
            }
          });
        } catch (error) {
          // 整个批次失败
          for (let j = 0; j < batch.items.length; j++) {
            errors.push({ index: batch.startIndex + j, error });
          }
        }

        // 批次间延迟
        if (actualBatchIndex < batches.length - 1 && delay > 0) {
          await this.sleep(delay);
        }
      });

      await Promise.all(batchPromises);
    }

    const result: BatchProcessResult<R> = {
      processed: results.filter(item => item !== undefined),
      errors,
      duration: performance.now() - startTime,
      totalItems: items.length,
    };

    // 缓存结果
    if (enableCache && cacheKey) {
      this.setCache(cacheKey, result, cacheTTL);
    }

    return result;
  }

  /**
   * 分页处理大数据集
   */
  async processPages<T, R>(
    items: T[],
    processor: (page: T[], pageNumber: number) => Promise<R[]> | R[],
    pageSize: number = 100,
    onProgress?: (progress: { current: number; total: number; percentage: number }) => void
  ): Promise<R[]> {
    const totalPages = Math.ceil(items.length / pageSize);
    const results: R[] = [];

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const startIndex = pageIndex * pageSize;
      const endIndex = Math.min(startIndex + pageSize, items.length);
      const page = items.slice(startIndex, endIndex);

      try {
        const pageResults = await Promise.resolve(processor(page, pageIndex));
        results.push(...pageResults);
      } catch (error) {
        console.error(`Error processing page ${pageIndex}:`, error);
        throw error;
      }

      // 报告进度
      if (onProgress) {
        const progress = {
          current: pageIndex + 1,
          total: totalPages,
          percentage: Math.round(((pageIndex + 1) / totalPages) * 100),
        };
        onProgress(progress);
      }

      // 让出控制权，避免阻塞UI
      await this.sleep(1);
    }

    return results;
  }

  /**
   * 防抖处理
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    key?: string
  ): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    let timeoutId: NodeJS.Timeout | null = null;
    const debounceKey = key || func.name || 'default';

    return (...args: Parameters<T>): Promise<ReturnType<T>> => {
      return new Promise((resolve, reject) => {
        // 清除之前的定时器
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // 设置新的定时器
        timeoutId = setTimeout(async () => {
          try {
            const result = await Promise.resolve(func.apply(this, args));
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, delay);
      });
    };
  }

  /**
   * 节流处理
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    key?: string
  ): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    let lastExecution = 0;
    const throttleKey = key || func.name || 'default';

    return (...args: Parameters<T>): Promise<ReturnType<T>> => {
      return new Promise(async (resolve, reject) => {
        const now = Date.now();

        if (now - lastExecution >= delay) {
          lastExecution = now;
          try {
            const result = await Promise.resolve(func.apply(this, args));
            resolve(result);
          } catch (error) {
            reject(error);
          }
        } else {
          // 如果在节流期间，延迟执行
          const remainingTime = delay - (now - lastExecution);
          setTimeout(async () => {
            lastExecution = Date.now();
            try {
              const result = await Promise.resolve(func.apply(this, args));
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }, remainingTime);
        }
      });
    };
  }

  /**
   * 创建数据批次
   */
  private createBatches<T>(
    items: T[],
    batchSize: number
  ): Array<{ items: T[]; startIndex: number }> {
    const batches: Array<{ items: T[]; startIndex: number }> = [];

    for (let i = 0; i < items.length; i += batchSize) {
      batches.push({
        items: items.slice(i, i + batchSize),
        startIndex: i,
      });
    }

    return batches;
  }

  /**
   * 异步延迟
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 缓存操作
   */
  private setCache<T>(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    // 检查是否过期
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  /**
   * 清理过期缓存
   */
  clearExpiredCache(): void {
    const now = Date.now();
    for (const [key, cached] of this.cache.entries()) {
      if (now - cached.timestamp > cached.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * 清除所有缓存
   */
  clearAllCache(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存统计
   */
  getCacheStats(): {
    totalEntries: number;
    memoryUsage: number;
    hitRate: number;
  } {
    return {
      totalEntries: this.cache.size,
      memoryUsage: this.calculateCacheMemoryUsage(),
      hitRate: 0, // 需要实现命中率统计
    };
  }

  private calculateCacheMemoryUsage(): number {
    // 粗略估算缓存占用的内存
    let totalSize = 0;
    for (const [key, cached] of this.cache.entries()) {
      totalSize += key.length * 2; // 字符串键的大小
      totalSize += JSON.stringify(cached.data).length * 2; // 数据的大小
      totalSize += 24; // 时间戳和元数据
    }
    return Math.round(totalSize / 1024); // 转换为 KB
  }
}

// 全局数据处理器实例
export const dataProcessor = new DataProcessor();

// 定时清理过期缓存
setInterval(() => {
  dataProcessor.clearExpiredCache();
}, 60000); // 每分钟清理一次

export default DataProcessor;
