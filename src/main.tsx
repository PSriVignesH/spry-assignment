import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { Toaster } from "@/components/ui/sonner"
import ErrorBoundary from './components/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   
      retry: 2,                    
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <App />
          <Toaster position='bottom-right'/>
        </NuqsAdapter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
