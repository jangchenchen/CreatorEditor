/**
 * Geography Settings New Component
 * Main container for geography settings with modular architecture
 */
// @ts-nocheck


import React from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { useGeographySettings } from './useGeographySettings';
import ClimateSettings from './ClimateSettings';
import LandmarksManager from './LandmarksManager';
import NaturalFeaturesManager from './NaturalFeaturesManager';
import RegionsManager from './RegionsManager';
import RegionDialog from './RegionDialog';

const GeographySettingsNew: React.FC = () => {
  const {
    // Climate state
    climate,
    setClimate,

    // Landmarks state
    landmarks,
    newLandmark,
    setNewLandmark,

    // Natural features state
    naturalFeatures,
    newFeature,
    setNewFeature,

    // Dialog state
    editingRegion,
    dialogOpen,
    formData,

    // Action handlers
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
          <ClimateSettings climate={climate} onClimateChange={setClimate} />
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
            onOpenRegionDialog={handleOpenRegionDialog}
            onDeleteRegion={handleDeleteRegion}
          />
        </Grid>
      </Grid>

      {/* 地区编辑对话框 */}
      <RegionDialog
        open={dialogOpen}
        editingRegion={editingRegion}
        formData={formData}
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

export default GeographySettingsNew;
