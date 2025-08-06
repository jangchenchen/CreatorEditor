// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import { selectTimeline, updateTimelineInfo } from '../../../outlineSlice';

export const useTimelineSettings = () => {
  const dispatch = useDispatch();
  const timeline = useSelector(selectTimeline);

  const handleFieldChange =
    (field: 'startTime' | 'endTime' | 'timelineNotes') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateTimelineInfo({
          [field]: event.target.value,
        })
      );
    };

  const handleSave = () => {
    // TODO: 实现保存到文件功能
    console.log('保存时间线设置');
  };

  const handleReset = () => {
    if (window.confirm('确定要重置时间线设置吗？此操作不可撤销。')) {
      dispatch(
        updateTimelineInfo({
          startTime: '',
          endTime: '',
          timelineNotes: '',
        })
      );
    }
  };

  return {
    timeline,
    handleFieldChange,
    handleSave,
    handleReset,
  };
};
