/**
 * Stryker突变测试配置
 * 用于评估现有测试套件的质量
 */

export default {
  // 项目根目录和源文件位置
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  
  // 测试运行器配置
  testRunner: 'jest',
  
  // TypeScript类型检查
  checkers: ['typescript'],
  tsconfigFile: 'configs/tsconfig.json',
  
  // 需要进行突变测试的文件
  mutate: [
    // 优先测试核心业务逻辑
    'src/features/outline/slices/*.ts',
    'src/features/outline/slices/root/*.ts',
    
    // 工具函数和选择器
    'src/features/outline/slices/optimized/*.ts',
    'src/features/outline/utils/**/*.ts',
    
    // 服务层（高风险区域）
    'src/features/outline/services/**/*.ts',
    
    // 排除测试文件、类型定义等
    '!src/**/*.test.ts',
    '!src/**/*.test.tsx',
    '!src/**/__tests__/**',
    '!src/**/*.d.ts',
    '!src/**/*.config.ts',
    '!src/**/*.stories.tsx'
  ],
  
  // Jest配置
  jest: {
    projectType: 'custom',
    configFile: 'jest.config.js',
    enableFindRelatedTests: true,
  },
  
  // 并发配置 - 根据CPU核心数调整
  concurrency: 2,
  
  // 突变测试阈值
  thresholds: {
    high: 90,      // 优秀：90%以上突变被检测到
    low: 70,       // 及格：70%以上突变被检测到
    break: 60      // 不及格：低于60%会中断构建
  },
  
  // 超时配置
  timeoutMS: 60000,          // 单个测试超时
  timeoutFactor: 1.5,        // 突变测试超时倍数
  
  // 覆盖率分析
  coverageAnalysis: 'perTest',
  
  // HTML报告配置
  htmlReporter: {
    fileName: 'reports/mutation/index.html'
  },
  
  // 性能优化
  disableBail: false,        // 启用快速失败
  
  // 日志级别
  logLevel: 'info',
  
  // 插件
  plugins: [
    '@stryker-mutator/jest-runner',
    '@stryker-mutator/typescript-checker'
  ],
  
  // 环境变量
  tempDirName: 'stryker-tmp',
  cleanTempDir: true
};