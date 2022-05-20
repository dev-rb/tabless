import { IFolder, ITextDocument, ITextDocumentTag } from "/@/types";
import { api } from ".";

// Create folder
// Get all folders
// Get folder and documents
// Add document to folder
// Update folder name
// Delete folder


export const foldersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllFolders: build.query<IFolder[], void>({
            query: () => ({
                url: 'folders',
                method: 'GET'
            }),
            providesTags: (result = [], error, arg) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Folder' as const, id })),
                        { type: 'Folder', id: 'LIST' },
                    ]
                    : [{ type: 'Folder', id: 'LIST' }]
        }),
        getFolder: build.query<IFolder, string>({
            query: (id) => ({
                url: `folders/${id}`,
                method: 'GET'
            })
        }),
        newFolder: build.mutation<void, IFolder>({
            query: (folder: IFolder) => ({
                url: 'folders/create',
                method: 'POST',
                body: folder,
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: [{ type: 'Folder', id: 'LIST' }]
        }),
        updateFolderName: build.mutation<void, { id: string, newName: string }>({
            query: (updateName: { id: string, newName: string }) => ({
                url: `folders/update/${updateName.id}`,
                method: 'PUT',
                body: { newName: updateName.newName },
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: [{ type: 'Folder', id: 'LIST' }]
        }),
        favoriteFolder: build.mutation<void, string>({
            query: (id: string) => ({
                url: `folders/favorite/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Folder', id }]
        }),
        unFavoriteFolder: build.mutation<void, string>({
            query: (id: string) => ({
                url: `folders/unfavorite/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Folder', id }]
        }),
        addDocumentToFolder: build.mutation<void, { id: string, documentId: string }>({
            query: (addDoc: { id: string, documentId: string }) => ({
                url: `folders/update/add/doc`,
                method: 'PUT',
                body: addDoc,
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: [{ type: 'Folder', id: 'LIST' }]
        }),
        deleteFolder: build.mutation<void, string>({
            query: (id: string) => ({
                url: `folders/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Folder', id }]
        })
    }),
    overrideExisting: false
});

export const {
    useGetAllFoldersQuery,
    useGetFolderQuery,
    useNewFolderMutation,
    useUpdateFolderNameMutation,
    useFavoriteFolderMutation,
    useUnFavoriteFolderMutation,
    useAddDocumentToFolderMutation,
    useDeleteFolderMutation,
} = foldersApi;