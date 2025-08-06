import { Paragraph, TextRun, HeadingLevel } from 'docx';
import { OutlineData, Character, Chapter, PlotEvent, Subplot } from '../../types/outline.types';

/**
 * Word document section generators for novel export
 */
export class WordSectionGenerators {
  static generateStorySection(data: OutlineData): Paragraph[] {
    const story = data.story;
    return [
      new Paragraph({ text: '故事概述', heading: HeadingLevel.HEADING_1 }),
      this.createBoldParagraph(
        '背景设定',
        `${story.background.era} - ${story.background.location}`
      ),
      this.createBoldParagraph('社会环境', story.background.socialEnvironment),
      this.createBoldParagraph('核心主题', story.coreTheme.theme),
      this.createBoldParagraph('主要冲突', story.coreTheme.conflict),
      new Paragraph({ text: '故事梗概', heading: HeadingLevel.HEADING_2 }),
      this.createBoldParagraph('开端', story.synopsis.beginning),
      this.createBoldParagraph('发展', story.synopsis.development),
      this.createBoldParagraph('高潮', story.synopsis.climax),
      this.createBoldParagraph('结局', story.synopsis.ending),
      new Paragraph({ text: '' }),
    ];
  }

  static generateCharactersSection(characters: Character[]): Paragraph[] {
    const paragraphs = [new Paragraph({ text: '角色设定', heading: HeadingLevel.HEADING_1 })];

    characters.forEach(char => {
      paragraphs.push(
        new Paragraph({ text: char.name, heading: HeadingLevel.HEADING_2 }),
        this.createBoldParagraph('角色类型', this.translate('role', char.role)),
        this.createBoldParagraph('背景', char.background),
        this.createBoldParagraph('外貌', char.appearance),
        this.createBoldParagraph('性格特征', char.personality.join(', ')),
        this.createBoldParagraph('目标', char.goals),
        this.createBoldParagraph('动机', char.motivation),
        new Paragraph({ text: '' })
      );
    });

    return paragraphs;
  }

  static generateTimelineSection(events: PlotEvent[]): Paragraph[] {
    const paragraphs = [new Paragraph({ text: '情节时间线', heading: HeadingLevel.HEADING_1 })];

    events.forEach(event => {
      paragraphs.push(
        new Paragraph({
          text: `${event.timestamp} - ${event.title}`,
          heading: HeadingLevel.HEADING_2,
        }),
        this.createBoldParagraph('描述', event.description),
        this.createBoldParagraph('重要性', this.translate('importance', event.importance)),
        this.createBoldParagraph('影响', event.impact),
        new Paragraph({ text: '' })
      );
    });

    return paragraphs;
  }

  static generateWorldSection(world: any): Paragraph[] {
    return [
      new Paragraph({ text: '世界设定', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: '地理设定', heading: HeadingLevel.HEADING_2 }),
      this.createBoldParagraph('气候', world.geography.climate),
      new Paragraph({ text: '社会制度', heading: HeadingLevel.HEADING_2 }),
      this.createBoldParagraph('政治制度', world.society.political),
      this.createBoldParagraph('经济体系', world.society.economic),
      new Paragraph({ text: '' }),
    ];
  }

  static generateChaptersSection(chapters: Chapter[]): Paragraph[] {
    const paragraphs = [new Paragraph({ text: '章节大纲', heading: HeadingLevel.HEADING_1 })];

    chapters.forEach(chapter => {
      paragraphs.push(
        new Paragraph({
          text: `第${chapter.number}章: ${chapter.title}`,
          heading: HeadingLevel.HEADING_2,
        }),
        this.createBoldParagraph('概述', chapter.summary),
        this.createBoldParagraph('状态', this.translate('chapterStatus', chapter.status)),
        this.createBoldParagraph('目标字数', chapter.wordCountTarget.toString())
      );

      if (chapter.keyScenes.length > 0) {
        paragraphs.push(new Paragraph({ text: '关键场景:', style: 'Normal' }));
        chapter.keyScenes.forEach((scene, index) => {
          paragraphs.push(
            new Paragraph({
              text: `${index + 1}. ${scene.title}: ${scene.description}`,
              style: 'Normal',
            })
          );
        });
      }

      paragraphs.push(new Paragraph({ text: '' }));
    });

    return paragraphs;
  }

  static generateThemesSection(themes: any): Paragraph[] {
    return [
      new Paragraph({ text: '主题分析', heading: HeadingLevel.HEADING_1 }),
      this.createBoldParagraph('主要主题', themes.themes.primary),
      this.createBoldParagraph('次要主题', themes.themes.secondary.join(', ')),
      this.createBoldParagraph('象征意义', themes.themes.symbols.join(', ')),
      new Paragraph({ text: '' }),
    ];
  }

  static generateSubplotsSection(subplots: Subplot[]): Paragraph[] {
    const paragraphs = [new Paragraph({ text: '副线情节', heading: HeadingLevel.HEADING_1 })];

    subplots.forEach(subplot => {
      paragraphs.push(
        new Paragraph({ text: subplot.title, heading: HeadingLevel.HEADING_2 }),
        this.createBoldParagraph('描述', subplot.description),
        this.createBoldParagraph('目的', this.translate('subplotPurpose', subplot.purpose)),
        this.createBoldParagraph('状态', this.translate('subplotStatus', subplot.status)),
        this.createBoldParagraph(
          '章节范围',
          `第${subplot.startChapter}章 - 第${subplot.endChapter}章`
        ),
        new Paragraph({ text: '' })
      );
    });

    return paragraphs;
  }

  static generateIdeasSection(ideas: any): Paragraph[] {
    const paragraphs = [new Paragraph({ text: '创意想法', heading: HeadingLevel.HEADING_1 })];

    ideas.ideas.forEach((idea: any) => {
      paragraphs.push(
        new Paragraph({ text: idea.title, heading: HeadingLevel.HEADING_2 }),
        this.createBoldParagraph('类型', this.translate('ideaType', idea.type)),
        this.createBoldParagraph('内容', idea.content),
        this.createBoldParagraph('状态', this.translate('ideaStatus', idea.status)),
        new Paragraph({ text: '' })
      );
    });

    return paragraphs;
  }

  // Helper methods
  private static createBoldParagraph(label: string, content: string): Paragraph {
    return new Paragraph({
      children: [new TextRun({ text: `${label}: `, bold: true }), new TextRun(content)],
    });
  }

  private static translate(type: string, key: string): string {
    const translations = {
      role: { protagonist: '主角', antagonist: '反派', supporting: '配角', minor: '次要角色' },
      importance: { critical: '关键', important: '重要', minor: '次要' },
      chapterStatus: {
        planned: '计划中',
        writing: '写作中',
        completed: '已完成',
        revision: '修订中',
      },
      subplotPurpose: {
        background: '背景补充',
        contrast: '对比衬托',
        suspense: '悬念制造',
        'character-development': '角色发展',
        'comic-relief': '喜剧调节',
      },
      subplotStatus: {
        planned: '计划中',
        active: '进行中',
        resolved: '已解决',
        abandoned: '已放弃',
      },
      ideaType: {
        inspiration: '灵感',
        'plot-extension': '情节延伸',
        'alternative-ending': '替代结局',
        'scene-idea': '场景想法',
        'character-twist': '角色转折',
        dialogue: '对话',
      },
      ideaStatus: {
        draft: '草稿',
        considering: '考虑中',
        adopted: '已采用',
        rejected: '已拒绝',
        archived: '已归档',
      },
    };
    return translations[type]?.[key] || key;
  }
}
