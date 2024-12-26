import { convertPropsToDataAttributes } from '@/utils/convertPropsToDataAttributes'

export const AddNewImagesBtn = jest.fn(({ className, ...otherProps }) => {
    delete otherProps.onAdd

    const dataAttributes = convertPropsToDataAttributes(otherProps)

    return (
        <button
            id="AddNewImagesBtnMock"
            role="button"
            aria-label="Add new images"
            className={className}
            {...dataAttributes}
        />
    )
})
