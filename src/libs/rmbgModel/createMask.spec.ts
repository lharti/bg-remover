import { createMask } from '@/libs/rmbgModel/createMask'
import { initModel } from '@/libs/rmbgModel/initModel'
import { RawImage } from '@huggingface/transformers'

jest.mock('./initModel')
jest.mock('@huggingface/transformers')

const initModelMock = jest.mocked(initModel)

// mock RawImage.fromTensor start
const RawImageMock = jest.mocked(RawImage)

const rawImageResizeMock = jest.fn(() => 'MASK_IMAGE')

RawImageMock.fromTensor.mockReturnValue({
    // @ts-expect-error: it's a mock
    resize: rawImageResizeMock,
})
// mock RawImage.fromTensor end

describe('createMask', () => {
    it('should return mask image', async () => {
        expect.assertions(1)

        const rawImageMock = {
            width: 100,
            height: 100,
        }

        // @ts-expect-error: it's a mock
        const returnValue = await createMask(rawImageMock)

        expect(returnValue).toMatchInlineSnapshot(`
            {
              "result": "MASK_IMAGE",
            }
        `)
    })

    it('should prepare image input for model', async () => {
        expect.assertions(1)

        const rawImageMock = {
            width: 100,
            height: 100,
        }

        // @ts-expect-error: calm down, it's just a mock
        await createMask(rawImageMock)

        const { processor } = await initModelMock.mock.results[0].value

        expect(processor).toHaveBeenCalledExactlyOnceWith(rawImageMock)
    })

    it('should pass pixel values to model', async () => {
        expect.assertions(1)

        // @ts-expect-error: here we go again
        await createMask({})

        const { model } = await initModelMock.mock.results[0].value

        expect(model).toHaveBeenCalledExactlyOnceWith({ input: 'PIXEL_VALUES' })
    })

    it('should create mask image from model output', async () => {
        expect.assertions(2)

        const imageInput = {
            width: 300,
            height: 150,
        }

        // @ts-expect-error: it's a mock
        await createMask(imageInput)

        expect(RawImageMock.fromTensor).toHaveBeenCalledWith('MASK_TENSOR')

        expect(rawImageResizeMock).toHaveBeenCalledWith(
            imageInput.width,
            imageInput.height,
        )
    })

    it('should return error if something goes wrong', async () => {
        expect.assertions(1)

        rawImageResizeMock.mockRejectedValue(
            // @ts-expect-error: it's a mock
            new Error('Something went wrong'),
        )

        const rawImageMock = {
            width: 100,
            height: 100,
        }

        // @ts-expect-error: it's a mock
        const returnValue = await createMask(rawImageMock)

        expect(returnValue).toMatchInlineSnapshot(`
            {
              "error": [Error: Error processing image: Something went wrong],
            }
        `)
    })
})
