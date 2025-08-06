import { useDispatch, useSelector } from 'react-redux';
import { selectSynopsis, updateSynopsis } from '../../../outlineSlice';

export const useSynopsisEditor = () => {
  const dispatch = useDispatch();
  const synopsis = useSelector(selectSynopsis);

  const handleFieldChange =
    (field: keyof typeof synopsis) => (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateSynopsis({
          [field]: event.target.value,
        })
      );
    };

  // 计算完成度
  const completionFields = [
    synopsis.beginning,
    synopsis.development,
    synopsis.climax,
    synopsis.ending,
    synopsis.overallTone,
  ];
  const completedFields = completionFields.filter(field => field.trim().length > 0).length;
  const completionRate = Math.round((completedFields / completionFields.length) * 100);

  const getStageDescription = (stage: string) => {
    const descriptions = {
      beginning: '故事的开端，介绍主要角色、设定背景，提出核心问题或冲突',
      development: '情节的推进，角色关系发展，冲突逐渐升级，推动故事向前',
      climax: '故事的转折点，最激烈的冲突爆发，角色面临关键选择',
      ending: '故事的结局，冲突的解决，角色的成长和故事的收尾',
    };
    return descriptions[stage as keyof typeof descriptions] || '';
  };

  return {
    synopsis,
    handleFieldChange,
    completionRate,
    getStageDescription,
  };
};
