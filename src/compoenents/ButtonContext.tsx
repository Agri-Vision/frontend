// src/components/ButtonContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ButtonContextProps {
  isStressActive: boolean;
  toggleStress: () => void;
}

const ButtonContext = createContext<ButtonContextProps | undefined>(undefined);

export const ButtonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isStressActive, setIsStressActive] = useState(false);

  const toggleStress = () => setIsStressActive((prev) => !prev);

  return (
    <ButtonContext.Provider value={{ isStressActive, toggleStress }}>
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
