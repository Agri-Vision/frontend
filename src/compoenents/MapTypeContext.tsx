import React, { createContext, useState, useContext, ReactNode } from 'react';

// Create the context
interface MapTypeContextProps {
  mapType: string;
  setMapType: (type: string) => void;
}

// Add children prop type for the provider
interface MapTypeProviderProps {
  children: ReactNode;
}

const MapTypeContext = createContext<MapTypeContextProps | undefined>(undefined);

// Provider component
export const MapTypeProvider: React.FC<MapTypeProviderProps> = ({ children }) => {
  const [mapType, setMapType] = useState<string>('drone'); // Default mapType is 'drone'

  return (
    <MapTypeContext.Provider value={{ mapType, setMapType }}>
      {children}
    </MapTypeContext.Provider>
  );
};

// Custom hook to use the MapTypeContext
export const useMapTypeContext = () => {
  const context = useContext(MapTypeContext);
  if (!context) {
    throw new Error('useMapTypeContext must be used within a MapTypeProvider');
  }
  return context;
};
