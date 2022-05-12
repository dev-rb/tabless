import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { authReducer } from "./slices/authSlice";
import { historyReducer } from "./slices/historySlice";

const rootReducer = combineReducers({
    auth: authReducer,
    history: historyReducer,
    [api.reducerPath]: api.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})
export type IRootState = ReturnType<typeof rootReducer>;
