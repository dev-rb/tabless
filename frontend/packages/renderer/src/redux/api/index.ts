import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRootState } from '../store';

const BASE_URL = "http://localhost:3002";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).auth.user;

            if (token) {
                // headers.set('Access-Control-Allow-Origin', '*')
                headers.set('Access-Control-Allow-Credentials', 'true')
                headers.set('Authorization', `${token}`);
            }
            // console.log(headers.get('Authorization'))
            return headers;
        }
    }),
    tagTypes: ['TextDocument', 'Folder'],
    endpoints: () => ({})
});