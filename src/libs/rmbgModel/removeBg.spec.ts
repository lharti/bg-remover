import { removeBg } from '@/libs/rmbgModel'
import { applyMask } from '@/libs/rmbgModel/applyMask'
import { createMask } from '@/libs/rmbgModel/createMask'
import { canvasToBlob } from '@/utils/canvas/canvasToBlob'
import { RawImage } from '@huggingface/transformers'

jest.mock('@huggingface/transformers')
jest.mock('./applyMask')
jest.mock('./createMask')
jest.mock('@/utils/canvas/canvasToBlob')

const RawImageMock = jest.mocked(RawImage)
const createMaskMock = jest.mocked(createMask)
const applyMaskMock = jest.mocked(applyMask)
const canvasToBlobMock = jest.mocked(canvasToBlob)

const imageUrl = 'https://example.com/image.jpg'
const image = { width: 100, height: 100 } as unknown as RawImage

RawImageMock.fromURL.mockResolvedValue(image)

createMaskMock.mockResolvedValue({
    result: image,
})

const canvas = document.createElement('canvas')

applyMaskMock.mockReturnValue({
    result: canvas,
})

canvasToBlobMock.mockResolvedValue({
    result: new Blob(),
})

describe('removeBg', () => {
    it('should return masked image file', async () => {
        expect.assertions(1)

        const returnValue = await removeBg(imageUrl)

        expect(returnValue).toStrictEqual({
            result: new File([new Blob()], 'result.png', {
                type: 'image/png',
            }),
        })
    })

    it('should create RawImage from URL', async () => {
        expect.assertions(1)

        await removeBg(imageUrl)

        expect(RawImage.fromURL).toHaveBeenCalledWith(imageUrl)
    })

    it('should create mask from image', async () => {
        expect.assertions(1)

        await removeBg(imageUrl)

        expect(createMask).toHaveBeenCalledWith(image)
    })

    it('should apply mask to image', async () => {
        expect.assertions(1)

        await removeBg(imageUrl)

        expect(applyMask).toHaveBeenCalledWith(image, image)
    })

    it('should create blob from canvas', async () => {
        expect.assertions(1)

        await removeBg(imageUrl)

        expect(canvasToBlob).toHaveBeenCalledWith(canvas, 'image/png')
    })

    it('should return error when createMask fails', async () => {
        expect.assertions(1)

        createMaskMock.mockResolvedValueOnce({
            error: new Error('failed to create mask'),
        })

        const returnValue = await removeBg(imageUrl)

        expect(returnValue).toMatchInlineSnapshot(`
            {
              "error": [Error: failed to create mask],
            }
        `)
    })

    it('should return error when applyMask fails', async () => {
        expect.assertions(1)

        applyMaskMock.mockReturnValueOnce({
            error: new Error('failed to apply mask'),
        })

        const returnValue = await removeBg(imageUrl)

        expect(returnValue).toMatchInlineSnapshot(`
            {
              "error": [Error: Failed to create masked image canvas],
            }
        `)
    })

    it('should return error when canvasToBlob fails', async () => {
        expect.assertions(1)

        canvasToBlobMock.mockResolvedValueOnce({
            error: new Error('failed to create blob'),
        })

        const returnValue = await removeBg(imageUrl)

        expect(returnValue).toMatchInlineSnapshot(`
            {
              "error": [Error: Failed to create blob from canvas],
            }
        `)
    })
})
