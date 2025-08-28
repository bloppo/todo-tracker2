import {NavLink, Outlet} from "react-router";
import Header from "./Header.tsx";

function App() {

  return (
      <div className = {"container"}>

          <Header />

          <div className = {"main"}>
              <div className = {"sidebar"}>
                  <b>Sidebar</b>
                  <nav>
                      <NavLink to = "/about">About</NavLink>
                      <NavLink to = "/what">What</NavLink>
                      <NavLink to = "/addItem">Add Item</NavLink>
                  </nav>
              </div>
              <div className = {"content"}>
                  <b>Content</b>
                  <Outlet />
              </div>
          </div>

          <div className = {"footer"}>
                  <h1>Footer</h1>
          </div>

      </div>
  )
}

export default App
