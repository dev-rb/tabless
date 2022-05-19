import { ITextDocument, ITextDocumentTag, IUser } from "@/types";
import { User } from "firebase/auth";
import { api } from ".";

// Sign in User
// Sign up User

interface AuthRequest {
    user: {
        token: string,
        email: string | null,
        name: string | null
    }
}

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation<void, AuthRequest>({
            query: ({ user }) => ({
                url: '/auth/create',
                body: user,
                method: 'POST'
            })
        }),
        getUserInfo: build.query<IUser, void>({
            query: () => ({
                url: '/users',
                method: 'GET'
            })
        })
    }),
    overrideExisting: false
});

export const {
    useCreateUserMutation,
    useGetUserInfoQuery
} = authApi;