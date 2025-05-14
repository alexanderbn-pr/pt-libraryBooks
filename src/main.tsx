import './style/theme.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import App from './App.tsx';
import Footer from './components/footer/footer.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
      <Footer />
    </StrictMode>
  </QueryClientProvider>,
);
