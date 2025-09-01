import {Route, Routes} from "react-router";
import App from "./App.tsx";
import Home from "./Home.tsx";
import Login from "./Login.tsx";
import ProtectedRoute from "./Helpers/ProtectedRoute.tsx";
import About from "./About.tsx";
import ListToDoCards from "./ListToDoCards.tsx";
import AddTodo from "./AddTodo.tsx";

import useAppState from "./AppState.ts";

const MyRoutes = () => {

    const isAuthenticated = useAppState((state) => state.isAuthenticated);

    return (
        <Routes>
            <Route path="/" element={<App/>}>
                <Route index element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/ListCards" element={<ListToDoCards/>}/>
                    <Route path="/addTodo" element={<AddTodo/>}/>
                </Route>
                <Route path="*" element={<h1>404</h1>}/>
            </Route>
        </Routes>
    );
}

export default MyRoutes;
