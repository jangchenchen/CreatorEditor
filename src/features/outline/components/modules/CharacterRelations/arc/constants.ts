import { MockCharacterData } from './types';

// 模拟数据 (从原组件提取)
export const mockCharacters: MockCharacterData[] = [
  {
    id: '1',
    name: '张三丰',
    role: 'protagonist',
    background: '武当山道士，武学宗师',
    personality: ['睿智', '慈祥', '武艺高强'],
    appearance: '须发皆白，仙风道骨',
    goals: '保护武当，传承武学',
    motivation: '维护武林正道',
    arc: {
      startState: '隐居修道的老道士',
      keyEvents: [
        '收下七名弟子',
        '创立武当派武学',
        '抗击外敌入侵',
        '成为武林盟主',
        '传承太极心法'
      ],
      endState: '德高望重的武学宗师',
      growthDirection: '从隐世高人到武林领袖'
    },
    tags: ['武当', '道教', '宗师']
  },
  {
    id: '2',
    name: '灭绝师太',
    role: 'antagonist',
    background: '峨眉派掌门，性格刚烈',
    personality: ['严厉', '固执', '正义感强'],
    appearance: '面容严肃，不苟言笑',
    goals: '维护峨眉声誉',
    motivation: '对正邪分明的执着',
    arc: {
      startState: '正义但偏激的师太',
      keyEvents: [
        '与其他门派结仇',
        '偏听偏信谣言',
        '做出错误判断',
        '意识到自己的错误',
        '最终和解'
      ],
      endState: '学会宽容的长者',
      growthDirection: '从偏激到宽容'
    },
    tags: ['峨眉', '师太', '正派']
  }
];