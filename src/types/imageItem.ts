export enum ImageItemStatus {
    PENDING = 'pending',
    PROCESSED = 'processed',
}

export interface ImageItem extends Record<string, unknown> {
    id: string
    status: ImageItemStatus
    name: string
    original: string
    processed?: string
}
