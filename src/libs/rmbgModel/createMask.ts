import { UnthrowablePromise } from '@/types/unthrowable'
import { RawImage } from '@huggingface/transformers'
import { initModel } from './initModel'

export const createMask = async (
    image: RawImage,
): UnthrowablePromise<RawImage, Error> => {
    try {
        const { model, processor } = await initModel()

        const { pixel_values } = await processor(image)

        const { output } = await model({ input: pixel_values })

        const maskTensor = output[0].mul(255).to('uint8')

        const maskImage = await RawImage.fromTensor(maskTensor).resize(
            image.width,
            image.height,
        )

        return {
            result: maskImage,
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error'

        return {
            error: new Error(`Error processing image: ${errorMessage}`),
        }
    }
}
