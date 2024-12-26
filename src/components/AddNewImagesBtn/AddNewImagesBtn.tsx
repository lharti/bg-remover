import { generateImagesItemsFromFiles } from '@/libs/generateImageItemsFromFiles'
import { ImageItem } from '@/types/imageItem'
import { cn } from '@/utils/cn'
import { IconPlus } from '@tabler/icons-react'
import React from 'react'
import { useFilePicker } from 'use-file-picker'

export interface AddNewImagesBtnProps {
    onAdd: (images: ImageItem[]) => void

    className?: string
}

export const AddNewImagesBtn: React.FC<AddNewImagesBtnProps> = ({
    onAdd,
    className,
}) => {
    const { openFilePicker } = useFilePicker({
        multiple: true,

        accept: ['image/jpeg', 'image/png', 'image/bmp', 'image/webp'],

        onFilesSelected(data) {
            const imagesItems = generateImagesItemsFromFiles(data.plainFiles)

            onAdd(imagesItems)
        },
    })

    return (
        <button
            role="button"
            aria-label="Add new images"
            className={cn(
                `
                  flex size-20 items-center justify-center rounded-lg
                  bg-blue-100 transition-color text-blue-500 duration-300
                  ease-in-out

                  active:bg-blue-300

                  hover:bg-blue-200
                `,
                className,
            )}
            onClick={() => openFilePicker()}
        >
            <IconPlus className="size-8" />
        </button>
    )
}
