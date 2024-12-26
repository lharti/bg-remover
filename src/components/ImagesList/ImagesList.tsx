'use client'

import { ImageItem, ImageItemStatus } from '@/types/imageItem'
import { cn } from '@/utils/cn'
import { IconLoader2 } from '@tabler/icons-react'
import React from 'react'

export interface ImagesListProps {
    list: ImageItem[]
    selectedItemId?: string
    onItemSelect: (item: ImageItem) => void

    renderAddNewItemBtn?: () => React.ReactNode

    className?: string
}

export const ImagesList: React.FC<ImagesListProps> = ({
    list,
    className,
    onItemSelect,
    selectedItemId,

    renderAddNewItemBtn,
}) => {
    return (
        <div
            className={cn(
                `
                  grid grid-cols-3 place-content-start place-items-center gap-4
                  px-4

                  md:grid-cols-8

                  sm:grid-cols-6

                  xs:grid-cols-4
                `,

                className,
            )}
        >
            {renderAddNewItemBtn && renderAddNewItemBtn()}

            {list.map(item => (
                <button
                    key={item.id}
                    role="button"
                    aria-label="Select image"
                    className={`
                      relative size-20 overflow-hidden rounded-lg border-2

                      ${
                          item.id === selectedItemId
                              ? '!border-blue-500'
                              : `border-gray-200`
                      }

                      hover:opacity-80
                    `}
                    onClick={() => onItemSelect(item)}
                >
                    <img
                        src={item.original}
                        alt={item.name}
                        className={`aspect-square size-full object-cover`}
                    />

                    {item.status === ImageItemStatus.PENDING && (
                        <div
                            className={`
                              absolute inset-0 flex items-center justify-center
                              bg-black/50
                            `}
                        >
                            <IconLoader2
                                className={`size-8 animate-spin text-white/50`}
                            />
                        </div>
                    )}
                </button>
            ))}
        </div>
    )
}
