/**
 * 路径工具函数
 * 用于处理文件路径相关的操作，避免代码重复
 */

/**
 * 从文件路径中提取文件名
 * @param filePath 完整的文件路径
 * @returns 文件名，如果无法提取则返回默认名称
 */
export const getFileName = (filePath: string): string => {
  return filePath.split('/').pop() || '未命名文件';
};

/**
 * 从文件路径中提取文件扩展名
 * @param filePath 完整的文件路径
 * @returns 文件扩展名（不包含点），如果没有扩展名则返回空字符串
 */
export const getFileExtension = (filePath: string): string => {
  const fileName = getFileName(filePath);
  const lastDotIndex = fileName.lastIndexOf('.');
  return lastDotIndex > 0 ? fileName.substring(lastDotIndex + 1) : '';
};

/**
 * 检查文件是否为支持的文档类型
 * @param filePath 文件路径
 * @returns 是否为支持的文档类型
 */
export const isSupportedDocumentType = (filePath: string): boolean => {
  const extension = getFileExtension(filePath).toLowerCase();
  const supportedTypes = ['md', 'markdown', 'txt'];
  return supportedTypes.includes(extension);
};
