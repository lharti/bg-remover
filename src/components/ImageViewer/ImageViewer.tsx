import { DownloadButton } from '@/components/ui/DownloadButton'
import { ImageDiff } from '@/components/ui/ImageDiff'
import { cn } from '@/utils/cn'
import { IconLoader2 } from '@tabler/icons-react'
import React from 'react'

export interface ImageViewerProps {
    original: string
    processed?: string
    name: string
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
    original,
    processed,
    name,
}) => {
    if (!processed) {
        return (
            <div className="flex justify-center">
                <ImagePlaceholder
                    url={original}
                    className="mt-14"
                    maxHeight="60vh"
                />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <DownloadButton
                url={processed}
                name={`${name}-no-bg.png`}
                className="mb-4"
            />

            <ImageDiff before={original} after={processed} maxHeight="60vh" />
        </div>
    )
}

interface ImagePlaceholderProps {
    url: string
    className?: string
    maxHeight: string
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
    url,
    className,
    maxHeight,
}) => {
    return (
        <div className={cn('relative overflow-hidden rounded-2xl', className)}>
            <img
                src={url}
                alt="Image placeholder"
                // eslint-disable-next-line tailwindcss/no-custom-classname
                className={`
                  max-h-[${maxHeight}]

                  animate-shift-filters
                `}
            />
            <div
                className={`
                  absolute inset-0 flex items-center justify-center bg-black/20
                `}
            >
                <IconLoader2 className="size-20 animate-spin text-white" />
            </div>
        </div>
    )
}
