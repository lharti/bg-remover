import { ArrayItemType } from '@/types/utils'

interface Queue<Messages extends unknown[]> {
    addMessages(messages: Messages): void

    setMessageHandler(
        messageHandler: MessageHandler<ArrayItemType<Messages>>,
    ): void
}

type MessageHandler<Message> = (message: Message) => Promise<boolean>

export class FifoQueue<Messages extends unknown[]> implements Queue<Messages> {
    private static instance: FifoQueue<unknown[]> | null = null

    private messages: Messages = [] as unknown[] as Messages

    private isProcessing = false

    private messageHandler: MessageHandler<unknown> | null = null

    private constructor() {}

    /**
     * Creates or returns the singleton instance of the FifoQueue.
     * @template Messages - The type of messages in the queue.
     * @returns The singleton instance of the FifoQueue.
     */
    public static create<Messages extends unknown[]>(): FifoQueue<Messages> {
        if (!FifoQueue.instance) {
            FifoQueue.instance = new FifoQueue<Messages>()
        }

        return FifoQueue.instance as FifoQueue<Messages>
    }

    /**
     * Sets the message handler for processing a message.
     * @param messageHandler - The handler function to process a message.
     * @throws Error if the message handler is already set.
     */
    public setMessageHandler(
        messageHandler: MessageHandler<ArrayItemType<Messages>>,
    ): void {
        this.messageHandler = messageHandler as MessageHandler<unknown>
    }

    /**
     * Adds messages to the queue and starts processing if not already processing.
     * @param newMessages - The messages to add.
     * @throws Error if the message handler is not set.
     */
    public addMessages(newMessages: Messages): void {
        if (!this.messageHandler) {
            throw new Error('Message handler not set')
        }

        this.messages.push(...newMessages)

        this.processNextMessage()
    }

    private async processNextMessage(): Promise<void> {
        if (this.isProcessing || !this.messageHandler) {
            return
        }

        this.isProcessing = true

        const message = this.messages.shift()

        if (message) {
            await this.messageHandler(message)
        }

        this.isProcessing = false

        if (this.messages.length) {
            this.processNextMessage()
        }
    }

    /**
     * Resets the singleton instance of the FifoQueue.
     */
    public static _unsafeKill(): void {
        FifoQueue.instance = null
    }
}
