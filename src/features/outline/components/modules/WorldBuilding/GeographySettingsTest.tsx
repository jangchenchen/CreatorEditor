/**
 * Test file for GeographySettings component
 */

import React from 'react';
import { GeographySettings } from './modules/WorldBuilding/GeographySettingsNew';

// Test component
export const GeographySettingsTest: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Geography Settings Test</h1>
      <GeographySettings />
    </div>
  );
};

export default GeographySettingsTest;