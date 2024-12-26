import { initModel } from '@/libs/rmbgModel/initModel'
import { AutoModel, AutoProcessor, env } from '@huggingface/transformers'

jest.mock('@huggingface/transformers')

describe('initModel', () => {
    it('should load model and processor once', async () => {
        expect.assertions(2)

        initModel()
        await initModel()
        await initModel()

        expect(AutoModel.from_pretrained).toHaveBeenCalledOnce()

        expect(AutoProcessor.from_pretrained).toHaveBeenCalledOnce()
    })

    it('should return model and processor', async () => {
        expect.assertions(1)

        const { model, processor } = await initModel()

        expect({ model, processor }).toMatchInlineSnapshot(`
            {
              "model": "Model {name: briaai/RMBG-1.4}",
              "processor": "Processor {name: briaai/RMBG-1.4}",
            }
        `)
    })

    it('should use the right config', async () => {
        expect.assertions(1)

        expect(env).toMatchInlineSnapshot(`
            {
              "allowLocalModels": false,
              "backends": {
                "onnx": {
                  "wasm": {
                    "proxy": true,
                  },
                },
              },
            }
        `)
    })
})
