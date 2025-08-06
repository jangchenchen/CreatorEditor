import React from 'react';
import { Box } from '@mui/material';
import { useStructureOverview } from './structure/useStructureOverview';
import StructureStatistics from './structure/StructureStatistics';
import ChapterStatusDistribution from './structure/ChapterStatusDistribution';
import ChapterStructureFlow from './structure/ChapterStructureFlow';
import StructureDescription from './structure/StructureDescription';
import StructureAnalysis from './structure/StructureAnalysis';

const StructureOverviewNew: React.FC = () => {
  const {
    statistics,
    chapters,
    chaptersData,
    handleStructureChange,
    handleSaveStructure,
    getStatusColor,
    getStatusLabel,
  } = useStructureOverview();

  return (
    <Box>
      <StructureStatistics statistics={statistics} />

      <ChapterStatusDistribution statistics={statistics} />

      <ChapterStructureFlow
        chapters={chapters}
        getStatusColor={getStatusColor}
        getStatusLabel={getStatusLabel}
      />

      <StructureDescription
        overallStructure={chaptersData.overallStructure}
        onStructureChange={handleStructureChange}
        onSaveStructure={handleSaveStructure}
      />

      <StructureAnalysis statistics={statistics} />
    </Box>
  );
};

export default StructureOverviewNew;
