import type { Preview } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { outlineReducer } from '../src/features/outline/slices/rootOutlineSlice';

// 创建Material-UI主题
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// 创建Redux Store用于Stories
const mockStore = configureStore({
  reducer: {
    outline: outlineReducer,
  },
  preloadedState: {
    outline: {
      id: 'storybook-outline',
      project: {
        id: 'storybook-project',
        name: 'Storybook演示项目',
        description: '用于组件展示的项目',
        author: 'Storybook',
        genre: '演示',
        targetWordCount: 50000,
        createdAt: new Date('2024-01-01'),
        lastUpdated: new Date(),
      },
      story: {
        id: 'storybook-story',
        background: {
          era: '现代',
          location: '城市',
          socialEnvironment: '都市',
          historicalContext: '2024年',
        },
        coreTheme: {
          theme: '成长',
          conflict: '内心冲突',
          message: '勇敢面对挑战',
          keywords: ['成长', '勇气', '友谊'],
        },
        synopsis: {
          beginning: '故事开始...',
          development: '情节发展...',
          climax: '故事高潮...',
          ending: '圆满结局...',
          overallTone: '积极向上',
        },
        lastUpdated: new Date(),
      },
      characters: {
        characters: [
          {
            id: 'char-1',
            name: '主角',
            description: '勇敢的主角',
            role: 'protagonist',
            arcType: 'hero',
            motivation: '拯救世界',
            personalityTraits: ['勇敢', '善良'],
            background: '普通人',
            relationships: [],
            characterArc: {
              startingPoint: '普通人',
              endingPoint: '英雄',
              keyMoments: [],
            },
            lastUpdated: new Date(),
          }
        ],
        relationships: [],
      },
      timeline: {
        id: 'storybook-timeline',
        events: [],
        startTime: '2024-01-01',
        endTime: '2024-12-31',
        timelineNotes: '',
      },
      chapters: {
        id: 'storybook-chapters',
        chapters: [],
        totalChapters: 0,
        overallStructure: '',
      },
      world: {
        id: 'storybook-world',
        geography: {
          regions: [],
          climate: '温带',
          landmarks: [],
          naturalFeatures: [],
        },
        society: {
          political: '民主',
          economic: '市场经济',
          cultural: ['多元'],
          religious: '自由信仰',
          technology: '现代',
          socialClasses: ['中产'],
        },
        history: {
          timeline: [],
          legends: [],
          familySecrets: [],
          mysteries: [],
        },
        customRules: [],
        inspirationSources: [],
      },
      subplots: {
        id: 'storybook-subplots',
        subplots: [],
        secondaryStories: [],
        weavingStrategy: '并行发展',
      },
      ideas: {
        id: 'storybook-ideas',
        ideas: [],
        alternatives: [],
        inspirationSources: [],
        brainstormingSessions: [],
      },
      themes: {
        id: 'storybook-themes',
        themes: {
          primary: '成长',
          secondary: [],
          symbols: [],
          metaphors: [],
          motifs: [],
        },
        characterMotivations: [],
        philosophicalQuestions: [],
        socialCommentary: [],
        personalReflections: [],
      },
    },
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      description: {
        component: 'CreationEditor组件库 - 专为小说创作设计的React组件集合',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
  },
  
  // 全局装饰器
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ padding: '16px' }}>
            <Story />
          </div>
        </ThemeProvider>
      </Provider>
    ),
  ],
  
  // 全局参数类型
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '主题模式',
    },
  },
};

export default preview;