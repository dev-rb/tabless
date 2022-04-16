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

declare global {
    interface Window {
        openFile: any,
        windowControls: any
    }
}