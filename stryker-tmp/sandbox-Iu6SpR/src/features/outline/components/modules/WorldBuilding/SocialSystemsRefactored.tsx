/**
 * Social Systems Component (Refactored)
 * Main component that orchestrates all social system components
 */
// @ts-nocheck


import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSocialSystemsState } from '../../../hooks/useSocialSystemsState';
import {
  PoliticalSystem,
  EconomicSystem,
  CulturalSystem,
  ReligiousSystem,
  TechnologySystem,
  SocialClassSystem,
  SocialSystemsTips,
} from './systems';

const SocialSystemsRefactored: React.FC = () => {
  const { state, handlers } = useSocialSystemsState();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant='h6' gutterBottom>
        社会体系设定
      </Typography>
      <Typography variant='body2' color='text.secondary' paragraph>
        定义故事世界的社会结构、政治制度、经济体系和文化特征。
      </Typography>

      {/* 政治制度 */}
      <PoliticalSystem
        value={state.political}
        onChange={handlers.setPolitical}
        defaultExpanded={true}
      />

      {/* 经济体系 */}
      <EconomicSystem value={state.economic} onChange={handlers.setEconomic} />

      {/* 文化传统 */}
      <CulturalSystem
        elements={state.cultural}
        newElement={state.newCulturalElement}
        onElementsChange={handlers.setCultural}
        onNewElementChange={handlers.setNewCulturalElement}
        onAddElement={handlers.handleAddCulturalElement}
        onRemoveElement={handlers.handleRemoveCulturalElement}
      />

      {/* 宗教信仰 */}
      <ReligiousSystem value={state.religious} onChange={handlers.setReligious} />

      {/* 科技/魔法水平 */}
      <TechnologySystem value={state.technology} onChange={handlers.setTechnology} />

      {/* 社会阶层 */}
      <SocialClassSystem
        classes={state.socialClasses}
        newClass={state.newSocialClass}
        onClassesChange={handlers.setSocialClasses}
        onNewClassChange={handlers.setNewSocialClass}
        onAddClass={handlers.handleAddSocialClass}
        onRemoveClass={handlers.handleRemoveSocialClass}
      />

      {/* 创作提示 */}
      <SocialSystemsTips />
    </Box>
  );
};

export default SocialSystemsRefactored;
