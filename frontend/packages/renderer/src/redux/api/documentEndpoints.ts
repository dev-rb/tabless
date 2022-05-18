import { IDocument, ITextDocument, ITextDocumentTag } from "@/types";
import { api } from ".";

// Create document
// Read document(s)
// Update document
// Delete document


export const documentsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllDocuments: build.query<IDocument[], void>({
            query: () => ({
                url: 'documents',
                method: 'GET'
            }),
            providesTags: (result = [], error, arg) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'TextDocument' as const, id })),
                        { type: 'TextDocument', id: 'LIST' },
                    ]
                    : [{ type: 'TextDocument', id: 'LIST' }]
        }),
        getRecentDocuments: build.query<IDocument, void>({
            query: () => ({
                url: 'documents/recent',
                method: 'GET'
            })
        }),
        getDocument: build.query<IDocument, string>({
            query: (id) => ({
                url: `documents/${id}`,
                method: 'GET'
            })
        }),
        newDocument: build.mutation<IDocument, Pick<ITextDocument, 'author' | 'title'>>({
            query: (doc: ITextDocument) => ({
                url: 'documents/create',
                method: 'POST',
                body: doc,
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: [{ type: 'TextDocument', id: 'LIST' }]
        }),
        updateDocument: build.mutation<void, IDocument>({
            query: (doc: IDocument) => ({
                url: `documents/update/${doc.id}`,
                method: 'PUT',
                body: doc,
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'TextDocument', id }]
        }),
        favoriteDocument: build.mutation<void, string>({
            query: (id: string) => ({
                url: `documents/favorite/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'TextDocument', id }]
        }),
        unFavoriteDocument: build.mutation<void, string>({
            query: (id: string) => ({
                url: `documents/unfavorite/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'TextDocument', id }]
        }),
        deleteDocument: build.mutation<void, string>({
            query: (id: string) => ({
                url: `documents/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'TextDocument', id }]
        })
    }),
    overrideExisting: false
});

export const {
    useGetAllDocumentsQuery,
    useGetDocumentQuery,
    useNewDocumentMutation,
    useUpdateDocumentMutation,
    useFavoriteDocumentMutation,
    useUnFavoriteDocumentMutation,
    useDeleteDocumentMutation
} = documentsApi;