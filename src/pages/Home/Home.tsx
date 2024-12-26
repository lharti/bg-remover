import { DropZone } from '@/components/ui/DropZone'
import { generateImagesItemsFromFiles } from '@/libs/generateImageItemsFromFiles'
import { ImageItem } from '@/types/imageItem'
import React from 'react'

export interface HomePageProps {
    onImagesSelect: (files: ImageItem[]) => void
}

export const HomePage: React.FC<HomePageProps> = ({ onImagesSelect }) => {
    return (
        <div className="px-4">
            <header className="mt-10 text-center">
                <h1 className="text-4xl font-bold">AI Background Remover</h1>
                <p className="mt-4 text-lg">
                    Upload your images and remove backgrounds automatically
                </p>
            </header>

            <DropZone
                className="mx-auto mt-20 max-w-xl"
                onDrop={files => {
                    const imageItems = generateImagesItemsFromFiles(files)

                    onImagesSelect(imageItems)
                }}
            />
        </div>
    )
}
