import {
    AutoModel,
    AutoProcessor,
    env,
    PreTrainedModel,
    Processor,
} from '@huggingface/transformers'

const MODEL_NAME = 'briaai/RMBG-1.4'

env.allowLocalModels = false

if (env.backends?.onnx?.wasm) {
    env.backends.onnx.wasm.proxy = true
}

type InitModelState = {
    modelPromise: Promise<PreTrainedModel> | null
    processorPromise: Promise<Processor> | null
    status: 'idle' | 'loading' | 'success'
}

const initModelState: InitModelState = {
    modelPromise: null,
    processorPromise: null,
    status: 'idle',
}

export const initModel = async () => {
    if (initModelState.status === 'idle') {
        initModelState.status = 'loading'

        const modelPromise = AutoModel.from_pretrained(MODEL_NAME)
        const processorPromise = AutoProcessor.from_pretrained(MODEL_NAME, {})

        initModelState.modelPromise = modelPromise
        initModelState.processorPromise = processorPromise
    }

    const model = await initModelState.modelPromise
    const processor = await initModelState.processorPromise

    initModelState.status = 'success'

    return { model, processor } as {
        model: PreTrainedModel
        processor: Processor
    }
}
