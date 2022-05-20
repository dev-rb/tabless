import { IPdf } from "/@/types";
import { api } from ".";

// Create pdf
// Get all pdfs for document
// Update pdf
// Delete pdf

export const pdfApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllPdfsForDocument: build.query<IPdf[], void>({
            query: () => ({
                url: 'pdfs',
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
        newPdf: build.mutation<void, { documentId: string, pdfInfo: IPdf }>({
            query: ({ documentId, pdfInfo }) => ({
                url: 'pdfs/create',
                method: 'POST',
                body: { 'document': documentId, 'pdf': pdfInfo },
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: [{ type: 'TextDocument', id: 'LIST' }]
        }),
        updatePdf: build.mutation<void, IPdf>({
            query: (newInfo: IPdf) => ({
                url: `pdfs/update`,
                method: 'PUT',
                body: newInfo,
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: [{ type: 'TextDocument', id: 'LIST' }]
        }),
        deletePdf: build.mutation<void, string>({
            query: (id: string) => ({
                url: `pdfs/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'TextDocument', id }]
        })
    }),
    overrideExisting: false
});

export const {
    useDeletePdfMutation,
    useGetAllPdfsForDocumentQuery,
    useNewPdfMutation,
    useUpdatePdfMutation
} = pdfApi;