import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TodoCards from "./TodoCards.tsx";

import useAppState from "./AppState.ts";
import SortByForTodo from "./Helpers/SortByForTodo.tsx";
import {useState} from "react";
import FilterForTodo from "./Helpers/FilterForTodo.tsx";
import {Stack} from "@mui/material";

import dayjs from 'dayjs';
import {startOfMonth} from 'date-fns';
import {endOfMonth} from 'date-fns/endOfMonth';

const ListToDoCards = () => {

    const date = new Date(); // or any Date object
    const firstDay = startOfMonth(date);
    const lastDay = endOfMonth(date);

    const [sortBy, setSortBy] = useState('description');
    const [sortAsc, setSortAsc] = useState(true);

    const [filterByDescription, setFilterByDescription] = useState('');
    const [filterByPosition, setFilterByPosition] = useState('');
    const [filterByCompleted, setFilterByCompleted] = useState('all');
    const [filterByDueDateRangeStart, setFilterByDueDateRangeStart] = useState<dayjs.Dayjs | null>(dayjs(firstDay));
    const [filterByDueDateRangeEnd, setFilterByDueDateRangeEnd] = useState<dayjs.Dayjs | null>(dayjs(lastDay));

    const navigate = useNavigate();

    const todoData = useAppState((state) => state.todoData);

    return (
        <div className={"list-cards"}>
            <Stack>

                <h1>Todo's</h1>

                <Stack direction={"column"} spacing={1}>
                    <h2>Options</h2>
                    <Stack direction={{xs: "column", sm: "row"}} spacing={2}>

                        <SortByForTodo
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            sortAsc={sortAsc}
                            setSortAsc={setSortAsc}/>

                        <FilterForTodo
                            filterByDescription={filterByDescription}
                            setFilterByDescription={setFilterByDescription}
                            filterByPosition={filterByPosition}
                            setFilterByPosition={setFilterByPosition}
                            filterByCompleted={filterByCompleted}
                            setFilterByCompleted={setFilterByCompleted}
                            filterByDueDateRangeStart={filterByDueDateRangeStart}
                            setFilterByDueDateRangeStart={setFilterByDueDateRangeStart}
                            filterByDueDateRangeEnd={filterByDueDateRangeEnd}
                            setFilterByDueDateRangeEnd={setFilterByDueDateRangeEnd}
                        />

                    </Stack>

                </Stack>

                <Button style={{backgroundColor:"green",
                                color:"white",
                                width:"150px",
                                padding:"5px",
                                margin:"5px",
                                textTransform:"none"
                }}
                        variant="outlined"
                        onClick={() => {
                            navigate("/addTodo")
                        }}>Add Todo
                </Button>

                <div>

                    <TodoCards sortBy={sortBy}
                               sortAsc={sortAsc}
                               filterByDescription={filterByDescription}
                               filterByPosition={filterByPosition}
                               filterByCompleted={filterByCompleted}
                               filterByDueDateRangeStart={filterByDueDateRangeStart}
                               filterByDueDateRangeEnd={filterByDueDateRangeEnd}
                               todoData={todoData}/>

                </div>

            </Stack>
        </div>
    )

}

export default ListToDoCards
