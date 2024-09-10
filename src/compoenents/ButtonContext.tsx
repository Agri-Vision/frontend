import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ButtonContextProps {
  isStressActive: boolean;
  toggleStress: () => void;
  isDiseaseActive: boolean;
  toggleDisease: () => void;
  isYieldActive: boolean;
  toggleYield: () => void;
}

const ButtonContext = createContext<ButtonContextProps | undefined>(undefined);

export const ButtonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isStressActive, setIsStressActive] = useState(false);
  const [isDiseaseActive, setIsDiseaseActive] = useState(false); 
  const [isYieldActive, setIsYieldActive] = useState(false); 

  const toggleStress = () => setIsStressActive((prev) => !prev);
  const toggleDisease = () => setIsDiseaseActive((prev) => !prev); 
  const toggleYield = () => setIsYieldActive((prev) => !prev);

  return (
    <ButtonContext.Provider value={{ isStressActive, toggleStress, isDiseaseActive, toggleDisease, isYieldActive, toggleYield }}>
      {children}
    </ButtonContext.Provider>
  );
};

export const useButtonContext = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error('useButtonContext must be used within a ButtonProvider');
  }
  return context;
};
