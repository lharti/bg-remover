import { UnthrowablePromise } from '@/types/unthrowable'

export const canvasToBlob = (
    canvas: HTMLCanvasElement,
    type: string,
): UnthrowablePromise<Blob, Error> => {
    return new Promise(resolve => {
        const callback = (blob: Blob | null) => {
            if (!blob) {
                resolve({
                    error: new Error('Failed to create blob from canvas'),
                })

                return
            }

            resolve({
                result: blob,
            })
        }

        canvas.toBlob(callback, type)
    })
}
