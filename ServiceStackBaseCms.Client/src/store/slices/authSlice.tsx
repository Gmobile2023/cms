// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthenticateResponse } from '@/dtos'

interface AuthState {
    username: string
    password: string
    signedIn: boolean
    authData: AuthenticateResponse | null
    loading: boolean
}

const initialState: AuthState = {
    username: '',
    password: '',
    signedIn: false,
    authData: null,
    loading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        resetAuth: (state) => {
            state.username = '';
            state.password = '';
        },
        setSignedIn(state, action: PayloadAction<boolean>) {
            state.signedIn = action.payload
        },
        setAuthData(state, action: PayloadAction<AuthenticateResponse | null>) {
            state.authData = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
    },
})

// Export actions and reducer
export const { setUsername, setPassword, resetAuth, setSignedIn, setAuthData, setLoading } = authSlice.actions
export default authSlice.reducer
