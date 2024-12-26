import { initModel } from '@/libs/rmbgModel'
import React, { useEffect } from 'react'
import { toast, Toaster } from 'sonner'

declare global {
    interface Window {
        isModelInitialized?: string
    }
}

export const RmbgModelLoader: React.FC = () => {
    useEffect(() => {
        if (window.isModelInitialized === 'done') return

        const initModelPromise = initModel()

        window.isModelInitialized = 'done'

        const startToast = () =>
            toast.promise(initModelPromise, {
                loading:
                    'Loading AI model...\n Feel free to start adding images',
                success: 'AI model loaded successfully',
                error: 'Failed to load AI model',
            })

        setTimeout(startToast, 1000)
    }, [])

    return <Toaster position="top-center" />
}
