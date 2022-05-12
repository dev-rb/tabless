import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IText {
    position: { start: number, end: number },
    content: string
}

export interface HistoryState {
    texts: Record<string, string | undefined>
}

const initState: HistoryState = {
    texts: {}
}

const historySlice = createSlice({
    name: 'history',
    initialState: initState,
    reducers: {
        addTextToHistory: (state: HistoryState, { payload }: PayloadAction<IText>) => {
            let pos = JSON.stringify(payload.position);
            state.texts = { ...state.texts, [pos]: payload.content };
        },
    }
});

export const {
    addTextToHistory
} = historySlice.actions;

export const historyReducer = historySlice.reducer;