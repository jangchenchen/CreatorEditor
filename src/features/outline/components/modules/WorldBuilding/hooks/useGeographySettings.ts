/**
 * Hook for managing geography settings state and operations
 */

import { useState } from 'react';
import { Region } from '../../../../types/outline.types';

// Mock geography data - should be replaced with Redux state
const mockGeography = {
  climate: '温带大陆性气候，四季分明，夏季炎热多雨，冬季寒冷干燥',
  landmarks: ['龙脊山脉', '翡翠湖', '迷雾森林', '古城遗迹'],
  naturalFeatures: ['丰富的矿产资源', '多条河流贯穿全境', '肥沃的河谷平原'],
  regions: [
    {
      id: 'region-1',
      name: '龙脊山脉',
      description: '横贯东西的巨大山脉，蕴藏着丰富的矿产和古老的秘密',
      significance: '战略要地，资源丰富',
      connectedRegions: ['翡翠湖'],
    },
    {
      id: 'region-2',
      name: '翡翠湖',
      description: '高山湖泊，湖水清澈见底，传说中有神龙居住',
      significance: '水源地，神秘之地',
      connectedRegions: ['龙脊山脉', '迷雾森林'],
    },
  ] as Region[],
};

export interface UseGeographySettingsReturn {
  // State
  climate: string;
  landmarks: string[];
  naturalFeatures: string[];
  regions: Region[];
  dialogOpen: boolean;
  editingRegion: Region | null;
  formData: Partial<Region>;
  newLandmark: string;
  newFeature: string;

  // Actions
  setClimate: (value: string) => void;
  setNewLandmark: (value: string) => void;
  setNewFeature: (value: string) => void;
  handleOpenRegionDialog: (region?: Region) => void;
  handleCloseDialog: () => void;
  handleSaveRegion: () => void;
  handleDeleteRegion: (regionId: string) => void;
  handleFormChange: (field: keyof Region) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleConnectedRegionsChange: (event: any, newValue: string[]) => void;
  handleAddItem: (type: 'landmark' | 'feature') => void;
  handleRemoveItem: (type: 'landmark' | 'feature', index: number) => void;
}

export const useGeographySettings = (): UseGeographySettingsReturn => {
  const [climate, setClimate] = useState(mockGeography.climate);
  const [landmarks, setLandmarks] = useState<string[]>(mockGeography.landmarks);
  const [naturalFeatures, setNaturalFeatures] = useState<string[]>(mockGeography.naturalFeatures);
  const [regions, setRegions] = useState<Region[]>(mockGeography.regions);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [formData, setFormData] = useState<Partial<Region>>({});
  const [newLandmark, setNewLandmark] = useState('');
  const [newFeature, setNewFeature] = useState('');

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

    const updatedRegions = [...regions];

    if (editingRegion) {
      const index = updatedRegions.findIndex(r => r.id === editingRegion.id);
      if (index !== -1) {
        updatedRegions[index] = regionData;
      }
    } else {
      updatedRegions.push(regionData);
    }

    setRegions(updatedRegions);
    console.log('更新地区:', regionData);
    handleCloseDialog();
  };

  const handleDeleteRegion = (regionId: string) => {
    if (window.confirm('确定要删除这个地区吗？')) {
      const updatedRegions = regions.filter(r => r.id !== regionId);
      setRegions(updatedRegions);
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
    climate,
    landmarks,
    naturalFeatures,
    regions,
    dialogOpen,
    editingRegion,
    formData,
    newLandmark,
    newFeature,
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
  };
};
