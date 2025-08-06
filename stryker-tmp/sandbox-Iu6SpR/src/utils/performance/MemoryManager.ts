/**
 * 内存管理器
 * 监控内存使用、检测内存泄漏、提供内存优化策略
 */
// @ts-nocheck


export interface MemoryUsage {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
  timestamp: number;
}

export interface MemoryAlert {
  type: 'warning' | 'critical';
  message: string;
  usage: MemoryUsage;
  timestamp: number;
}

export interface ObjectPoolItem<T> {
  object: T;
  inUse: boolean;
  lastUsed: number;
}

class MemoryManager {
  private memoryHistory: MemoryUsage[] = [];
  private memoryAlerts: MemoryAlert[] = [];
  private objectPools = new Map<string, ObjectPoolItem<any>[]>();
  private weakRefs = new Set<WeakRef<any>>();
  private memoryThresholds = {
    warningPercent: 70, // 内存使用超过70%警告
    criticalPercent: 90, // 内存使用超过90%严重警告
    maxHistorySize: 100, // 保留最近100次内存记录
  };
  private isMonitoring = false;
  private monitoringInterval: NodeJS.Timeout | null = null;

  /**
   * 开始内存监控
   */
  startMonitoring(intervalMs: number = 5000): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.monitoringInterval = setInterval(() => {
      this.recordMemoryUsage();
    }, intervalMs);

    console.log('Memory monitoring started');
  }

  /**
   * 停止内存监控
   */
  stopMonitoring(): void {
    if (!this.isMonitoring) return;

    this.isMonitoring = false;
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    console.log('Memory monitoring stopped');
  }

  /**
   * 记录当前内存使用情况
   */
  recordMemoryUsage(): MemoryUsage | null {
    if (!('memory' in performance)) {
      console.warn('Memory API not available in this environment');
      return null;
    }

    const memory = (performance as any).memory;
    const usage: MemoryUsage = {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      timestamp: Date.now(),
    };

    // 添加到历史记录
    this.memoryHistory.push(usage);
    if (this.memoryHistory.length > this.memoryThresholds.maxHistorySize) {
      this.memoryHistory.shift();
    }

    // 检查内存阈值
    this.checkMemoryThresholds(usage);

    return usage;
  }

  /**
   * 检查内存阈值并生成警告
   */
  private checkMemoryThresholds(usage: MemoryUsage): void {
    const usagePercent = (usage.usedJSHeapSize / usage.jsHeapSizeLimit) * 100;

    if (usagePercent >= this.memoryThresholds.criticalPercent) {
      const alert: MemoryAlert = {
        type: 'critical',
        message: `Critical memory usage: ${usagePercent.toFixed(1)}%`,
        usage,
        timestamp: Date.now(),
      };
      this.memoryAlerts.push(alert);
      console.error(alert.message, usage);
    } else if (usagePercent >= this.memoryThresholds.warningPercent) {
      const alert: MemoryAlert = {
        type: 'warning',
        message: `High memory usage: ${usagePercent.toFixed(1)}%`,
        usage,
        timestamp: Date.now(),
      };
      this.memoryAlerts.push(alert);
      console.warn(alert.message, usage);
    }

    // 保持最近的50个警告
    if (this.memoryAlerts.length > 50) {
      this.memoryAlerts = this.memoryAlerts.slice(-50);
    }
  }

  /**
   * 获取内存使用统计
   */
  getMemoryStats(): {
    current: MemoryUsage | null;
    average: number;
    peak: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    leakDetection: {
      suspectedLeaks: number;
      recommendation: string;
    };
  } {
    const current = this.getCurrentMemoryUsage();
    if (!current) {
      return {
        current: null,
        average: 0,
        peak: 0,
        trend: 'stable',
        leakDetection: { suspectedLeaks: 0, recommendation: 'Memory API not available' },
      };
    }

    const recentUsages = this.memoryHistory.slice(-10).map(u => u.usedJSHeapSize);
    const average = recentUsages.reduce((a, b) => a + b, 0) / recentUsages.length;
    const peak = Math.max(...this.memoryHistory.map(u => u.usedJSHeapSize));

    // 简单的趋势分析
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (recentUsages.length >= 2) {
      const first = recentUsages[0];
      const last = recentUsages[recentUsages.length - 1];
      const change = (last - first) / first;
      if (change > 0.1) trend = 'increasing';
      else if (change < -0.1) trend = 'decreasing';
    }

    // 内存泄漏检测
    const leakDetection = this.detectMemoryLeaks();

    return {
      current,
      average: Math.round(average / 1024 / 1024), // 转换为 MB
      peak: Math.round(peak / 1024 / 1024),
      trend,
      leakDetection,
    };
  }

  /**
   * 检测可能的内存泄漏
   */
  private detectMemoryLeaks(): { suspectedLeaks: number; recommendation: string } {
    if (this.memoryHistory.length < 10) {
      return {
        suspectedLeaks: 0,
        recommendation: 'Not enough data for leak detection',
      };
    }

    // 检查内存是否持续增长
    const recentGrowth = this.memoryHistory.slice(-10);
    let continuousGrowth = 0;

    for (let i = 1; i < recentGrowth.length; i++) {
      if (recentGrowth[i].usedJSHeapSize > recentGrowth[i - 1].usedJSHeapSize) {
        continuousGrowth++;
      }
    }

    const growthRatio = continuousGrowth / (recentGrowth.length - 1);

    let suspectedLeaks = 0;
    let recommendation = '';

    if (growthRatio > 0.8) {
      suspectedLeaks = Math.round(growthRatio * 10);
      recommendation =
        'Possible memory leak detected. Check for uncleaned event listeners, closures, or large data structures.';
    } else if (growthRatio > 0.6) {
      suspectedLeaks = Math.round(growthRatio * 5);
      recommendation =
        'Memory usage trending upward. Consider running garbage collection or optimizing data usage.';
    } else {
      recommendation = 'Memory usage appears stable.';
    }

    return { suspectedLeaks, recommendation };
  }

  /**
   * 获取当前内存使用情况
   */
  getCurrentMemoryUsage(): MemoryUsage | null {
    if (!('memory' in performance)) return null;

    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      timestamp: Date.now(),
    };
  }

  /**
   * 创建对象池
   */
  createObjectPool<T>(
    poolName: string,
    factory: () => T,
    reset: (obj: T) => void,
    initialSize: number = 10
  ): {
    acquire: () => T;
    release: (obj: T) => void;
    size: () => number;
    clear: () => void;
  } {
    const pool: ObjectPoolItem<T>[] = [];

    // 预创建对象
    for (let i = 0; i < initialSize; i++) {
      pool.push({
        object: factory(),
        inUse: false,
        lastUsed: 0,
      });
    }

    this.objectPools.set(poolName, pool);

    return {
      acquire: (): T => {
        // 寻找可用的对象
        for (const item of pool) {
          if (!item.inUse) {
            item.inUse = true;
            item.lastUsed = Date.now();
            return item.object;
          }
        }

        // 没有可用对象，创建新的
        const newObj = factory();
        pool.push({
          object: newObj,
          inUse: true,
          lastUsed: Date.now(),
        });

        return newObj;
      },

      release: (obj: T): void => {
        const item = pool.find(item => item.object === obj);
        if (item) {
          reset(item.object);
          item.inUse = false;
          item.lastUsed = Date.now();
        }
      },

      size: (): number => pool.length,

      clear: (): void => {
        pool.length = 0;
        this.objectPools.delete(poolName);
      },
    };
  }

  /**
   * 创建弱引用
   */
  createWeakRef<T extends object>(obj: T, cleanup?: () => void): WeakRef<T> {
    const weakRef = new WeakRef(obj);

    if (cleanup) {
      // 使用FinalizationRegistry来监听对象的垃圾回收
      const registry = new FinalizationRegistry(heldValue => {
        cleanup();
      });
      registry.register(obj, null);
    }

    this.weakRefs.add(weakRef);
    return weakRef;
  }

  /**
   * 清理未使用的弱引用
   */
  cleanupWeakRefs(): number {
    let cleaned = 0;
    const toRemove: WeakRef<any>[] = [];

    for (const weakRef of this.weakRefs) {
      if (weakRef.deref() === undefined) {
        toRemove.push(weakRef);
        cleaned++;
      }
    }

    for (const ref of toRemove) {
      this.weakRefs.delete(ref);
    }

    return cleaned;
  }

  /**
   * 强制垃圾回收（仅在支持的环境中）
   */
  forceGarbageCollection(): boolean {
    if ('gc' in global) {
      (global as any).gc();
      return true;
    }

    if ('gc' in window) {
      (window as any).gc();
      return true;
    }

    console.warn('Garbage collection not available in this environment');
    return false;
  }

  /**
   * 获取所有内存警告
   */
  getMemoryAlerts(): MemoryAlert[] {
    return [...this.memoryAlerts];
  }

  /**
   * 清除内存历史和警告
   */
  clearHistory(): void {
    this.memoryHistory = [];
    this.memoryAlerts = [];
  }

  /**
   * 设置内存阈值
   */
  setThresholds(thresholds: Partial<typeof this.memoryThresholds>): void {
    this.memoryThresholds = { ...this.memoryThresholds, ...thresholds };
  }

  /**
   * 获取对象池统计
   */
  getObjectPoolStats(): Record<string, { total: number; inUse: number; available: number }> {
    const stats: Record<string, { total: number; inUse: number; available: number }> = {};

    for (const [name, pool] of this.objectPools.entries()) {
      const inUse = pool.filter(item => item.inUse).length;
      stats[name] = {
        total: pool.length,
        inUse,
        available: pool.length - inUse,
      };
    }

    return stats;
  }
}

// 全局内存管理器实例
export const memoryManager = new MemoryManager();

// 在开发环境中自动开始监控
if (process.env.NODE_ENV === 'development') {
  memoryManager.startMonitoring(10000); // 每10秒检查一次
}

export default MemoryManager;
