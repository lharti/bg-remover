import { applyMask } from '@/libs/rmbgModel/applyMask'
import { rawImageToCanvas } from '@/utils/canvas/rawImageToCanvas'
jest.mock('@/utils/canvas/rawImageToCanvas')

const rawImageToCanvasMock = jest.mocked(rawImageToCanvas)
const canvas = document.createElement('canvas')
canvas.width = 2
canvas.height = 2

rawImageToCanvasMock.mockReturnValue({
    result: canvas,
})

describe('applyMask', () => {
    it('should return masked image canvas', () => {
        expect.assertions(1)

        const image = {
            data: new Uint8ClampedArray(2 * 2 * 4).fill(0),
        }
        const maskMock = {
            data: new Uint8ClampedArray(4).fill(128),
        }

        // @ts-expect-error: testing purposes
        const returnValue = applyMask(image, maskMock)

        expect(returnValue).toMatchInlineSnapshot(`
            {
              "result": <canvas
                height="2"
                width="2"
              />,
            }
        `)
    })

    it('should paint masked image data onto the canvas ', () => {
        expect.assertions(1)

        const image = {
            data: new Uint8ClampedArray(2 * 2 * 4).fill(0),
        }

        const maskMock = {
            data: new Uint8ClampedArray(4).fill(128),
        }

        // @ts-expect-error: i love you ts
        applyMask(image, maskMock)

        const paintedData =
            // @ts-expect-error: don't worry
            canvas.getContext('2d')?.putImageData.mock.calls[0][0]

        expect(paintedData).toMatchInlineSnapshot(`
            ImageData {
              "_data": Uint8ClampedArray [
                0,
                0,
                0,
                128,
                0,
                0,
                0,
                128,
                0,
                0,
                0,
                128,
                0,
                0,
                0,
                128,
              ],
              "_height": 2,
              "_width": 2,
            }
        `)
    })

    it('should convert raw image to canvas', () => {
        expect.assertions(1)

        const image = { data: [] }
        const maskMock = image

        // @ts-expect-error: testing purposes
        applyMask(image, maskMock)

        expect(rawImageToCanvasMock).toHaveBeenCalledExactlyOnceWith(image)
    })

    it('should return error if failed to create canvas', () => {
        expect.assertions(1)

        rawImageToCanvasMock.mockReturnValueOnce({
            error: new Error('Failed to create canvas'),
        })

        // @ts-expect-error: testing purposes
        const returnValue = applyMask()

        expect(returnValue).toMatchInlineSnapshot(`
            {
              "error": [Error: Failed to create canvas],
            }
        `)
    })

    it('should return error if failed to get canvas context', () => {
        expect.assertions(1)

        canvas.getContext = jest.fn().mockReturnValueOnce(null)

        // @ts-expect-error: testing purposes
        const returnValue = applyMask()

        expect(returnValue).toMatchInlineSnapshot(`
            {
              "error": [Error: Failed to get canvas context],
            }
        `)
    })
})
