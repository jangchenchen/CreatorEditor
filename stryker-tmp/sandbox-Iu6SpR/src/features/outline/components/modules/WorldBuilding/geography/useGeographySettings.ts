/**
 * Geography Settings Hook
 * Manages all state and logic for geography settings
 */
// @ts-nocheck


import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOutline } from '../../../../outlineSlice';
import { Region } from '../../../../types/outline.types';

export interface GeographySettingsState {
  // Climate
  climate: string;
  setClimate: (climate: string) => void;

  // Landmarks
  landmarks: string[];
  setLandmarks: (landmarks: string[]) => void;
  newLandmark: string;
  setNewLandmark: (landmark: string) => void;

  // Natural Features
  naturalFeatures: string[];
  setNaturalFeatures: (features: string[]) => void;
  newFeature: string;
  setNewFeature: (feature: string) => void;

  // Region Dialog
  editingRegion: Region | null;
  dialogOpen: boolean;
  formData: Partial<Region>;
  setFormData: (data: Partial<Region>) => void;

  // Actions
  handleOpenRegionDialog: (region?: Region) => void;
  handleCloseDialog: () => void;
  handleSaveRegion: () => void;
  handleDeleteRegion: (regionId: string) => void;
  handleFormChange: (field: keyof Region) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleConnectedRegionsChange: (event: any, newValue: string[]) => void;
  handleAddItem: (type: 'landmark' | 'feature') => void;
  handleRemoveItem: (type: 'landmark' | 'feature', index: number) => void;
}

export const useGeographySettings = (): GeographySettingsState => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const geography = outline.world.geography;

  // State
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Region>>({});

  // Geography basic info
  const [climate, setClimate] = useState(geography.climate);
  const [landmarks, setLandmarks] = useState<string[]>(geography.landmarks);
  const [naturalFeatures, setNaturalFeatures] = useState<string[]>(geography.naturalFeatures);
  const [newLandmark, setNewLandmark] = useState('');
  const [newFeature, setNewFeature] = useState('');

  // Region dialog handlers
  const handleOpenRegionDialog = (region?: Region) => {
    setEditingRegion(region || null);
    setFormData(
      region
        ? { ...region }
        : {
            name: '',
            description: '',
            significance: '',
            connectedRegions: [],
          }
    );
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingRegion(null);
    setFormData({});
  };

  const handleSaveRegion = () => {
    const regionData: Region = {
      id: editingRegion?.id || `region-${Date.now()}`,
      name: formData.name || '',
      description: formData.description || '',
      significance: formData.significance || '',
      connectedRegions: formData.connectedRegions || [],
    };

    const updatedRegions = [...geography.regions];

    if (editingRegion) {
      const index = updatedRegions.findIndex(r => r.id === editingRegion.id);
      if (index !== -1) {
        updatedRegions[index] = regionData;
      }
    } else {
      updatedRegions.push(regionData);
    }

    // TODO: 使用 dispatch 更新 Redux state
    console.log('更新地区:', regionData);
    handleCloseDialog();
  };

  const handleDeleteRegion = (regionId: string) => {
    if (window.confirm('确定要删除这个地区吗？')) {
      // TODO: 使用 dispatch 更新 Redux state
      console.log('删除地区:', regionId);
    }
  };

  const handleFormChange =
    (field: keyof Region) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleConnectedRegionsChange = (event: any, newValue: string[]) => {
    setFormData(prev => ({
      ...prev,
      connectedRegions: newValue,
    }));
  };

  // Item management handlers
  const handleAddItem = (type: 'landmark' | 'feature') => {
    if (type === 'landmark' && newLandmark.trim()) {
      setLandmarks([...landmarks, newLandmark.trim()]);
      setNewLandmark('');
    } else if (type === 'feature' && newFeature.trim()) {
      setNaturalFeatures([...naturalFeatures, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveItem = (type: 'landmark' | 'feature', index: number) => {
    if (type === 'landmark') {
      setLandmarks(landmarks.filter((_, i) => i !== index));
    } else {
      setNaturalFeatures(naturalFeatures.filter((_, i) => i !== index));
    }
  };

  return {
    // Climate state
    climate,
    setClimate,

    // Landmarks state
    landmarks,
    setLandmarks,
    newLandmark,
    setNewLandmark,

    // Natural features state
    naturalFeatures,
    setNaturalFeatures,
    newFeature,
    setNewFeature,

    // Dialog state
    editingRegion,
    dialogOpen,
    formData,
    setFormData,

    // Action handlers
    handleOpenRegionDialog,
    handleCloseDialog,
    handleSaveRegion,
    handleDeleteRegion,
    handleFormChange,
    handleConnectedRegionsChange,
    handleAddItem,
    handleRemoveItem,
  };
};
