import { ITextDocument, ITextDocumentTag } from "@/types";
import { api } from ".";

// Create document
// Read document(s)
// Update document
// Delete document


export const documentsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllDocuments: build.query<ITextDocument[], void>({
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
        getRecentDocuments: build.query<ITextDocument, void>({
            query: () => ({
                url: 'documents/recent',
                method: 'GET'
            })
        }),
        getDocument: build.query<ITextDocument, string>({
            query: (id) => ({
                url: `documents/${id}`,
                method: 'GET'
            })
        }),
        newDocument: build.mutation<void, ITextDocument>({
            query: (doc: ITextDocument) => ({
                url: 'documents/create',
                method: 'POST',
                body: doc,
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: [{ type: 'TextDocument', id: 'LIST' }]
        }),
        updateDocument: build.mutation<void, ITextDocument>({
            query: (doc: ITextDocument) => ({
                url: `documents/update/${doc.id}`,
                method: 'PUT',
                body: doc,
                headers: { 'Content-Type': 'application/json' }
            })
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
    useDeleteDocumentMutation
} = documentsApi;