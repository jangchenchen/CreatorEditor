# CreationEditor 开发者指南

## 🎯 项目概述

CreationEditor 是一个专为小说创作者设计的现代化编辑器，提供完整的创作工具链，包括大纲管理、角色关系、时间线规划、世界构建等功能。

### 技术栈
- **前端框架**: React 18 + TypeScript
- **状态管理**: Redux Toolkit + React-Redux
- **UI组件库**: Material-UI v5
- **构建工具**: Vite 4
- **桌面应用**: Electron
- **测试框架**: Jest + React Testing Library
- **开发工具**: ESLint + Prettier + Husky

### 架构特点
- 🏗️ **模块化架构**: 每个文件 < 200行，职责单一
- ⚡ **高性能**: Bundle分割、选择器缓存、虚拟化渲染
- 🛡️ **高可靠**: 完整错误处理、自动保存、数据完整性检查
- 🧪 **高质量**: 自动化测试、性能监控、代码质量保证

## 🚀 快速开始

### 环境要求
- Node.js 16+
- npm 8+
- Git

### 安装与运行
```bash
# 克隆项目
git clone <repository-url>
cd CreationEditor

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 运行测试
npm test

# 启动Storybook
npm run storybook
```

## 📁 项目结构

```
CreationEditor/
├── src/
│   ├── app/                          # Redux store配置
│   ├── components/                   # 通用组件
│   ├── features/                     # 功能模块
│   │   ├── outline/                  # 大纲功能
│   │   │   ├── components/           # UI组件
│   │   │   │   └── modules/          # 8个创作模块
│   │   │   ├── slices/              # Redux状态
│   │   │   │   ├── optimized/       # 优化选择器
│   │   │   │   └── root/            # 基础选择器
│   │   │   ├── services/            # 业务服务
│   │   │   │   ├── exports/         # 导出服务
│   │   │   │   ├── integrity/       # 数据完整性
│   │   │   │   └── migration/       # 数据迁移
│   │   │   ├── middleware/          # Redux中间件
│   │   │   ├── hooks/               # 自定义Hook
│   │   │   └── utils/               # 工具函数
│   │   └── editor/                  # 编辑器功能
│   └── utils/                       # 全局工具
│       ├── performance/             # 性能监控
│       ├── error/                   # 错误处理
│       └── redux/                   # Redux工具
├── tests/                           # 测试文件
│   ├── unit/                        # 单元测试
│   ├── integration/                 # 集成测试
│   ├── performance/                 # 性能测试
│   └── utils/                       # 测试工具
├── docs/                            # 文档
│   ├── adr/                         # 架构决策记录
│   ├── development/                 # 开发文档
│   ├── performance/                 # 性能文档
│   └── quality/                     # 质量文档
├── configs/                         # 配置文件
├── .storybook/                      # Storybook配置
└── stories/                         # 组件故事
```

## 🏗️ 架构设计

### 模块化原则
1. **单一职责**: 每个文件/模块只负责一个功能
2. **依赖倒置**: 高层模块不依赖低层模块，都依赖抽象
3. **开闭原则**: 对扩展开放，对修改关闭
4. **接口隔离**: 客户端不应依赖它不需要的接口

### 文件大小约束
- **严格限制**: 每个TypeScript文件 < 200行
- **超标处理**: 立即拆分为多个模块
- **检查工具**: `find src -name "*.ts*" | xargs wc -l | awk '$1 > 200'`

### Redux状态管理
```typescript
// 状态结构
interface AppState {
  outline: OutlineState;  // 大纲相关状态
  editor: EditorState;    // 编辑器状态
}

// 模块化Slice
├── projectSlice.ts     # 项目信息
├── storySlice.ts       # 故事概述
├── charactersSlice.ts  # 角色关系
├── timelineSlice.ts    # 时间线
├── chaptersSlice.ts    # 章节大纲
├── worldSlice.ts       # 世界构建
├── themesSlice.ts      # 主题探索
├── subplotsSlice.ts    # 副线情节
└── ideasSlice.ts       # 创意想法
```

## 🛠️ 开发规范

### 代码风格
- **ESLint**: 静态代码检查，复杂度 ≤ 10，嵌套深度 ≤ 4
- **Prettier**: 自动格式化，单引号，100字符宽度
- **Pre-commit**: 自动检查和格式化

### 命名约定
```typescript
// 文件命名
useCharacterArc.ts          // Hook: use + PascalCase
CharacterProfile.tsx        // 组件: PascalCase
characterActions.ts         // 工具: camelCase
outline.types.ts           // 类型: kebab-case.types.ts

// 变量命名
const userName = 'John';           // camelCase
const API_BASE_URL = 'https://';   // CONSTANT
interface UserProfile {}          // PascalCase
type EventType = 'click';          // PascalCase
```

### TypeScript约定
```typescript
// 使用接口定义对象结构
interface Character {
  id: string;
  name: string;
  role: CharacterRole;
}

// 使用类型别名定义联合类型
type CharacterRole = 'protagonist' | 'antagonist' | 'supporting';

// 泛型约定
interface ApiResponse<TData> {
  data: TData;
  status: number;
}
```

### 组件规范
```typescript
// 组件结构
interface Props {
  // props定义
}

const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // hooks
  // event handlers
  // render logic
  
  return (
    // JSX
  );
};

export default Component;
```

## 🧪 测试策略

### 测试金字塔
```
    /\     E2E Tests (少量)
   /  \    ↑ 端到端测试
  /    \   
 /______\  Integration Tests (适量)
/        \ ↑ 集成测试
/__________\Unit Tests (大量)
           ↑ 单元测试
```

### 测试覆盖率目标
- **整体覆盖率**: 80%+
- **关键业务逻辑**: 95%+
- **UI组件**: 70%+
- **工具函数**: 90%+

### 测试工具
```bash
# 单元测试
npm test

# 覆盖率报告
npm run test:coverage

# 性能测试
npm test -- tests/performance/

# 突变测试
npm run test:mutation

# 集成测试
npm test -- tests/integration/
```

## ⚡ 性能优化

### Bundle优化
- **代码分割**: 主bundle 103KB (从1.66MB优化)
- **懒加载**: 路由级和组件级
- **Tree Shaking**: 移除未使用代码
- **Vendor分离**: 第三方库独立打包

### Redux优化
- **Memoized选择器**: 26个优化选择器，95%+缓存命中率
- **状态规范化**: 扁平化数据结构
- **中间件优化**: 防抖自动保存，数据同步

### 渲染优化
- **虚拟化**: 大列表使用React-Window
- **React.memo**: 避免不必要的重渲染
- **useMemo/useCallback**: 缓存计算和回调

### 监控工具
```typescript
// 性能监控
import { PerformanceProfiler } from '@/utils/performance';
import { SelectorPerformancePanel } from '@/utils/redux';

// 使用
<PerformanceProfiler id="CharacterList">
  <CharacterList />
</PerformanceProfiler>
```

## 🛡️ 质量保证

### 自动化检查
```bash
# 完整质量检查
npm run quality:check

# 单项检查
npm run lint           # 代码检查
npm run format:check   # 格式检查
npm run test:ci        # 测试
npm run analyze:bundle # Bundle分析
```

### 错误处理
- **全局边界**: React Error Boundary
- **错误日志**: 完整的错误收集和分析
- **用户通知**: 友好的错误提示
- **自动恢复**: 多层恢复策略

### 数据安全
- **自动保存**: 2秒防抖，3次重试
- **数据验证**: 完整性检查和清理
- **版本迁移**: 自动数据格式升级
- **备份机制**: 多版本备份

## 📊 开发工具

### 开发服务器
```bash
npm run dev              # 启动开发服务器 (5173端口)
npm run dev:debug        # 调试模式
```

### 构建和部署
```bash
npm run build            # 生产构建
npm run preview          # 预览构建结果
npm run dist             # Electron打包
```

### 分析工具
```bash
npm run analyze:bundle   # Bundle大小分析
npm run perf:profile     # 性能分析
npm run storybook        # 组件开发 (6006端口)
```

## 🔧 故障排除

### 常见问题

#### 构建失败
```bash
# 清理依赖和构建缓存
rm -rf node_modules dist .vite
npm install
npm run build
```

#### 测试失败
```bash
# 更新测试快照
npm test -- --updateSnapshot

# 运行特定测试
npm test -- --testNamePattern="Redux"
```

#### 性能问题
```bash
# 生成性能报告
npm run analyze:bundle
npm run perf:profile

# 检查选择器性能
# 在浏览器控制台运行
import { selectorPerformanceTracker } from '@/utils/redux';
console.table(selectorPerformanceTracker.getMetrics());
```

### 调试技巧
1. **React DevTools**: 组件状态和props检查
2. **Redux DevTools**: 状态变化追踪
3. **Performance面板**: 渲染性能分析
4. **Network面板**: Bundle加载分析

## 📝 贡献指南

### 开发流程
1. **创建分支**: `git checkout -b feature/your-feature`
2. **开发功能**: 遵循代码规范和测试要求
3. **提交代码**: 使用语义化提交信息
4. **创建PR**: 包含完整的描述和测试证据

### 提交规范
```
type(scope): description

feat(outline): 添加角色关系可视化功能
fix(storage): 修复自动保存时的数据丢失问题
docs(readme): 更新安装指南
test(characters): 添加角色管理的单元测试
perf(selectors): 优化选择器缓存策略
```

### PR检查清单
- [ ] 所有测试通过
- [ ] 代码覆盖率不下降
- [ ] ESLint和Prettier检查通过
- [ ] 文件大小 < 200行
- [ ] 添加必要的测试
- [ ] 更新相关文档
- [ ] 性能影响评估

## 📚 进阶资源

### 学习资料
- [React官方文档](https://react.dev/)
- [Redux Toolkit文档](https://redux-toolkit.js.org/)
- [Material-UI指南](https://mui.com/)
- [TypeScript手册](https://www.typescriptlang.org/docs/)

### 项目相关文档
- [性能优化指南](./performance/bundle-analysis-report.md)
- [Redux选择器优化](./development/selector-optimization-guide.md)
- [测试覆盖率分析](./quality/test-coverage-analysis.md)
- [架构决策记录](./adr/)

---

**维护者**: 开发团队  
**最后更新**: 2025年1月  
**文档版本**: v2.0.0