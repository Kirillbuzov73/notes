export interface Note {
    noteId: string;
    title?: string;
    text?: string;
    tags?: Tag[];
}

export interface Tag {
    tagId: string;
    tagName: string;
}

