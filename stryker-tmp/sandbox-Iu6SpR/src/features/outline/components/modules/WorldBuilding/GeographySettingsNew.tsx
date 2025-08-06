/**
 * Geography Settings Component
 * Main component for managing world geography settings
 */
// @ts-nocheck


import React from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { useGeographySettings } from './hooks/useGeographySettings';
import { ClimateSettings } from './components/ClimateSettings';
import { LandmarksManager } from './components/LandmarksManager';
import { NaturalFeaturesManager } from './components/NaturalFeaturesManager';
import { RegionsManager } from './components/RegionsManager';
import { RegionDialog } from './components/RegionDialog';

export const GeographySettings: React.FC = () => {
  const {
    // State
    climate,
    landmarks,
    naturalFeatures,
    regions,
    dialogOpen,
    editingRegion,
    formData,
    newLandmark,
    newFeature,

    // Actions
    setClimate,
    setNewLandmark,
    setNewFeature,
    handleOpenRegionDialog,
    handleCloseDialog,
    handleSaveRegion,
    handleDeleteRegion,
    handleFormChange,
    handleConnectedRegionsChange,
    handleAddItem,
    handleRemoveItem,
  } = useGeographySettings();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant='h6' gutterBottom>
        地理环境设定
      </Typography>
      <Typography variant='body2' color='text.secondary' paragraph>
        构建故事世界的地理背景，包括气候条件、重要地标和自然特征。
      </Typography>

      <Grid container spacing={3}>
        {/* 气候设定 */}
        <Grid item xs={12}>
          <ClimateSettings climate={climate} onChange={setClimate} />
        </Grid>

        {/* 重要地标 */}
        <Grid item xs={12} md={6}>
          <LandmarksManager
            landmarks={landmarks}
            newLandmark={newLandmark}
            onNewLandmarkChange={setNewLandmark}
            onAddLandmark={() => handleAddItem('landmark')}
            onRemoveLandmark={index => handleRemoveItem('landmark', index)}
          />
        </Grid>

        {/* 自然特征 */}
        <Grid item xs={12} md={6}>
          <NaturalFeaturesManager
            naturalFeatures={naturalFeatures}
            newFeature={newFeature}
            onNewFeatureChange={setNewFeature}
            onAddFeature={() => handleAddItem('feature')}
            onRemoveFeature={index => handleRemoveItem('feature', index)}
          />
        </Grid>

        {/* 地区管理 */}
        <Grid item xs={12}>
          <RegionsManager
            regions={regions}
            onAddRegion={() => handleOpenRegionDialog()}
            onEditRegion={handleOpenRegionDialog}
            onDeleteRegion={handleDeleteRegion}
          />
        </Grid>
      </Grid>

      {/* 地区编辑对话框 */}
      <RegionDialog
        open={dialogOpen}
        editingRegion={editingRegion}
        formData={formData}
        availableRegions={regions.map(r => r.name)}
        onClose={handleCloseDialog}
        onSave={handleSaveRegion}
        onFormChange={handleFormChange}
        onConnectedRegionsChange={handleConnectedRegionsChange}
      />

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant='caption' color='text.secondary'>
          💡
          提示：地理设定应该与故事情节密切相关，避免过度复杂。重点关注对角色行动和情节发展有影响的地理要素。
        </Typography>
      </Box>
    </Box>
  );
};
