/**
 * Sets the alpha channel of an image based on the provided mask data.
 *
 * @param imageData - The ImageData object containing the image data.
 * @param maskData - The mask data used to set the alpha channel.
 * @returns The modified ImageData object with updated alpha channels.
 */
export const setAlphaFromMask = (
    imageData: ImageData,
    maskData: Uint8ClampedArray<ArrayBufferLike> | Uint8Array<ArrayBufferLike>,
) => {
    for (let i = 0; i < maskData.length; ++i) {
        imageData.data[4 * i + 3] = maskData[i]
    }

    return imageData
}
