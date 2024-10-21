import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageState {
    pages: Array<Record<string, any>>;
}

const initialState: PageState = {
    pages: [],
};

const pageSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        addNewPage: (state, action: PayloadAction<Record<string, any>>) => {
            state.pages.push(action.payload);
        },
    },
});

export const { addNewPage } = pageSlice.actions;
export default pageSlice.reducer;
