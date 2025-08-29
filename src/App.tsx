import {NavLink, Outlet} from "react-router";
import Header from "./Header.tsx";

import useAppState from "./AppState.ts";

function App() {

    const count = useAppState((state) => state.count);
    const incCount = useAppState((state) => state.inc);
    const decCount = useAppState((state) => state.dec);

  return (
      <div className = {"container"}>

          <Header />

          <div className = {"main"}>
              <div className = {"sidebar"}>
                  <b>Sidebar</b>
                  <br />
                  <b>Count {count}</b>
                  <input type="button" value={"Inc"} onClick={incCount} />
                  <input type="button" value={"Dec"} onClick={decCount}/>
                  <nav>
                      <NavLink to = "/about">About</NavLink>
                      <NavLink to = "/what">What</NavLink>
                      <NavLink to = "/addItem">Add Item</NavLink>
                  </nav>
              </div>
              <div className = {"content"}>
                  <Outlet />
              </div>
          </div>

          <div className = {"footer"}>
                  <h2>Footer</h2>
          </div>

      </div>
  )
}

export default App
