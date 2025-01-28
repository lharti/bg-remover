import { SAMPLES } from '@/pages/Home/Home.constants'
import React from 'react'

interface ImagesSamplesProps {
    onSampleClick: (file: File) => void
}
export const ImagesSamples: React.FC<ImagesSamplesProps> = ({
    onSampleClick: onSampleClick,
}) => {
    const loadSample = async (url: string) => {
        const response = await fetch(url)
        const blob = await response.blob()

        const file = new File([blob], 'sample.jpg', {
            type: 'image/jpeg',
        })

        onSampleClick(file)
    }

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
                        onClick={() => loadSample(url)}
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
