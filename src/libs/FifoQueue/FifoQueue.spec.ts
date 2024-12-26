import { FifoQueue } from '@/libs/FifoQueue'
import { wait } from '@/utils/wait'

describe('FifoQueue', () => {
    afterEach(() => {
        FifoQueue._unsafeKill()
    })

    it('should create a singleton instance of FifoQueue', () => {
        expect.assertions(1)

        const queue1 = FifoQueue.create()
        const queue2 = FifoQueue.create()

        expect(queue1).toStrictEqual(queue2)
    })

    it('should process messages in FIFO order', async () => {
        expect.assertions(1)

        jest.useFakeTimers()

        const processedMessages: number[] = []

        const messageHandler = async (message: number) => {
            await wait(50)

            processedMessages.push(message)

            return true
        }

        const queue = FifoQueue.create<number[]>()

        queue.setMessageHandler(messageHandler)

        queue.addMessages([1, 2, 3, 4, 5, 6])

        await jest.runAllTimersAsync()

        expect(processedMessages).toMatchInlineSnapshot(`
            [
              1,
              2,
              3,
              4,
              5,
              6,
            ]
        `)
    })

    it('should process next patches of messages after previous messages are done', async () => {
        expect.assertions(1)

        jest.useFakeTimers()

        const processedMessages: string[] = []

        const messageHandler = async (message: string) => {
            await wait(50)

            processedMessages.push(message)

            return true
        }

        const queue = FifoQueue.create<string[]>()

        queue.setMessageHandler(messageHandler)

        queue.addMessages(['1.1', '1.2'])
        queue.addMessages(['2.1', '2.2'])
        queue.addMessages(['3.1', '3.2'])

        await jest.runAllTimersAsync()

        expect(processedMessages).toMatchInlineSnapshot(`
            [
              "1.1",
              "1.2",
              "2.1",
              "2.2",
              "3.1",
              "3.2",
            ]
        `)
    })

    it('should not allow adding messages without setting message handler', () => {
        expect.assertions(1)

        const queue = FifoQueue.create()

        const addMessagesWithoutHandler = () => {
            queue.addMessages([1, 2, 3])
        }

        expect(addMessagesWithoutHandler).toThrowErrorMatchingInlineSnapshot(
            `"Message handler not set"`,
        )
    })

    it('should handle empty queue gracefully', async () => {
        expect.assertions(1)

        jest.useFakeTimers()

        const queue = FifoQueue.create()

        await jest.runAllTimersAsync()

        expect(queue).toMatchInlineSnapshot(`
            FifoQueue {
              "isProcessing": false,
              "messageHandler": null,
              "messages": [],
            }
        `)
    })
})
