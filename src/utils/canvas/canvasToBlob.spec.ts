import { canvasToBlob } from '@/utils/canvas/canvasToBlob'

describe('canvasToBlob', () => {
    it('should resolve with a blob when canvas.toBlob succeeds', async () => {
        expect.assertions(1)

        const mockCanvas = document.createElement('canvas')
        const mockBlob = new Blob()

        jest.spyOn(mockCanvas, 'toBlob').mockImplementation(callback => {
            callback(mockBlob)
        })

        const result = await canvasToBlob(mockCanvas, 'image/png')

        expect(result).toMatchInlineSnapshot(`
            {
              "result": Blob {},
            }
        `)
    })

    it('should resolve with an error when canvas.toBlob fails', async () => {
        expect.assertions(1)

        const mockCanvas = document.createElement('canvas')

        jest.spyOn(mockCanvas, 'toBlob').mockImplementation(callback => {
            callback(null)
        })

        const result = await canvasToBlob(mockCanvas, 'image/png')

        expect(result).toMatchInlineSnapshot(`
            {
              "error": [Error: Failed to create blob from canvas],
            }
        `)
    })
})
