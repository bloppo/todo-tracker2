import {useNavigate, NavLink, Outlet} from "react-router";
import Header from "./Header.tsx";
import useAppState from "./AppState.ts";

function App() {

    const isAuthenticated = useAppState((state) => state.isAuthenticated);
    const setIsAuthenticated = useAppState((state) => state.setIsAuthenticated);

    const navigate = useNavigate();

    const clearStorage = () => {
        localStorage.removeItem('app-state');
        window.location.reload();
    }

    const logout = () => {
        setIsAuthenticated(false)
        navigate("/login")
    }

    return (
        <div className={"container"}>

            <Header/>

            <div className={"main"}>
                <div className={"sidebar"}>
                    <br/>

                        { isAuthenticated ? <>
                            <nav>
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/ListCards">List Todo's</NavLink>
                                <NavLink to="/addTodo">Add Todo</NavLink>
                                <NavLink to="/about">About</NavLink>
                            </nav>
                            <div>
                                <button onClick={() => logout()} style={{marginTop:"20px"}}>Log Out</button>
                            </div>
                        </> : null}

                    <button onClick={() => clearStorage()} style={{marginTop:"20px"}}>Reset Storage</button>
                    <div style={{fontSize:"8pt", padding:"5px"}}>The list of Todo's is reset to the original list.</div>
                </div>
                <div className={"content"}>
                    <Outlet/>
                </div>
            </div>

            <div className={"footer"}>
                <h2>Footer</h2>
            </div>

        </div>
    )
}

export default App
