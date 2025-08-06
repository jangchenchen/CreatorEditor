/**
 * 路径工具函数
 * 用于处理文件路径相关的操作，避免代码重复
 */
// @ts-nocheck


/**
 * 从文件路径中提取文件名
 * @param filePath 完整的文件路径
 * @returns 文件名，如果无法提取则返回默认名称
 */function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
export const getFileName = (filePath: string): string => {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    return stryMutAct_9fa48("3") ? filePath.split('/').pop() && '未命名文件' : stryMutAct_9fa48("2") ? false : stryMutAct_9fa48("1") ? true : (stryCov_9fa48("1", "2", "3"), filePath.split(stryMutAct_9fa48("4") ? "" : (stryCov_9fa48("4"), '/')).pop() || (stryMutAct_9fa48("5") ? "" : (stryCov_9fa48("5"), '未命名文件')));
  }
};

/**
 * 从文件路径中提取文件扩展名
 * @param filePath 完整的文件路径
 * @returns 文件扩展名（不包含点），如果没有扩展名则返回空字符串
 */
export const getFileExtension = (filePath: string): string => {
  if (stryMutAct_9fa48("6")) {
    {}
  } else {
    stryCov_9fa48("6");
    const fileName = getFileName(filePath);
    const lastDotIndex = fileName.lastIndexOf(stryMutAct_9fa48("7") ? "" : (stryCov_9fa48("7"), '.'));
    return (stryMutAct_9fa48("11") ? lastDotIndex <= 0 : stryMutAct_9fa48("10") ? lastDotIndex >= 0 : stryMutAct_9fa48("9") ? false : stryMutAct_9fa48("8") ? true : (stryCov_9fa48("8", "9", "10", "11"), lastDotIndex > 0)) ? stryMutAct_9fa48("12") ? fileName : (stryCov_9fa48("12"), fileName.substring(stryMutAct_9fa48("13") ? lastDotIndex - 1 : (stryCov_9fa48("13"), lastDotIndex + 1))) : stryMutAct_9fa48("14") ? "Stryker was here!" : (stryCov_9fa48("14"), '');
  }
};

/**
 * 检查文件是否为支持的文档类型
 * @param filePath 文件路径
 * @returns 是否为支持的文档类型
 */
export const isSupportedDocumentType = (filePath: string): boolean => {
  if (stryMutAct_9fa48("15")) {
    {}
  } else {
    stryCov_9fa48("15");
    const extension = stryMutAct_9fa48("16") ? getFileExtension(filePath).toUpperCase() : (stryCov_9fa48("16"), getFileExtension(filePath).toLowerCase());
    const supportedTypes = stryMutAct_9fa48("17") ? [] : (stryCov_9fa48("17"), [stryMutAct_9fa48("18") ? "" : (stryCov_9fa48("18"), 'md'), stryMutAct_9fa48("19") ? "" : (stryCov_9fa48("19"), 'markdown'), stryMutAct_9fa48("20") ? "" : (stryCov_9fa48("20"), 'txt')]);
    return supportedTypes.includes(extension);
  }
};