import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { authReducer } from "./slices/authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    [api.reducerPath]: api.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})
export type IRootState = ReturnType<typeof rootReducer>;
