import {NavLink,useNavigate} from "react-router";
import Button from "@mui/material/Button";
import TodoCards from "./TodoCards.tsx";

import useAppState from "./AppState.ts";

const What = () => {

    const navigate = useNavigate();

    const todoData = useAppState((state) => state.todoData);

    return (
        <div className = {"what"}>
            <div style={{display:"flex", flexDirection:"column", width:"100%", alignItems:"center"}}>
                <h1>What</h1>
            </div>
            <NavLink to = "/about">About</NavLink>
            <Button style={{backgroundColor:'green',color:'white', width:150,padding:5,textTransform: "none"}}
                variant="outlined"
            onClick={() => {
                navigate("/about")
            }}>Go to About
            </Button>

            <Button style={{backgroundColor:'green',color:'white', width:150,padding:5,textTransform: "none"}}
                    variant="outlined"
                    onClick={() => {
                        navigate("/addItem")
                    }}>Add Todo
            </Button>

            <TodoCards todoData = {todoData}/>
        </div>
    )

}

export default What
