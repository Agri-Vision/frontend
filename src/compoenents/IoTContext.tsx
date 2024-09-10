import React, { createContext, useState, useContext, ReactNode } from 'react';

// Create the context
interface IoTContextProps {
  iotEnabled: boolean;
  toggleIoT: () => void;
}

const IoTContext = createContext<IoTContextProps | undefined>(undefined);

// Create the provider component
export const IoTProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [iotEnabled, setIotEnabled] = useState<boolean>(false);

  const toggleIoT = () => {
    setIotEnabled(prev => !prev); // Toggle IoT device visibility
  };

  return (
    <IoTContext.Provider value={{ iotEnabled, toggleIoT }}>
      {children}
    </IoTContext.Provider>
  );
};

// Custom hook to use the IoT context
export const useIoTContext = () => {
  const context = useContext(IoTContext);
  if (!context) {
    throw new Error('useIoTContext must be used within an IoTProvider');
  }
  return context;
};
