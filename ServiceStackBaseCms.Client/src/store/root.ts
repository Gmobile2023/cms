// src/store/root.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import themeConfigSlice from './slices/themeConfigSlice'
import todoSlice from './slices/todoSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    themeConfig: themeConfigSlice,
    todos: todoSlice
});

// Create and configure the Redux store
const store = configureStore({
    reducer: rootReducer,
})

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
