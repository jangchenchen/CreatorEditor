import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectModuleCompletionRates, selectOutlineStats } from '../../outlineSlice';
import { OutlineModule } from '../../types/outline.types';

export interface OutlineNavigatorHook {
  selectedModule: OutlineModule | null;
  infoDialogOpen: boolean;
  completionRates: Record<string, number>;
  stats: any;
  handleModuleClick: (moduleId: OutlineModule) => void;
  handleBackToNavigator: () => void;
  setInfoDialogOpen: (open: boolean) => void;
}

export const useOutlineNavigator = (): OutlineNavigatorHook => {
  const [selectedModule, setSelectedModule] = useState<OutlineModule | null>(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  
  const completionRates = useSelector(selectModuleCompletionRates);
  const stats = useSelector(selectOutlineStats);

  const handleModuleClick = (moduleId: OutlineModule) => {
    setSelectedModule(moduleId);
  };

  const handleBackToNavigator = () => {
    setSelectedModule(null);
  };

  return {
    selectedModule,
    infoDialogOpen,
    completionRates,
    stats,
    handleModuleClick,
    handleBackToNavigator,
    setInfoDialogOpen
  };
};