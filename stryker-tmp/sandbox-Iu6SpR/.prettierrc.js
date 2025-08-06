// @ts-nocheck
module.exports = {
  // 基本格式化选项
  semi: true,                    // 语句末尾添加分号
  singleQuote: true,            // 使用单引号而不是双引号
  tabWidth: 2,                  // 缩进宽度
  useTabs: false,               // 使用空格而不是制表符
  printWidth: 100,              // 每行最大字符数
  
  // JSX 特定配置
  jsxSingleQuote: true,         // JSX 中使用单引号
  jsxBracketSameLine: false,    // JSX 标签的右括号是否与最后一行属性在同一行
  
  // 对象和数组
  trailingComma: 'es5',         // 尾随逗号：在ES5中有效的地方添加
  bracketSpacing: true,         // 对象字面量的大括号之间添加空格
  
  // 箭头函数
  arrowParens: 'avoid',         // 箭头函数参数周围的括号：avoid 单参数时避免括号
  
  // 行尾
  endOfLine: 'lf',              // 行尾序列：LF
  
  // HTML
  htmlWhitespaceSensitivity: 'css',  // HTML 空白敏感度
  
  // 嵌入语言格式化
  embeddedLanguageFormatting: 'auto',
  
  // Markdown
  proseWrap: 'preserve',        // Markdown 文本换行
  
  // 文件覆盖特定配置
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
    {
      files: '*.{css,scss,less}',
      options: {
        singleQuote: false,
      },
    },
  ],
};