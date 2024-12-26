import { cn } from '@/utils/cn'
import { wait } from '@/utils/wait'
import { useEffect } from 'react'
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
    useReactCompareSliderRef,
} from 'react-compare-slider'

export interface ImageDiffProps {
    before: string
    after: string

    maxHeight: string

    className?: string
}

export const ImageDiff: React.FC<ImageDiffProps> = ({
    before,
    after,

    maxHeight,

    className,
}) => {
    const slider = useReactCompareSliderRef()

    useEffect(() => {
        const slide = async () => {
            slider.current?.setPosition(100)

            await wait(750)
            slider.current?.setPosition(0)
        }

        slide()
    }, [slider, before, after])

    return (
        <ReactCompareSlider
            ref={slider}
            position={100}
            transition=".75s ease-in-out"
            className={cn(
                className,
                `
                  max-h-[${maxHeight}]

                  cursor-ew-resize rounded-2xl
                `,
            )}
            itemOne={
                <ReactCompareSliderImage
                    src={before}
                    alt="before"
                    // eslint-disable-next-line tailwindcss/no-custom-classname
                    className={`
                      max-h-[${maxHeight}]

                      !w-auto !object-contain
                    `}
                />
            }
            itemTwo={
                <ReactCompareSliderImage
                    src={after}
                    alt="after"
                    style={transparentBackgroundStyle}
                    // eslint-disable-next-line tailwindcss/no-custom-classname
                    className={`
                      max-h-[${maxHeight}]

                      !w-auto !object-contain
                    `}
                />
            }
        />
    )
}

const transparentBackgroundStyle = {
    backgroundColor: 'white',

    backgroundImage:
        'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',

    backgroundSize: '20px 20px',

    backgroundPosition: '0px 0px, 0px 10px, 10px -10px, -10px 0px',
}
