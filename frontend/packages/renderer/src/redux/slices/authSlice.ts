import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface AuthState {
    user: string | null
}

const initState: AuthState = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        signInUser: (state: AuthState, { payload }: PayloadAction<string>) => {
            state.user = payload;
        },
        signOutLocal: (state: AuthState) => {
            state.user = null;
        }
    }
});

export const {
    signInUser,
    signOutLocal
} = authSlice.actions;

export const authReducer = authSlice.reducer;