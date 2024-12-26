import { cn } from '@/utils/cn'
import { IconFileUpload } from '@tabler/icons-react'
import React from 'react'
import { useDropzone } from 'react-dropzone'

export interface DropZoneProps {
    onDrop: (acceptedFiles: File[]) => void
    className?: string
}

export const DropZone: React.FC<DropZoneProps> = ({ onDrop, className }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/bmp': [],
            'image/webp': [],
        },

        onDrop,
    })

    return (
        <div
            {...getRootProps()}
            aria-label="dropzone"
            className={cn(
                `
                  flex flex-col items-center justify-center rounded-lg border-2
                  border-dashed bg-white py-8 text-center text-gray-600
                  shadow-md transition-colors duration-300

                  hover:cursor-pointer hover:border-blue-400 hover:bg-blue-50
                  hover:text-blue-500

                  ${
                      isDragActive
                          ? 'border-blue-400 bg-blue-50'
                          : `border-gray-300`
                  }
                `,

                className,
            )}
        >
            <IconFileUpload
                size={50}
                className="mb-2 rounded-full bg-blue-100/40 p-2 text-blue-500"
            />

            <input {...getInputProps()} className="hidden" />

            {isDragActive ? (
                <p className="text-blue-800">{'Drop the images here...'}</p>
            ) : (
                <p className="font-medium">
                    {'Drag images here, or click to browse'}
                </p>
            )}
        </div>
    )
}
