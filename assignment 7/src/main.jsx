import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Candidate from './Candidate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Candidate />
  </StrictMode>,
)
