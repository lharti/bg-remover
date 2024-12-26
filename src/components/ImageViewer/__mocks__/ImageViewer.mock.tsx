import { convertPropsToDataAttributes } from '@/utils/convertPropsToDataAttributes'

export const ImageViewer = jest.fn(props => {
    const dataAttributes = convertPropsToDataAttributes(props)

    return <div id="ImageViewerMock" {...dataAttributes} />
})
