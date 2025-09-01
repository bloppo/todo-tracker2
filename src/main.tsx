import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter} from 'react-router'
import './index.css'
import MyRoutes from "./MyRoutes.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline/>
        <BrowserRouter>
            <MyRoutes/>
        </BrowserRouter>
    </StrictMode>
)
