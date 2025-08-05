/**
 * Migration Utility Functions
 * Helper functions for data migration
 */

/**
 * Generate unique identifier
 */
export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Deep clone an object to avoid mutations during migration
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as unknown as T;
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * Safe date conversion with fallback
 */
export function safeDate(value: any, fallback: Date = new Date()): Date {
  if (!value) return fallback;
  const date = new Date(value);
  return isNaN(date.getTime()) ? fallback : date;
}

/**
 * Ensure array type with fallback
 */
export function ensureArray<T>(value: any, fallback: T[] = []): T[] {
  return Array.isArray(value) ? value : fallback;
}

/**
 * Safe number conversion with fallback
 */
export function safeNumber(value: any, fallback: number): number {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
}

/**
 * Safe boolean conversion with fallback
 */
export function safeBoolean(value: any, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}