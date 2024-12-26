import { UnthrowablePromise } from '@/types/unthrowable'
import { canvasToBlob } from '@/utils/canvas/canvasToBlob'
import { RawImage } from '@huggingface/transformers'
import { applyMask } from './applyMask'
import { createMask } from './createMask'

export const removeBg = async (
    imageUrl: string,
): UnthrowablePromise<File, Error> => {
    const image = await RawImage.fromURL(imageUrl)

    const { result: mask, error } = await createMask(image)

    if (!mask) {
        return { error }
    }

    const { result: canvas } = applyMask(image, mask)

    if (!canvas) {
        return { error: new Error('Failed to create masked image canvas') }
    }

    const { result: blob } = await canvasToBlob(canvas, 'image/png')

    if (!blob) {
        return { error: new Error('Failed to create blob from canvas') }
    }

    const imageFile = new File([blob], `result.png`, {
        type: 'image/png',
    })

    return {
        result: imageFile,
    }
}
