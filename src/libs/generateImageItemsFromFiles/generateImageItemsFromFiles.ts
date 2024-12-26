import { ImageItem, ImageItemStatus } from '@/types/imageItem'

export const generateImageItemFromFile = (file: File): ImageItem => ({
    id: crypto.randomUUID(),
    status: ImageItemStatus.PENDING,
    name: file.name.split('.')[0],
    original: URL.createObjectURL(file),
})

export const generateImagesItemsFromFiles = (files: File[]): ImageItem[] =>
    files.map(file => generateImageItemFromFile(file))
