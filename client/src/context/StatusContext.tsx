import { createContext, useContext, useMemo, useState } from 'react';
import { StatusMapping } from '../types/types';

interface StatusContextType {
    statusObject: StatusMapping;
    setStatusObject: React.Dispatch<React.SetStateAction<StatusMapping>>;
}
const StatusContext = createContext<StatusContextType | null>(null);

const StatusContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [statusObject, setStatusObject] = useState<StatusMapping>({
        success: undefined,
        error: undefined,
        loading: false,
    });

    const value = useMemo(
        () => ({
            statusObject,
            setStatusObject,
        }),
        [statusObject]
    );

    return (
        <StatusContext.Provider value={value}>
            {children}
        </StatusContext.Provider>
    );
};

const useStatusContext = (): StatusContextType => {
    const context = useContext(StatusContext);
    if (!context) {
        throw new Error(
            'useStatusContext must be used within a StatusContextProvider'
        );
    }
    return context;
};

export { StatusContextProvider, useStatusContext };
