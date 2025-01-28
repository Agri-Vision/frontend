// VisibilityProvider.tsx
import { createContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface VisibilityContextType {
    isVisible: boolean;
    toggleVisibility: () => void;
    iotEnabled: boolean;
    setIotEnabled: (enabled: boolean) => void;
}

// Create the context with an initial empty value
export const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

// Define the props for the VisibilityProvider
interface VisibilityProviderProps {
    children: ReactNode;
}

export function VisibilityProvider({ children }: VisibilityProviderProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [iotEnabled, setIotEnabled] = useState<boolean>(true); // Initialize iotEnabled state

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <VisibilityContext.Provider value={{ isVisible, toggleVisibility, iotEnabled, setIotEnabled }}>
            {children}
        </VisibilityContext.Provider>
    );
}
