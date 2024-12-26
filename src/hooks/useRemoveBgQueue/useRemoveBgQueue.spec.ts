import { useRemoveBgQueue } from '@/hooks/useRemoveBgQueue'
import { FifoQueue } from '@/libs/FifoQueue'
import { removeBg } from '@/libs/rmbgModel'
import { ImageItemStatus } from '@/types/imageItem'
import { renderHook } from '@testing-library/react'

// mock model lib
jest.mock('@/libs/rmbgModel')

const removeBgMock = jest.mocked(removeBg).mockResolvedValue({
    result: new File([], 'processed.png', {
        type: 'image/png',
    }),
})

// mock FifoQueue lib
jest.mock('@/libs/FifoQueue', () => ({
    FifoQueue: {
        create: jest.fn().mockReturnValue({
            setMessageHandler: jest.fn(),
            addMessages: jest.fn(),
        }),
    },
}))

const FifoQueueMock = jest.mocked(FifoQueue)

// mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(
    (file: File) => `blob:http://test/${file.name}`,
)

describe('useRemoveBgQueue', () => {
    it('should call onItemProcessed with processed Item', async () => {
        expect.assertions(1)

        const onItemProcessed = jest.fn()

        renderHook(() =>
            useRemoveBgQueue({
                onItemProcessed,
            }),
        )

        // trigger queue message handler start
        const setMessageHandlerMock =
            FifoQueueMock.create.mock.results[0].value.setMessageHandler

        const queueMessageHandler = setMessageHandlerMock.mock.calls[0][0]

        const message = {
            id: 'UUID',
            name: 'cat',
            original: 'blob:http://test/cat.jpeg',
            status: 'pending',
        }

        await queueMessageHandler(message)
        // trigger queue message handler end

        const processedMessage = {
            ...message,
            status: 'processed',
            processed: 'blob:http://test/processed.png',
        }

        expect(onItemProcessed).toHaveBeenCalledExactlyOnceWith(
            processedMessage,
        )
    })

    it('should not call onItemProcessed if removeBg fails', async () => {
        expect.assertions(1)

        const onItemProcessed = jest.fn()

        renderHook(() =>
            useRemoveBgQueue({
                onItemProcessed,
            }),
        )

        // trigger queue message handler start
        const setMessageHandlerMock =
            FifoQueueMock.create.mock.results[0].value.setMessageHandler

        const queueMessageHandler = setMessageHandlerMock.mock.calls[0][0]

        removeBgMock.mockResolvedValueOnce({
            result: undefined,
        })

        await queueMessageHandler({})
        // trigger queue message handler end

        expect(onItemProcessed).not.toHaveBeenCalled()
    })

    describe('addToQueue', () => {
        it('should add items to queue', () => {
            expect.assertions(1)

            const { result } = renderHook(() => useRemoveBgQueue())

            const items = [
                {
                    id: 'UUID',
                    name: 'cat',
                    original: 'blob:http://test/cat.jpeg',
                    status: ImageItemStatus.PENDING,
                },
            ]

            result.current.addToQueue(items)

            const addMessagesMock =
                FifoQueueMock.create.mock.results[0].value.addMessages

            expect(addMessagesMock).toHaveBeenCalledExactlyOnceWith(items)
        })
    })
})
