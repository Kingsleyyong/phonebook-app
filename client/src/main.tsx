import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.sass';
import { StatusContextProvider } from './context/StatusContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StatusContextProvider>
            <App />
        </StatusContextProvider>
    </StrictMode>
);
