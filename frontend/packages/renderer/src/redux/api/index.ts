import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRootState } from '../store';

// http://localhost:3002
const BASE_URL = "https://antho-server.herokuapp.com/";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).auth.user;

            if (token) {
                // headers.set('Access-Control-Allow-Origin', '*')
                // headers.set('Access-Control-Allow-Credentials', 'true')
                headers.set('Authorization', `${token}`);
            }
            // console.log(headers.get('Authorization'))
            return headers;
        }
    }),
    tagTypes: ['TextDocument', 'Folder'],
    endpoints: () => ({})
});