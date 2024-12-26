import { RmbgModelLoader } from '@/components/RmbgModelLoader'
import { DashPage } from '@/pages/Dash'
import { HomePage } from '@/pages/Home'
import { ImageItem } from '@/types/imageItem'
import { useState } from 'react'

const App = () => {
    const [initialImages, setInitialImages] = useState<ImageItem[] | null>(null)

    return (
        <>
            {initialImages ? (
                <DashPage
                    className={`mx-auto mt-20 max-w-screen-lg px-6`}
                    initialImages={initialImages}
                />
            ) : (
                <HomePage onImagesSelect={images => setInitialImages(images)} />
            )}

            <RmbgModelLoader />
        </>
    )
}

export default App
