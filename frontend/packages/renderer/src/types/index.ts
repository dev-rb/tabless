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

declare global {
    interface Window {
        openUrl: any,
        openWindow: any,
        windowControls: any
    }
}