const modelMock = jest.fn().mockResolvedValue({
    output: [
        {
            mul: () => ({
                to: () => 'MASK_TENSOR',
            }),
        },
    ],
})

const processorMock = jest
    .fn()
    .mockResolvedValue({ pixel_values: 'PIXEL_VALUES' })

export const initModel = jest.fn().mockResolvedValue({
    model: modelMock,
    processor: processorMock,
})
