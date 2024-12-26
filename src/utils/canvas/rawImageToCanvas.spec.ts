import { rawImageToCanvas } from '@/utils/canvas/rawImageToCanvas'
import { RawImage } from '@huggingface/transformers'

const rawImageMock = {
    width: 200,
    height: 100,
    toCanvas: () => document.createElement('canvas'),
} as unknown as RawImage

describe('rawImageToCanvas', () => {
    it('should return a canvas element with the correct dimensions', async () => {
        expect.assertions(1)

        const result = rawImageToCanvas(rawImageMock)

        expect(result).toMatchInlineSnapshot(`
            {
              "result": <canvas
                height="100"
                width="200"
              />,
            }
        `)
    })

    it('should draw the image on the canvas', async () => {
        expect.assertions(1)

        const drawImageMock = jest.fn()
        jest.spyOn(document, 'createElement').mockReturnValue({
            getContext: () => ({
                drawImage: drawImageMock,
            }),
        } as unknown as HTMLCanvasElement)

        rawImageMock.toCanvas = () => 'RAW_IMAGE_CANVAS'

        await rawImageToCanvas(rawImageMock)

        expect(drawImageMock).toHaveBeenCalledExactlyOnceWith(
            rawImageMock.toCanvas(),

            0,
            0,
        )
    })

    it('should return an error if the canvas context cannot be obtained', () => {
        expect.assertions(1)

        jest.spyOn(document, 'createElement').mockReturnValue({
            getContext: () => null,
        } as unknown as HTMLCanvasElement)

        const result = rawImageToCanvas(rawImageMock)

        expect(result).toMatchInlineSnapshot(`
            {
              "error": [Error: Failed to get canvas context],
            }
        `)
    })
})
