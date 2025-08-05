import React from 'react';
import { Box } from '@mui/material';
import { useOutlineNavigator } from './useOutlineNavigator';
import NavigationToolbar from './NavigationToolbar';
import ProjectOverview from './ProjectOverview';
import ModuleGrid from './ModuleGrid';
import ModuleContent from './ModuleContent';
import InfoDialog from './InfoDialog';

const OutlineNavigatorNew: React.FC = () => {
  const {
    selectedModule,
    infoDialogOpen,
    completionRates,
    stats,
    handleModuleClick,
    handleBackToNavigator,
    setInfoDialogOpen
  } = useOutlineNavigator();

  // 如果选中了模块，显示对应的模块组件
  if (selectedModule) {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <NavigationToolbar 
          selectedModule={selectedModule}
          onBackToNavigator={handleBackToNavigator}
          onInfoOpen={() => setInfoDialogOpen(true)}
        />
        
        <ModuleContent moduleId={selectedModule} />
      </Box>
    );
  }

  // 显示大纲导航主页面
  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 3 }}>
      <NavigationToolbar 
        selectedModule={null}
        onBackToNavigator={handleBackToNavigator}
        onInfoOpen={() => setInfoDialogOpen(true)}
      />

      <ProjectOverview stats={stats} />

      <ModuleGrid 
        completionRates={completionRates}
        onModuleClick={handleModuleClick}
      />

      <InfoDialog 
        open={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
      />
    </Box>
  );
};

export default OutlineNavigatorNew;