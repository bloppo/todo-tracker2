
import {format} from "date-fns/format";

import type {TodoDataType} from "./Types/TodoDataType.ts";

interface TodoCardsProps {
    todoData: TodoDataType[];
}

const TodoCards  = ({todoData}: TodoCardsProps) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, "LLLL dd ( EEE ) yyyy");
    };

    return (
    <div className={"todo-cards"}>
        {todoData.map(item => (
            <div key={item.recno} className={"todo-card"}>
                <b>{item.description}</b>
                <div>Status: {item.completed ? "Done" : "Pending"}</div>
                <div>Due: {formatDate(item.dueDate)}</div>
            </div>
        ))}
    </div>
)};

export default TodoCards;
