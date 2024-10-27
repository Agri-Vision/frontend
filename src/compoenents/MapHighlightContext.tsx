import React, { createContext, useContext, useState } from 'react';

interface MapHighlightContextProps {
  highlightedBlock: string | null;
  highlightBlock: (blockId: string) => void;
}

const MapHighlightContext = createContext<MapHighlightContextProps | undefined>(undefined);

export const MapHighlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highlightedBlock, setHighlightedBlock] = useState<string | null>(null);

  const highlightBlock = (blockId: string) => {
    console.log("Setting highlighted block ID to mapcontext:", blockId);
    setHighlightedBlock(blockId);
  };

  return (
    <MapHighlightContext.Provider value={{ highlightedBlock, highlightBlock }}>
      {children}
    </MapHighlightContext.Provider>
  );
};

export const useMapHighlightContext = () => {
  const context = useContext(MapHighlightContext);
  if (!context) throw new Error('useMapHighlightContext must be used within a MapHighlightProvider');
  return context;
};
