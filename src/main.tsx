import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'
import App from './App.tsx'
import About from './About.tsx'
import What from './What.tsx'

import {BrowserRouter, Route, Routes} from 'react-router'
import AddItem from './AddItem.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/about" element={<About />}/>
                <Route path="/what" element={<What />}/>
                <Route path="/addItem" element={<AddItem />}/>
                <Route path="*" element={<h1>404</h1>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
