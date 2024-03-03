import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx' 
import Play from './pages/Play.tsx'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import './styles/global.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/play" element={<Play />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
