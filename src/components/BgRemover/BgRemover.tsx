'use client'

import { DropZone } from '@/components/DropZone'
import { ImagesList } from '@/components/ImagesList'
import { cn } from '@/utils/cn'
import React, { useState } from 'react'

export interface BgRemoverProps {
    className?: string
}

export const BgRemover: React.FC<BgRemoverProps> = ({ className }) => {
    const [files, setFiles] = useState<File[]>([])

    const onDrop = (acceptedFiles: File[]) => {
        setFiles(prevFiles => prevFiles.concat(acceptedFiles))
    }

    return (
        <div className={cn('space-y-10', className)}>
            <DropZone className="mx-auto max-w-xl" onDrop={onDrop} />

            <ImagesList files={files} className="mx-auto" />
        </div>
    )
}
