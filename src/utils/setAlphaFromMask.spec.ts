import { setAlphaFromMask } from '@/utils/setAlphaFromMask'

describe('setAlphaFromMask', () => {
    it('should set the alpha channel of an image based on the provided mask data', () => {
        expect.assertions(1)

        const imageData: ImageData = {
            data: new Uint8ClampedArray(4 * 10).fill(255),
            colorSpace: 'srgb',
            height: 140,
            width: 120,
        }

        const maskData = new Uint8ClampedArray([
            0, 0, 128, 30, 200, 20, 20, 128, 255, 0,
        ])

        const returnValue = setAlphaFromMask(imageData, maskData)

        expect(returnValue).toMatchInlineSnapshot(`
            {
              "colorSpace": "srgb",
              "data": Uint8ClampedArray [
                255,
                255,
                255,
                0,
                255,
                255,
                255,
                0,
                255,
                255,
                255,
                128,
                255,
                255,
                255,
                30,
                255,
                255,
                255,
                200,
                255,
                255,
                255,
                20,
                255,
                255,
                255,
                20,
                255,
                255,
                255,
                128,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                0,
              ],
              "height": 140,
              "width": 120,
            }
        `)
    })
})
