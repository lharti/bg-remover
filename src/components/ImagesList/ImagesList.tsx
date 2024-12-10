import { cn } from '@/utils/cn'
import React, { useEffect } from 'react'

export interface ImagesListProps {
    files: File[]
    className?: string
}

import { useState } from 'react'

export const ImagesList: React.FC<ImagesListProps> = ({ files, className }) => {
    const [imagesUrls, setObjectUrls] = useState<string[]>([])

    useEffect(() => {
        const urls = files.map(file => URL.createObjectURL(file))

        setObjectUrls(urls)

        return () => {
            urls.forEach(url => URL.revokeObjectURL(url))
        }
    }, [files])

    return (
        <div
            className={cn(
                `
                  grid grid-cols-2 gap-2

                  lg:grid-cols-6

                  sm:grid-cols-4
                `,
                className,
            )}
        >
            {imagesUrls.map((url, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={url}
                    alt={files[index]?.name}
                    key={`${files[index]?.name}-${index}`}
                    className={`
                      aspect-square size-full rounded-lg object-cover

                      hover:opacity-80
                    `}
                />
            ))}
        </div>
    )
}
