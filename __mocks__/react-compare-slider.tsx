/* eslint-disable react-refresh/only-export-components */
export const ReactCompareSlider = jest.fn(
    ({ itemOne, itemTwo, ref, ...otherProps }) => {
        ref.current = ref.initData
        return (
            <div {...otherProps}>
                {itemOne}
                {itemTwo}
            </div>
        )
    },
)

export const ReactCompareSliderImage = jest.fn(({ src, alt }) => (
    <img src={src} alt={alt} />
))

export const useReactCompareSliderRef = jest.fn(() => ({
    current: null,
}))
