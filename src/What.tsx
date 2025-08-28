import {NavLink,useNavigate} from "react-router";
import Button from "@mui/material/Button";
import todoData from "../public/tododata.ts";
import TodoCards from "./TodoCards.tsx";

const What = () => {

    const navigate = useNavigate();

    return (
        <div className = {"what"}>
            <h1>What</h1>
            <NavLink to = "/about">About</NavLink>
            <Button style={{width:150,padding:5,textTransform: "none"}}
                variant="outlined"
            onClick={() => {
                navigate("/about")
            }}>Go to About
            </Button>
            <TodoCards todoData = {todoData}/>
        </div>
    )

}

export default What
