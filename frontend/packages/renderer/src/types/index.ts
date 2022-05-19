export interface IDocument {
    id: string,
    title: string,
    author: string,
    favorite: boolean,
    createdAt: string,
    tags: ITextDocumentTag[],
    pdfs: [],
    folders: IFolder[],
    text?: string
}

export interface ITextDocument {
    id: string,
    title: string,
    author: string,
    dateCreated: string,
    tags: ITextDocumentTag[],
    text?: string
}

export interface ITextDocumentTag {
    id: string,
    title: string
}

export interface IFolder {
    id: string,
    name: string,
    favorite: boolean,
    documents: ITextDocument[]
}

export interface ISearchResult {
    title: string,
    description: string,
    url: string,
    favicons: {
        high_res: string,
        low_res: string
    }
}

export interface IPdf {
    id: string,
    name: string,
    location: string,
    initialPage?: number
}

export interface IUser {
    email: string,
    name?: string
}

declare global {
    interface Window {
        openUrl: any,
        openWindow: any,
        windowControls: any
    }
}