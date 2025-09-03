import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import MyRoutes from './MyRoutes';

export function renderAppRoot(rootElement: HTMLElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <CssBaseline/>
            <BrowserRouter>
                <MyRoutes/>
            </BrowserRouter>
        </StrictMode>
    );
}

