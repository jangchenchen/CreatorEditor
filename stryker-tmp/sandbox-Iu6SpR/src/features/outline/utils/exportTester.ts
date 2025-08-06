/**
 * 导出功能测试工具
 * 用于验证Word/PDF/JSON导出功能是否正常工作
 */
// @ts-nocheck


import { OutlineData, Character, Chapter, PlotEvent } from '../types/outline.types';
import { ExportOptions } from '../types/exportTypes';
import { CoordinatorExportService } from '../services/exports/coordinatorExportService';

/**
 * 创建测试数据
 */
export function createTestData(): OutlineData {
  // 创建测试角色
  const characters: Character[] = [
    {
      id: 'char1',
      name: '张三',
      age: 25,
      gender: 'male',
      role: 'protagonist',
      background: '出身平凡家庭，有着坚强的意志力和不屈不挠的精神。',
      personality: '勇敢、善良、有正义感',
      appearance: '中等身材，明亮的眼睛，温和的笑容',
      goals: '保护家人和朋友，实现自己的理想',
      skills: ['武术', '策略思考', '领导能力'],
      relationships: [],
      development: {
        arc: '从普通人成长为英雄的故事',
        keyMoments: ['遇到导师', '第一次战斗', '面对挫折', '最终胜利'],
        growth: '从软弱变得坚强，从自私变得无私',
        conflicts: ['内心恐惧', '道德选择', '能力不足'],
      },
      lastUpdated: new Date(),
    },
    {
      id: 'char2',
      name: '李四',
      age: 30,
      gender: 'male',
      role: 'antagonist',
      background: '曾经的好友，因为误会和嫉妒走上了错误的道路。',
      personality: '聪明、狡猾、复杂',
      appearance: '高挑身材，深邃的眼神，冷漠的表情',
      goals: '证明自己的价值，获得认可',
      skills: ['谋略', '武艺', '心理战'],
      relationships: [],
      development: {
        arc: '从朋友变成敌人，最终得到救赎',
        keyMoments: ['背叛朋友', '走向黑暗', '内心挣扎', '最终觉醒'],
        growth: '从善良变得邪恶，最终回归本性',
        conflicts: ['内心善恶', '过去创伤', '现实压力'],
      },
      lastUpdated: new Date(),
    },
  ];

  // 创建测试章节
  const chapters: Chapter[] = [
    {
      id: 'chap1',
      number: 1,
      title: '初遇',
      summary: '主角与重要人物的第一次相遇，为后续情节埋下伏笔。',
      content: '这是第一章的详细内容...',
      scenes: [
        {
          id: 'scene1',
          title: '开场',
          description: '故事的开始',
          location: '小镇',
          characters: ['char1'],
          timeOfDay: 'morning',
          wordCount: 500,
          lastUpdated: new Date(),
        },
      ],
      status: 'complete',
      wordCount: 2500,
      estimatedReadingTime: 10,
      lastUpdated: new Date(),
    },
    {
      id: 'chap2',
      number: 2,
      title: '冲突',
      summary: '矛盾开始激化，主角面临第一个重大挑战。',
      content: '这是第二章的详细内容...',
      scenes: [
        {
          id: 'scene2',
          title: '冲突爆发',
          description: '主要冲突的开始',
          location: '城市',
          characters: ['char1', 'char2'],
          timeOfDay: 'evening',
          wordCount: 800,
          lastUpdated: new Date(),
        },
      ],
      status: 'draft',
      wordCount: 3000,
      estimatedReadingTime: 12,
      lastUpdated: new Date(),
    },
  ];

  // 创建测试时间线事件
  const timeline: PlotEvent[] = [
    {
      id: 'event1',
      title: '主角出场',
      description: '介绍主角的基本信息和背景',
      timestamp: '2024-01-01T08:00:00.000Z',
      type: 'beginning',
      importance: 'critical',
      location: '小镇',
      characters: ['char1'],
      consequences: '为整个故事奠定基调',
      notes: '重要的开场戏',
      isKeyEvent: true,
      lastUpdated: new Date(),
    },
    {
      id: 'event2',
      title: '初次冲突',
      description: '主角与反派的第一次交锋',
      timestamp: '2024-01-02T18:00:00.000Z',
      type: 'development',
      importance: 'important',
      location: '城市',
      characters: ['char1', 'char2'],
      consequences: '关系恶化，矛盾加深',
      notes: '推动情节发展的关键事件',
      isKeyEvent: true,
      lastUpdated: new Date(),
    },
  ];

  return {
    id: 'test-outline',
    project: {
      id: 'test-project',
      name: '测试小说项目',
      description: '这是一个用于测试导出功能的示例项目',
      author: '测试作者',
      genre: '奇幻',
      targetWordCount: 50000,
      createdAt: new Date(),
      lastUpdated: new Date(),
    },
    story: {
      id: 'test-story',
      background: {
        era: '现代',
        location: '虚构城市',
        socialEnvironment: '和平时期',
        historicalContext: '科技发达的现代社会',
      },
      coreTheme: {
        theme: '成长与友谊',
        conflict: '个人成长与现实压力的矛盾',
        message: '真正的力量来自于内心的坚持和朋友的支持',
        keywords: ['成长', '友谊', '勇气', '坚持'],
      },
      synopsis: {
        beginning: '普通青年张三过着平凡的生活...',
        development: '意外卷入一场争斗，必须做出选择...',
        climax: '与昔日好友李四的最终对决...',
        ending: '通过努力和成长，最终化解矛盾...',
        overallTone: '积极向上，充满希望',
      },
      lastUpdated: new Date(),
    },
    characters: {
      characters: characters,
      relationships: [],
    },
    timeline: {
      id: 'test-timeline',
      events: timeline,
      startTime: '2024-01-01',
      endTime: '2024-12-31',
      timelineNotes: '整个故事跨越一年时间',
    },
    chapters: {
      id: 'test-chapters',
      chapters: chapters,
      totalChapters: 2,
      overallStructure: '经典三幕式结构',
    },
    world: {
      id: 'test-world',
      geography: {
        regions: [
          {
            id: 'region1',
            name: '和平小镇',
            description: '故事开始的地方，宁静祥和',
            significance: '主角的故乡',
            connectedRegions: ['region2'],
            lastUpdated: new Date(),
          },
        ],
        climate: '温带气候',
        landmarks: ['中央广场', '古老图书馆'],
        naturalFeatures: ['小河', '森林'],
      },
      society: {
        political: '民主制度',
        economic: '市场经济',
        cultural: ['多元文化', '包容开放'],
        religious: '信仰自由',
        technology: '现代科技',
        socialClasses: ['普通市民', '精英阶层'],
      },
      history: {
        timeline: [],
        legends: ['古老的传说'],
        familySecrets: [],
        mysteries: [],
      },
      customRules: ['魔法不存在', '科技为主'],
      inspirationSources: ['现实生活', '经典文学'],
    },
    subplots: {
      id: 'test-subplots',
      subplots: [],
      secondaryStories: [],
      weavingStrategy: '平行发展',
    },
    ideas: {
      id: 'test-ideas',
      ideas: [
        {
          id: 'idea1',
          title: '友谊的力量',
          description: '通过友谊克服困难',
          category: 'theme',
          status: 'developed',
          tags: ['友谊', '成长'],
          notes: '核心主题之一',
          relatedElements: ['char1', 'char2'],
          potential: 'high',
          lastUpdated: new Date(),
        },
      ],
      alternatives: [],
      inspirationSources: ['个人经历', '观察生活'],
      brainstormingSessions: [],
    },
    themes: {
      id: 'test-themes',
      themes: {
        primary: '成长与友谊',
        secondary: ['勇气', '坚持', '宽恕'],
        symbols: ['桥梁', '光明'],
        metaphors: ['旅程', '成长之路'],
        motifs: ['重复出现的梦境', '信物'],
      },
      characterMotivations: [
        {
          characterId: 'char1',
          innerConflict: '自信不足与责任感的冲突',
          growthMotivation: '保护重要的人',
          emotionalJourney: '从迷茫到坚定',
          moralDilemma: '个人安全与集体利益的选择',
          resolution: '通过成长找到平衡',
        },
      ],
      philosophicalQuestions: ['什么是真正的友谊？', '成长的代价是什么？'],
      socialCommentary: ['现代社会中的人际关系', '个人价值的体现'],
      personalReflections: ['友谊的珍贵', '成长的必要性'],
    },
  };
}

/**
 * 测试JSON导出
 */
export async function testJsonExport(): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🧪 测试JSON导出...');

    const testData = createTestData();
    const options: ExportOptions = {
      format: 'json',
      fileName: 'test-export',
      modules: {
        story: true,
        characters: true,
        timeline: true,
        chapters: true,
        world: true,
        themes: true,
        subplots: true,
        ideas: true,
      },
      formatting: {
        includeMetadata: true,
        prettyPrint: true,
      },
    };

    await CoordinatorExportService.exportDocument(testData, options, progress => {
      console.log(
        `JSON导出进度: ${progress.stage} - ${progress.progress}% - ${progress.currentStep}`
      );
    });

    console.log('✅ JSON导出测试成功');
    return { success: true };
  } catch (error) {
    console.error('❌ JSON导出测试失败:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * 测试Word导出
 */
export async function testWordExport(): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🧪 测试Word导出...');

    const testData = createTestData();
    const options: ExportOptions = {
      format: 'docx',
      fileName: 'test-export',
      modules: {
        story: true,
        characters: true,
        timeline: true,
        chapters: true,
        world: true,
        themes: true,
        subplots: false,
        ideas: false,
      },
      formatting: {
        includeMetadata: true,
        fontSize: 12,
        fontFamily: 'Microsoft YaHei',
        pageSize: 'A4',
        margin: 2.5,
      },
    };

    await CoordinatorExportService.exportDocument(testData, options, progress => {
      console.log(
        `Word导出进度: ${progress.stage} - ${progress.progress}% - ${progress.currentStep}`
      );
    });

    console.log('✅ Word导出测试成功');
    return { success: true };
  } catch (error) {
    console.error('❌ Word导出测试失败:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * 测试PDF导出
 */
export async function testPdfExport(): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🧪 测试PDF导出...');

    const testData = createTestData();
    const options: ExportOptions = {
      format: 'pdf',
      fileName: 'test-export',
      modules: {
        story: true,
        characters: true,
        timeline: true,
        chapters: true,
        world: false,
        themes: false,
        subplots: false,
        ideas: false,
      },
      formatting: {
        includeMetadata: true,
        fontSize: 12,
        fontFamily: 'SimSun',
        pageSize: 'A4',
        margin: 2.5,
      },
    };

    await CoordinatorExportService.exportDocument(testData, options, progress => {
      console.log(
        `PDF导出进度: ${progress.stage} - ${progress.progress}% - ${progress.currentStep}`
      );
    });

    console.log('✅ PDF导出测试成功');
    return { success: true };
  } catch (error) {
    console.error('❌ PDF导出测试失败:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * 运行所有导出测试
 */
export async function runAllExportTests(): Promise<{
  json: { success: boolean; error?: string };
  word: { success: boolean; error?: string };
  pdf: { success: boolean; error?: string };
  overall: boolean;
}> {
  console.log('🚀 开始运行导出功能测试...');

  const results = {
    json: await testJsonExport(),
    word: await testWordExport(),
    pdf: await testPdfExport(),
    overall: false,
  };

  results.overall = results.json.success && results.word.success && results.pdf.success;

  console.log('\n📊 测试结果汇总:');
  console.log(`JSON导出: ${results.json.success ? '✅ 通过' : '❌ 失败'}`);
  console.log(`Word导出: ${results.word.success ? '✅ 通过' : '❌ 失败'}`);
  console.log(`PDF导出: ${results.pdf.success ? '✅ 通过' : '❌ 失败'}`);
  console.log(`整体状态: ${results.overall ? '✅ 全部通过' : '❌ 部分失败'}`);

  if (!results.overall) {
    console.log('\n❗ 失败详情:');
    if (!results.json.success) console.log(`JSON: ${results.json.error}`);
    if (!results.word.success) console.log(`Word: ${results.word.error}`);
    if (!results.pdf.success) console.log(`PDF: ${results.pdf.error}`);
  }

  return results;
}
