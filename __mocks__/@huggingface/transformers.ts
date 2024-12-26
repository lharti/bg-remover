export const env = {
    allowLocalModels: false,
    backends: {
        onnx: {
            wasm: {
                proxy: false,
            },
        },
    },
}

export class AutoModel {
    static from_pretrained = jest.fn((modelName: string) => {
        return Promise.resolve(`Model {name: ${modelName}}`)
    })
}

export class AutoProcessor {
    static from_pretrained = jest.fn((modelName: string) => {
        return `Processor {name: ${modelName}}`
    })
}

export class RawImage {
    static fromTensor = jest.fn()

    static fromURL = jest.fn()
}
