import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { IRootState } from "../store";

export interface SettingsState {
    isPDFViewerOpen: boolean
}

const initState: SettingsState = {
    isPDFViewerOpen: false,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initState,
    reducers: {
        togglePdfViewer: (state: SettingsState) => {
            state.isPDFViewerOpen = !state.isPDFViewerOpen;
        }
    }
});

export const {
    togglePdfViewer
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;