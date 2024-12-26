import { Unthrowable } from '@/types/unthrowable'
import { rawImageToCanvas } from '@/utils/canvas/rawImageToCanvas'
import { setAlphaFromMask } from '@/utils/setAlphaFromMask'
import { RawImage } from '@huggingface/transformers'

export const applyMask = (
    image: RawImage,
    mask: RawImage,
): Unthrowable<HTMLCanvasElement, Error> => {
    const { result: canvas } = rawImageToCanvas(image)

    if (!canvas) {
        return { error: new Error('Failed to create canvas') }
    }

    const renderingContext = canvas.getContext('2d')

    if (!renderingContext) {
        return { error: new Error('Failed to get canvas context') }
    }

    const imageData = renderingContext.getImageData(
        0,
        0,

        canvas.width,
        canvas.height,
    )

    const maskedImageData = setAlphaFromMask(imageData, mask.data)

    renderingContext.putImageData(maskedImageData, 0, 0)

    return { result: canvas }
}
