import { cn } from '@/utils/cn'
import { IconDownload } from '@tabler/icons-react'
import React from 'react'

export interface DownloadButtonProps {
    url?: string
    name?: string

    className?: string
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
    url,
    name,
    className,
}) => {
    return (
        <a
            href={url}
            download={name}
            target="_blank"
            rel="noreferrer"
            role="button"
            aria-label="Download"
            className={cn(
                `
                  flex items-center justify-center rounded bg-blue-600 px-4 py-2
                  text-white transition-colors duration-200

                  hover:bg-blue-700
                `,
                className,
            )}
        >
            <IconDownload className="mr-2 size-5" />

            {'Download'}
        </a>
    )
}
