import React, { useState } from 'react';
import MapController from './MapController';
import MapDashboard from './MapDashboard';

const MapParent: React.FC = () => {
  const [mapType, setMapType] = useState<string>('satellite');
  const [iotEnabled, setIotEnabled] = useState<boolean>(false);

  return (
    <div>
      {/* Map Controller for selecting map type and IoT toggle */}
      <MapController setMapType={setMapType} setIotEnabled={setIotEnabled} />

      {/* Map Dashboard where the map and overlay are displayed */}
      <MapDashboard mapType={mapType} iotEnabled={iotEnabled} />
    </div>
  );
};

export default MapParent;
