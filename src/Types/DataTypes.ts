import dayjs from "dayjs";
import type {CSSProperties, ReactNode} from "react";

export interface ToDoDataType
{
    recno: number;
    description:string;
    position:string;
    completed:boolean;
    dueDate:string;
}

export interface AppStateType {
    count: number;
    inc: () => void;
    dec: () => void;
    todoData: ToDoDataType[];
    removeTodo: (recno: number) => boolean;
    completedTodo: (recno: number) => boolean;
    addTodo: (item: ToDoDataType) => void;
    _isHydrated: boolean;
    setHasHydrated: (val: boolean) => void;
}

export interface MyAccordionPropsType {
    id: string;
    title: string;
    style: CSSProperties & {
        width: number;
        bgHeaderColor: string;
        bgBodyColor: string;
    };
    children: ReactNode;
}

export interface TodoCardsPropsType {
    sortBy: string;
    sortAsc: boolean;
    filterByDescription: string;
    filterByPosition: string;
    filterByCompleted: string;
    filterByDueDateRangeStart: dayjs.Dayjs | null;
    filterByDueDateRangeEnd: dayjs.Dayjs | null;
    todoData: ToDoDataType[];
}

export interface FilterByForTodoPropsType {
    filterByDescription: string;
    setFilterByDescription: (value: string) => void;
    filterByPosition: string;
    setFilterByPosition: (value: string) => void;
    filterByCompleted: string;
    setFilterByCompleted: (value: string) => void;
    filterByDueDateRangeStart: dayjs.Dayjs | null;
    setFilterByDueDateRangeStart: (value: dayjs.Dayjs | null) => void;
    filterByDueDateRangeEnd: dayjs.Dayjs | null;
    setFilterByDueDateRangeEnd: (value: dayjs.Dayjs | null) => void;
}

export interface SortByForTodoPropsType {
    sortBy: string;
    setSortBy: (value: string) => void;
    sortAsc: boolean;
    setSortAsc: (value: boolean) => void;
}
