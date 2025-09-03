import {describe, it, expect, beforeEach} from 'vitest';
import useAppState from '../src/AppState';
import type {ToDoDataType} from '../src/Types/DataTypes';

// Helper to reset state between tests
const resetState = () => {
    useAppState.setState({
        isAuthenticated: false,
        count: 7,
        todoData: useAppState.getInitialState().todoData,
    });
};

describe('AppState store', () => {
    beforeEach(() => {
        resetState();
    });

    it('should have initial count and todoData', () => {
        const state = useAppState.getState();
        expect(state.count).toBe(7);
        expect(Array.isArray(state.todoData)).toBe(true);
        expect(state.todoData.length).toBeGreaterThan(0);
    });

    it('should increment and decrement count', () => {
        useAppState.getState().inc();
        expect(useAppState.getState().count).toBe(8);
        useAppState.getState().dec();
        expect(useAppState.getState().count).toBe(7);
    });

    it('should set isAuthenticated', () => {
        useAppState.getState().setIsAuthenticated(true);
        expect(useAppState.getState().isAuthenticated).toBe(true);
        useAppState.getState().setIsAuthenticated(false);
        expect(useAppState.getState().isAuthenticated).toBe(false);
    });

    it('should add a todo', () => {
        const todo: ToDoDataType = {
            recno: 0,
            title: 'Test',
            description: 'Test desc',
            dueDate: '2025-09-01',
            completed: false,
            priority: 1,
        };
        useAppState.getState().addTodo(todo);
        const state = useAppState.getState();
        expect(state.todoData.some(t => t.title === 'Test')).toBe(true);
    });

    it('should remove a todo', () => {
        const recno = useAppState.getState().todoData[0].recno;
        const result = useAppState.getState().removeTodo(recno);
        expect(result).toBe(true);
        expect(useAppState.getState().todoData.some(t => t.recno === recno)).toBe(false);
    });

    it('should toggle completedTodo', () => {
        const recno = useAppState.getState().todoData[0].recno;
        const initial = useAppState.getState().todoData[0].completed;
        useAppState.getState().completedTodo(recno);
        expect(useAppState.getState().todoData[0].completed).toBe(!initial);
    });
});

