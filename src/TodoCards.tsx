import {format} from "date-fns/format";
import {parseISO} from "date-fns";

import type {TodoCardsPropsType, ToDoDataType} from "./Types/DataTypes.ts";
import useAppState from "./AppState.ts";

import {useState} from "react";
import DeleteDialog from "./Dialogs/DeleteDialog.tsx";


const TodoCards = (props: TodoCardsPropsType) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRecno, setSelectedRecno] = useState<number | null>(null);
    const [description, setDescription] = useState<string>("");

    const formatDate = (dateString: string) => {
        const fdate = parseISO(dateString);
        return format(fdate, "MM/dd/yy")
    };

    const removeTodo = useAppState((state) => state.removeTodo);
    const completedTodo = useAppState((state) => state.completedTodo);

    const completedTodoLocal = (recno: number) => {
        return () => {
            console.log(`Completed Todo ${recno}`)
            completedTodo(recno);
        };
    }

    const handleDeleteClick = (recno: number, description: string) => () => {
        setSelectedRecno(recno);
        setDescription(description);
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        if (selectedRecno !== null) {
            removeTodo(selectedRecno);
        }
        setOpenDialog(false);
        setSelectedRecno(null);
    };

    const handleCancel = () => {
        setOpenDialog(false);
        setSelectedRecno(null);
    }

    const filterItem = (item : ToDoDataType) => {

        let passed = true;

        if (props.filterByDescription !== "") {
            const re = new RegExp(props.filterByDescription, "i");
            if (!item.description.match(re)) passed &&= false;
        }

        if (props.filterByPosition !== "") {
            const re = new RegExp(props.filterByPosition, "i");
            if (!item.position.match(re)) passed &&= false;
        }

        switch (props.filterByCompleted) {
            case "all":
                passed &&= true;
                break;
            case "completed":
                passed &&= item.completed;
                break;
            case "pending":
                passed &&= !item.completed;
                break;
            default:
                passed &&= true;
        }

        if (props.filterByDueDateRangeStart !== null && props.filterByDueDateRangeEnd !== null) {

            const dueDate = new Date(item.dueDate);
            const startDate = new Date(props.filterByDueDateRangeStart.toDate());
            const endDate = new Date(props.filterByDueDateRangeEnd.toDate());

            passed &&= dueDate >= startDate && dueDate <= endDate;

        } else passed &&= true;

        return passed

    }

    const sortCmp = (a: ToDoDataType, b: ToDoDataType) => {
        let retVal
        switch (props.sortBy) {
            case "description":
                if (props.sortAsc) {
                    retVal = a.description.localeCompare(b.description);
                } else {
                    retVal = b.description.localeCompare(a.description);
                }
                return retVal;
            case "duedate":
                if (props.sortAsc) {
                    retVal = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                } else {
                    retVal = new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
                }
                return retVal
            case "position":
                if (props.sortAsc) {
                    retVal = a.position.localeCompare(b.position);
                } else {
                    retVal = b.position.localeCompare(a.position);
                }
                return retVal
            case "completed":
                if (props.sortAsc) {
                    retVal = Number(a.completed) - Number(b.completed);
                } else {
                    retVal = Number(b.completed) - Number(a.completed);
                }
                return retVal;
            default:
                if (props.sortAsc) {
                    retVal = a.description.localeCompare(b.description);
                } else {
                    retVal = b.description.localeCompare(a.description);
                }
                return retVal;
        }
    }

    const todos = props.todoData.filter(item => filterItem(item));

    return (

        <div className={"todo-cards"}>
            {
                todos.length > 0 ? todos.sort((a, b) => sortCmp(a, b))
                                         .map(item => (
                    <div key={item.recno} className={"todo-card"}>
                        <b>{item.description}</b>
                        <div>Position: {item.position}</div>
                        <div>Status: {item.completed ? "Done" : "Pending"}</div>
                        <div>Due: {formatDate(item.dueDate)}</div>
                        <div className={"button-group"}>
                            <button style={{width: 75}}
                                    onClick={handleDeleteClick(item.recno, item.description)}>Delete
                            </button>
                            <button style={{width: 75}} onClick={completedTodoLocal(item.recno)}>Complete</button>
                        </div>
                    </div>
                ))
                : <div className={"todo-not-found"}>No todo's found</div>
            }
            <DeleteDialog openDialog={openDialog}
                          description={description}
                          handleCancel={handleCancel}
                          handleConfirmDelete={handleConfirmDelete}/>
        </div>
    )
};

export default TodoCards;
