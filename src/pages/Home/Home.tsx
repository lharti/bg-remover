import { DropZone } from '@/components/ui/DropZone'
import { generateImagesItemsFromFiles } from '@/libs/generateImageItemsFromFiles'
import { ImageItem } from '@/types/imageItem'
import React from 'react'
import { ImagesSamples } from './Home.ImagesSamples'

export interface HomePageProps {
    onImagesSelect: (files: ImageItem[]) => void
}

export const HomePage: React.FC<HomePageProps> = ({ onImagesSelect }) => {
    const onFilesUpload = (files: File[]) => {
        const imageItems = generateImagesItemsFromFiles(files)

        onImagesSelect(imageItems)
    }

    const onSampleClick = async (url: string) => {
        const response = await fetch(url)
        const blob = await response.blob()

        const file = new File([blob], 'sample.jpg', {
            type: 'image/jpeg',
        })

        onFilesUpload([file])
    }

    return (
        <div
            className={`
              mx-auto mt-16 flex max-w-2xl flex-col items-center justify-center
              space-y-12 px-4
            `}
        >
            <header className="text-center">
                <h1 className="text-4xl font-bold">AI Background Remover</h1>

                <p className="mt-4 text-lg">
                    Upload your images and remove backgrounds automatically
                </p>
            </header>

            <DropZone className="w-full py-10" onDrop={onFilesUpload} />

            <ImagesSamples onSampleClick={onSampleClick} />
        </div>
    )
}
