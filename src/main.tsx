
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import './index.css';

// Import context providers
import { LanguageProvider } from '@/context/LanguageContext';
import { CreditProvider } from '@/context/CreditContext';
import { ThemeProvider } from '@/context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <CreditProvider>
          <App />
          <Toaster />
          <SonnerToaster />
        </CreditProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
