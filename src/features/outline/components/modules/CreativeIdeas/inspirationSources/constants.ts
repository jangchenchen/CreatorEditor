import {
  Book as BookIcon,
  Movie as MovieIcon,
  MusicNote as MusicIcon,
  Image as ImageIcon,
  Public as WebIcon,
  Person as PersonIcon
} from '@mui/icons-material';

export const inspirationCategories = [
  {
    title: '文学作品',
    examples: ['经典小说', '诗歌作品', '戏剧剧本', '散文集', '传记文学'],
    icon: BookIcon,
    color: 'primary' as const
  },
  {
    title: '影视娱乐',
    examples: ['电影作品', '电视剧', '纪录片', '动画片', '短视频'],
    icon: MovieIcon,
    color: 'secondary' as const
  },
  {
    title: '音乐艺术',
    examples: ['音乐作品', '歌词内容', '音乐剧', '演唱会', '音乐故事'],
    icon: MusicIcon,
    color: 'success' as const
  },
  {
    title: '视觉艺术',
    examples: ['绘画作品', '摄影作品', '雕塑艺术', '建筑设计', '平面设计'],
    icon: ImageIcon,
    color: 'warning' as const
  },
  {
    title: '网络资源',
    examples: ['网络文章', '社交媒体', '在线论坛', '博客内容', '新闻报道'],
    icon: WebIcon,
    color: 'info' as const
  },
  {
    title: '人际交流',
    examples: ['朋友对话', '专家访谈', '读者反馈', '创作交流', '生活观察'],
    icon: PersonIcon,
    color: 'error' as const
  }
];

export const brainstormingTechniques = [
  '自由联想：不限制思维，写下所有想到的内容',
  '问题驱动：针对特定问题进行深入思考',
  '角色视角：从不同角色的角度思考情节',
  '场景想象：详细描绘特定场景的各种可能',
  '关键词扩展：从核心关键词发散思维',
  '时间线分析：沿着时间线思考事件发展',
  '对比分析：比较不同选择的结果',
  '情感深挖：深入探索角色的情感变化'
];