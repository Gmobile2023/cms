import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoleState {
    roles: Array<Record<string, any>>;
    roleclaims: Array<Record<string, any>>;
}

const initialState: RoleState = {
    roles: [],
    roleclaims: [],
};

const roleSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        getRoles: (state, action: PayloadAction<Record<string, any>>) => {
            state.roles.push(action.payload);
        },
    },
});

export const { getRoles } = roleSlice.actions;
export default roleSlice.reducer;
