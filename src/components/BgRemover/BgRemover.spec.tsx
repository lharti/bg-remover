import { DropZone } from '@/components/DropZone'
import { ImagesList } from '@/components/ImagesList'
import { act, render } from '@testing-library/react'
import { BgRemover } from './BgRemover'

jest.mock('@/components/DropZone')
jest.mock('@/components/ImagesList')

const setupMocks = () => {
    const DropZoneMock = jest
        .mocked(DropZone)
        .mockImplementation(() => '{DROP_ZONE}')

    const ImagesListMock = jest
        .mocked(ImagesList)
        .mockImplementation(() => '{IMAGES_LIST}')

    return {
        DropZoneMock,
        ImagesListMock,
    }
}

describe('<BgRemover />', () => {
    it('should render', () => {
        expect.assertions(1)

        setupMocks()

        const { container } = render(<BgRemover />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="space-y-10"
              >
                {DROP_ZONE}
                {IMAGES_LIST}
              </div>
            </div>
        `)
    })

    it('should setup DropZone', () => {
        expect.assertions(1)

        const { DropZoneMock } = setupMocks()

        render(<BgRemover />)

        expect(DropZoneMock).toHaveBeenCalledExactlyOnceWith({
            onDrop: expect.any(Function),
            className: 'mx-auto max-w-xl',
        })
    })

    it('should setup ImagesList', () => {
        expect.assertions(1)

        const { ImagesListMock } = setupMocks()

        render(<BgRemover />)

        expect(ImagesListMock).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining({ files: [] }),
        )
    })

    it('should append dropped files onDrop', async () => {
        expect.assertions(1)

        const { DropZoneMock, ImagesListMock } = setupMocks()

        render(<BgRemover />)

        const acceptedFilesMock = [
            new File([], 'test.png', {
                type: 'image/png',
            }),

            new File([], 'test-2.png', {
                type: 'image/png',
            }),
        ]

        const onDrop = DropZoneMock.mock.calls[0][0].onDrop

        await act(() => {
            onDrop([acceptedFilesMock[0]])

            onDrop([acceptedFilesMock[1]])
        })

        expect(ImagesListMock).toHaveBeenLastCalledWith(
            expect.objectContaining({
                files: acceptedFilesMock,
            }),

            undefined,
        )
    })
})
