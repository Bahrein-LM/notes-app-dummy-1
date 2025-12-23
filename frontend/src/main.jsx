import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from "react-hot-toast"

// -> to implement the auto navigation without refreshing pages
// you need to call "BrowserRouter" function from 'react-router'
// -> Next lesson: now implements some toaster features from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* put the "BrowserRouter" tag inside "StrictMode" tag then put "App" tag inside "BrowserRouter" tag */}
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)
