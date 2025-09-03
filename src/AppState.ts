import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer'

import type {ToDoDataType, AppStateType} from "./Types/DataTypes.ts";

import todoData from "./assets/tododata.ts";
import {format, getDaysInMonth} from 'date-fns';

todoData.forEach((item: ToDoDataType) => {
    const dt = new Date()
    const m = dt.getMonth();
    const y = dt.getFullYear();
    const numDays = getDaysInMonth(dt) - 1;
    const day = Math.random() * numDays + 1
    const date = new Date(y, m, day);
    item.dueDate = format(date, "yyyy-MM-dd");
})


const useAppState = create<AppStateType>()(
    persist(immer((set, get) => ({
            count: 7,
            inc: () => set((state) => ({count: state.count + 1})),
            dec: () => set((state) => ({count: state.count - 1})),

            isAuthenticated: false,

            setIsAuthenticated: (val) => set({isAuthenticated: val}),

            todoData: todoData,

            removeTodo: (recno: number) => {
                const currentData = get().todoData;
                const index = currentData.findIndex(item => item.recno === recno);
                if (index !== -1) {
                    const newData = [...currentData];
                    newData.splice(index, 1);
                    set({todoData: newData});
                    return true;
                }
                return false
            },

            completedTodo: (recno: number) => {
                const currentData = get().todoData;
                const index = currentData.findIndex(item => item.recno === recno);
                if (index !== -1) {
                    const newData = [...currentData];
                    const completed = newData[index].completed;
                    newData[index] = {...newData[index], completed: !completed};
                    set({todoData: newData});
                    return true;
                }
                return false

            },

            addTodo: (item: ToDoDataType) => {
                console.log(get().count)
                item.recno = get().count;
                console.log(item);
                const currentData = get().todoData;
                const newData = [...currentData, item];
                set(state => ({
                    todoData: newData,
                    count: state.count + 1
                }));
            },

            _isHydrated: false,
            setHasHydrated: (val) => set({_isHydrated: val}),

        })), {
            skipHydration: false,
            name: 'app-state',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: (state) => {
                return () => state.setHasHydrated(true);
            }
        }
    )
);

export default useAppState;