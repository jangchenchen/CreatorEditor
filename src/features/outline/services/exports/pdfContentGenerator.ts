import { OutlineData } from '../../types/outline.types';
import { TranslationUtils } from './translationUtils';

export class PdfContentGenerator {
  static generateStorySection(data: OutlineData, addHeading: Function, addText: Function): void {
    addHeading('故事概述');
    if (data.story?.background) {
      addText(`背景设定: ${data.story.background.era} - ${data.story.background.location}`);
    }
    if (data.story?.coreTheme) {
      addText(`核心主题: ${data.story.coreTheme.theme}`);
      addText(`主要冲突: ${data.story.coreTheme.conflict}`);
    }
    addText('');

    if (data.story?.synopsis) {
      addHeading('故事梗概', 2);
      addText(`开端: ${data.story.synopsis.beginning}`);
      addText(`发展: ${data.story.synopsis.development}`);
      addText(`高潮: ${data.story.synopsis.climax}`);
      addText(`结局: ${data.story.synopsis.ending}`);
      addText('');
    }
  }

  static generateCharactersSection(
    data: OutlineData,
    addHeading: Function,
    addText: Function
  ): void {
    addHeading('角色设定');
    data.characters.forEach(character => {
      addHeading(character.name, 2);
      addText(`角色: ${TranslationUtils.translateRole(character.role)}`);
      addText(`背景: ${character.background}`);
      addText(`目标: ${character.goals}`);
      addText(`动机: ${character.motivation}`);
      addText('');
    });
  }

  static generateTimelineSection(data: OutlineData, addHeading: Function, addText: Function): void {
    if (data.timeline?.events?.length > 0) {
      addHeading('时间线');
      data.timeline.events.forEach(event => {
        addHeading(event.title, 2);
        addText(`时间: ${event.date}`);
        addText(`描述: ${event.description}`);
        addText('');
      });
    }
  }

  static generateWorldSection(data: OutlineData, addHeading: Function, addText: Function): void {
    addHeading('世界设定');
    if (data.world?.geography) {
      addText(`地理: ${data.world.geography}`);
    }
    if (data.world?.culture) {
      addText(`文化: ${data.world.culture}`);
    }
    addText('');
  }

  static generateChaptersSection(data: OutlineData, addHeading: Function, addText: Function): void {
    addHeading('章节大纲');
    data.chapters.chapters.forEach(chapter => {
      addHeading(`第${chapter.number}章: ${chapter.title}`, 2);
      addText(`概述: ${chapter.summary}`);
      if (chapter.keyScenes?.length > 0) {
        addText('关键场景:');
        chapter.keyScenes.forEach((scene, index) => {
          addText(`  ${index + 1}. ${scene.title}: ${scene.description}`);
        });
      }
      addText('');
    });
  }

  static generateThemesSection(data: OutlineData, addHeading: Function, addText: Function): void {
    addHeading('主题分析');
    if (data.themes?.mainThemes?.length > 0) {
      data.themes.mainThemes.forEach(theme => {
        addHeading(theme.name, 2);
        addText(`描述: ${theme.description}`);
        addText('');
      });
    }
  }

  static generateSubplotsSection(data: OutlineData, addHeading: Function, addText: Function): void {
    addHeading('副线情节');
    data.subplots.subplots.forEach(subplot => {
      addHeading(subplot.title, 2);
      addText(`描述: ${subplot.description}`);
      addText(`目的: ${TranslationUtils.translateSubplotPurpose(subplot.purpose)}`);
      addText(`状态: ${TranslationUtils.translateSubplotStatus(subplot.status)}`);
      addText('');
    });
  }

  static generateIdeasSection(data: OutlineData, addHeading: Function, addText: Function): void {
    addHeading('创意想法');
    if (data.ideas?.ideas?.length > 0) {
      data.ideas.ideas.forEach(idea => {
        addHeading(idea.title, 2);
        addText(`内容: ${idea.content}`);
        addText(`类型: ${TranslationUtils.translateIdeaType(idea.type)}`);
        addText('');
      });
    }
  }
}
