import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'
import App from './App.tsx'
import About from './About.tsx'
import ListToDoCards from './ListToDoCards.tsx'

import {BrowserRouter, Route, Routes} from 'react-router'
import AddTodo from './AddTodo.tsx';
import Home from './Home.tsx';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<Home />}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/ListCards" element={<ListToDoCards/>}/>
                    <Route path="/addTodo" element={<AddTodo/>}/>
                    <Route path="*" element={<h1>404</h1>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
