import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='bg-[#E7E7E3]'>
      <App />
    </div>
  </StrictMode>,
)
