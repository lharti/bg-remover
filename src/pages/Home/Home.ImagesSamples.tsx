import { SAMPLES } from '@/pages/Home/Home.constants'
import React from 'react'

interface ImagesSamplesProps {
    onSampleClick: (url: string) => Promise<void>
}
export const ImagesSamples: React.FC<ImagesSamplesProps> = ({
    onSampleClick: onSampleClick,
}) => {
    return (
        <div className="mt-10 space-y-4 text-center">
            <p className="font-bold">No images? Try one of these:</p>

            <div className="flex justify-center gap-4">
                {SAMPLES.map(({ name, thumbnail, url }) => (
                    <button
                        key={name}
                        className="hover:opacity-80"
                        role="button"
                        aria-label={`Select sample image: ${name}`}
                        onClick={() => onSampleClick(url)}
                    >
                        <img
                            src={thumbnail}
                            alt={name}
                            className={`w-40 rounded-lg object-cover shadow-lg`}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
