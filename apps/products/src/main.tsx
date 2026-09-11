import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createAppStore } from '@shared/components'
import './index.css'
import App from './App.tsx'

// Standalone-only store. This file is never reached when the app is consumed as
// a federated remote — the host's <Provider> supplies the store there. App.tsx
// is the exposed module and deliberately contains no Provider of its own, so
// there is exactly one store in either mode.
const store = createAppStore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
