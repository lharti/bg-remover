import { FifoQueue } from '@/libs/FifoQueue'
import { removeBg } from '@/libs/rmbgModel'
import { ImageItem, ImageItemStatus } from '@/types/imageItem'
import { useCallback, useEffect, useMemo } from 'react'

type useRemoveBgQueueParams = {
    onItemProcessed?: (processedItems: ImageItem) => void
}

export const useRemoveBgQueue = ({
    onItemProcessed,
}: useRemoveBgQueueParams = {}) => {
    const queue = useMemo(() => FifoQueue.create<ImageItem[]>(), [])

    // setting queue message handler start
    const queueMessageHandler = useCallback(
        async (item: ImageItem) => {
            const { result: maskedImageFile } = await removeBg(item.original)

            if (!maskedImageFile) return false

            const processedItem = {
                ...item,
                status: ImageItemStatus.PROCESSED,
                processed: URL.createObjectURL(maskedImageFile),
            }

            onItemProcessed?.(processedItem)

            return true
        },

        [onItemProcessed],
    )

    useEffect(() => {
        queue.setMessageHandler(queueMessageHandler)
    }, [queue, queueMessageHandler])
    // setting queue message handler end

    const addToQueue = (items: ImageItem[]) => {
        queue.addMessages(items)
    }

    return {
        addToQueue,
    }
}
