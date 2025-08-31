import {NavLink, Outlet} from "react-router";
import Header from "./Header.tsx";

function App() {

    return (
        <div className={"container"}>

            <Header/>

            <div className={"main"}>
                <div className={"sidebar"}>
                    <br/>
                    <nav>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/ListCards">List Todo's</NavLink>
                        <NavLink to="/addTodo">Add Todo</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </nav>
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
