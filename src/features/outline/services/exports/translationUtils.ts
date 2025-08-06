/**
 * Translation utilities for export services
 */
export class TranslationUtils {
  static translateRole(role: string): string {
    const translations = {
      protagonist: '主角',
      antagonist: '反派',
      supporting: '配角',
      minor: '次要角色',
    };
    return translations[role] || role;
  }

  static translateEventImportance(importance: string): string {
    const translations = {
      critical: '关键',
      important: '重要',
      minor: '次要',
    };
    return translations[importance] || importance;
  }

  static translateChapterStatus(status: string): string {
    const translations = {
      planned: '计划中',
      writing: '写作中',
      completed: '已完成',
      revision: '修订中',
    };
    return translations[status] || status;
  }

  static translateSubplotPurpose(purpose: string): string {
    const translations = {
      background: '背景补充',
      contrast: '对比衬托',
      suspense: '悬念制造',
      'character-development': '角色发展',
      'comic-relief': '喜剧调节',
    };
    return translations[purpose] || purpose;
  }

  static translateSubplotStatus(status: string): string {
    const translations = {
      planned: '计划中',
      active: '进行中',
      resolved: '已解决',
      abandoned: '已放弃',
    };
    return translations[status] || status;
  }

  static translateIdeaType(type: string): string {
    const translations = {
      inspiration: '灵感',
      'plot-extension': '情节延伸',
      'alternative-ending': '替代结局',
      'scene-idea': '场景想法',
      'character-twist': '角色转折',
      dialogue: '对话',
    };
    return translations[type] || type;
  }

  static translateIdeaStatus(status: string): string {
    const translations = {
      draft: '草稿',
      considering: '考虑中',
      adopted: '已采用',
      rejected: '已拒绝',
      archived: '已归档',
    };
    return translations[status] || status;
  }
}
