// src/store/slices/todoSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoState {
    text: string;
    isFinished: boolean;
}

const initialState: TodoState = {
    text: '',
    isFinished: false,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        updateTodo: (state, action: PayloadAction<{ field: keyof TodoState, value: string | boolean }>) => {
            const { field, value } = action.payload;
        },
        resetTodo: (state) => {
            state.text = '';
            state.isFinished = false;
        }
    }
});

export const { updateTodo, resetTodo } = todoSlice.actions;
export default todoSlice.reducer;
