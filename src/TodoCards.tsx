
import {format} from "date-fns/format";

import type {TodoDataType} from "./Types/TodoDataType.ts";
import * as React from "react";

interface TodoCardsProps {
    todoData: TodoDataType[];
}

const TodoCards : React.FC<TodoCardsProps> = ({todoData}) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, "LLLL dd ( EEE ) yyyy");
    };

    return (
    <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"
    }}>
        {todoData.map(item => (
            <div key={item.recno} style={{
                background: "var(--panel-color)",
                boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "16px",
                minWidth: "220px"
            }}>
                <b>{item.description}</b>
                <div>Status: {item.completed ? "Done" : "Pending"}</div>
                <div>Due: {formatDate(item.dueDate)}</div>
            </div>
        ))}
    </div>
)};

export default TodoCards;
