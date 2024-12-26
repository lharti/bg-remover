import { Unthrowable } from '@/types/unthrowable'
import { RawImage } from '@huggingface/transformers'

export const rawImageToCanvas = (
    image: RawImage,
): Unthrowable<HTMLCanvasElement, Error> => {
    const canvas = document.createElement('canvas')

    canvas.width = image.width
    canvas.height = image.height

    const renderingCtx = canvas.getContext('2d')

    if (!renderingCtx) {
        return {
            error: new Error('Failed to get canvas context'),
        }
    }

    renderingCtx.drawImage(image.toCanvas(), 0, 0)

    return {
        result: canvas,
    }
}
