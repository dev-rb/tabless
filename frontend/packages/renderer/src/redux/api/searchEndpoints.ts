import { ISearchResult } from "/@/types";
import { api } from ".";

// Send text to backend and receive search results

export const searchApi = api.injectEndpoints({
    endpoints: (build) => ({
        processText: build.mutation<ISearchResult[], string>({
            query: (text) => ({
                url: '/search/process',
                method: 'POST',
                body: { text: text }
            })
        })
    }),
    overrideExisting: false
});

export const {
    useProcessTextMutation
} = searchApi;