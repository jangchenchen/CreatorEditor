import { useState, useMemo } from 'react';
import { Character } from '../../../../types/outline.types';
import { 
  CharacterArcProps, 
  CharacterArcState,
  CharacterProgress,
  CharacterStepData,
  MockCharacterData
} from './types';

// 模拟数据 (从原组件提取)
const mockCharacters: MockCharacterData[] = [
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

export const useCharacterArc = (props: CharacterArcProps = {}) => {
  const { characters = mockCharacters, selectedCharacterId, onCharacterChange } = props;
  
  const [state, setState] = useState<CharacterArcState>({
    selectedCharacter: characters[0] as Character,
    activeStep: 0,
    isEditing: false,
    editingEvent: null,
    eventText: ''
  });

  // 计算进度
  const progress: CharacterProgress = useMemo(() => {
    if (!state.selectedCharacter) {
      return { percentage: 0, currentStep: 0, totalSteps: 0, isCompleted: false };
    }

    const totalSteps = state.selectedCharacter.arc.keyEvents.length + 2; // 起始 + 事件 + 结束
    const currentStep = state.activeStep;
    const percentage = ((currentStep + 1) / totalSteps) * 100;
    const isCompleted = currentStep >= totalSteps;

    return {
      percentage,
      currentStep,
      totalSteps,
      isCompleted
    };
  }, [state.selectedCharacter, state.activeStep]);

  // 生成步骤数据
  const steps: CharacterStepData[] = useMemo(() => {
    if (!state.selectedCharacter) return [];

    const steps: CharacterStepData[] = [
      {
        type: 'start',
        title: '起始状态',
        content: state.selectedCharacter.arc.startState,
        index: 0,
        isCompleted: state.activeStep > 0,
        isActive: state.activeStep === 0
      }
    ];

    state.selectedCharacter.arc.keyEvents.forEach((event, index) => {
      steps.push({
        type: 'event',
        title: `关键事件 ${index + 1}`,
        content: event,
        index: index + 1,
        isCompleted: state.activeStep > index + 1,
        isActive: state.activeStep === index + 1
      });
    });

    steps.push({
      type: 'end',
      title: '最终状态',
      content: state.selectedCharacter.arc.endState,
      index: state.selectedCharacter.arc.keyEvents.length + 1,
      isCompleted: state.activeStep >= state.selectedCharacter.arc.keyEvents.length + 1,
      isActive: state.activeStep === state.selectedCharacter.arc.keyEvents.length + 1
    });

    return steps;
  }, [state.selectedCharacter, state.activeStep]);

  // 处理角色切换
  const handleCharacterChange = (characterId: string) => {
    const character = characters.find(c => c.id === characterId) || null;
    setState(prev => ({
      ...prev,
      selectedCharacter: character as Character,
      activeStep: 0,
      isEditing: false,
      editingEvent: null,
      eventText: ''
    }));
    
    if (onCharacterChange) {
      onCharacterChange(characterId);
    }
  };

  // 处理步骤点击
  const handleStepClick = (step: number) => {
    setState(prev => ({
      ...prev,
      activeStep: step,
      isEditing: false,
      editingEvent: null,
      eventText: ''
    }));
  };

  // 处理上一步
  const handlePrevious = () => {
    setState(prev => ({
      ...prev,
      activeStep: Math.max(0, prev.activeStep - 1)
    }));
  };

  // 处理下一步
  const handleNext = () => {
    if (state.selectedCharacter) {
      const maxStep = state.selectedCharacter.arc.keyEvents.length + 1;
      setState(prev => ({
        ...prev,
        activeStep: Math.min(maxStep, prev.activeStep + 1)
      }));
    }
  };

  // 处理编辑
  const handleEdit = (eventIndex: number) => {
    if (state.selectedCharacter && eventIndex > 0 && eventIndex <= state.selectedCharacter.arc.keyEvents.length) {
      const eventText = state.selectedCharacter.arc.keyEvents[eventIndex - 1];
      setState(prev => ({
        ...prev,
        isEditing: true,
        editingEvent: eventIndex,
        eventText
      }));
    }
  };

  // 处理保存
  const handleSave = () => {
    // TODO: 实现保存逻辑
    setState(prev => ({
      ...prev,
      isEditing: false,
      editingEvent: null,
      eventText: ''
    }));
  };

  // 处理取消
  const handleCancel = () => {
    setState(prev => ({
      ...prev,
      isEditing: false,
      editingEvent: null,
      eventText: ''
    }));
  };

  // 更新事件文本
  const handleEventTextChange = (text: string) => {
    setState(prev => ({
      ...prev,
      eventText: text
    }));
  };

  return {
    state,
    progress,
    steps,
    characters,
    handleCharacterChange,
    handleStepClick,
    handlePrevious,
    handleNext,
    handleEdit,
    handleSave,
    handleCancel,
    handleEventTextChange
  };
};