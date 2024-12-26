import { ImageItem, ImageItemStatus } from '@/types/imageItem'

export const generateImageItemFromFile = (file: File): ImageItem => {
    const name = file.name.split('.')[0]

    return {
        id: `${name}-UUID`,
        name,
        status: ImageItemStatus.PENDING,
        original: `blob:http://test/${file.name}`,
    }
}
export const generateImagesItemsFromFiles = (files: File[]): ImageItem[] =>
    files.map(file => generateImageItemFromFile(file))
