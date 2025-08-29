
import {format} from "date-fns/format";
import {parseISO} from "date-fns";

import type {TodoDataType} from "./Types/TodoDataType.ts";
import useAppState from "./AppState.ts";

interface TodoCardsProps {
    todoData: TodoDataType[];
}

const TodoCards  = ({todoData}: TodoCardsProps) => {

    const formatDate = (dateString: string) => {
        const fdate = parseISO(dateString);
        return format(fdate,"MM dd yy")
    };

    const removeTodo = useAppState((state) => state.removeTodo);

    const removeTodoLocal = (recno: number) => {
        return () => {
            console.log(`Remove record ${recno}`)
            removeTodo(recno);};
    }

    return (
    <div className={"todo-cards"}>
        {todoData.map(item => (
            <div key={item.recno} className={"todo-card"}>
                <b>{item.description}</b>
                <div>Position: {item.position}</div>
                <div>Status: {item.completed ? "Done" : "Pending"}</div>
                <div>Due: {formatDate(item.dueDate)}</div>
                <button onClick={removeTodoLocal(item.recno)}>Delete</button>
            </div>
        ))}
    </div>
)};

export default TodoCards;
