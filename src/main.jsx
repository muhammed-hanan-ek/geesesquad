import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './contexts/contextShare.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextShare>
      <StrictMode>
        <App />
      </StrictMode>
    </ContextShare>
  </BrowserRouter>,
)
