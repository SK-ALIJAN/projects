import React, { createContext, useContext, useState } from "react";
import { registerGlobalErrorSetter } from "../services/globalErrorService";


interface GlobalErrorState {
    status?: number;
    message?: string;
}

interface ContextType {
    error: GlobalErrorState | null;
    setError: (error: GlobalErrorState | null) => void;
}

const GlobalErrorContext = createContext<ContextType | null>(null);

export const GlobalErrorProvider = ({ children }: { children: React.ReactNode }) => {
    const [error, setError] = useState<GlobalErrorState | null>(null);

    // Register setter globally
    registerGlobalErrorSetter(setError);

    return (
        <GlobalErrorContext.Provider value={{ error, setError }}>
            {children}
        </GlobalErrorContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalError = () => {
    const context = useContext(GlobalErrorContext);
    if (!context) throw new Error("Must be used inside GlobalErrorProvider");
    return context;
};
