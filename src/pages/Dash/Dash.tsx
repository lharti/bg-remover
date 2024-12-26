'use client'

import { AddNewImagesBtn } from '@/components/AddNewImagesBtn'
import { ImagesList } from '@/components/ImagesList'
import { ImageViewer } from '@/components/ImageViewer'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { useList } from '@/hooks/useList'
import { useRemoveBgQueue } from '@/hooks/useRemoveBgQueue'
import { ImageItem } from '@/types/imageItem'
import React from 'react'

export interface DashPageProps {
    initialImages?: ImageItem[]

    className?: string
}

const SNAP_POINTS = ['150px', '300px']

export const DashPage: React.FC<DashPageProps> = ({
    initialImages = [],

    className,
}) => {
    const onItemProcessed = (processedItem: ImageItem) =>
        updateListItem(processedItem.id, processedItem)

    const { addToQueue } = useRemoveBgQueue({
        onItemProcessed,
    })

    const {
        list,
        selectedListItem,

        addItemsToList,
        updateListItem,

        setSelectedListItem,
    } = useList({
        initialList: initialImages,

        onNewItems: newItems => {
            if (newItems.length === 0) return

            addToQueue(newItems)
        },
    })

    const addNewImages = (imagesItems: ImageItem[]) => {
        addItemsToList(imagesItems)

        setSelectedListItem(imagesItems[0])
    }

    return (
        <div className={className}>
            {selectedListItem && (
                <ImageViewer
                    name={selectedListItem.name}
                    original={selectedListItem.original}
                    processed={selectedListItem.processed}
                />
            )}

            <BottomSheet snapPoints={SNAP_POINTS}>
                <ImagesList
                    list={list}
                    selectedItemId={selectedListItem?.id}
                    className={`mx-auto h-64 max-w-screen-md overflow-y-auto`}
                    renderAddNewItemBtn={() => (
                        <AddNewImagesBtn onAdd={addNewImages} />
                    )}
                    onItemSelect={setSelectedListItem}
                />
            </BottomSheet>
        </div>
    )
}
