import { DropZone } from '@/components/ui/DropZone'
import { HomePage } from '@/pages/Home'
import { ImagesSamples } from '@/pages/Home/Home.ImagesSamples'
import { render } from '@testing-library/react'

jest.mock('@/libs/generateImageItemsFromFiles')
jest.mock('@/components/ui/DropZone')
jest.mock('./Home.ImagesSamples')

const DropZoneMock = jest
    .mocked(DropZone)
    .mockImplementation(({ className }) => (
        <div id="DropZoneMock" className={className} />
    ))

const ImagesSamplesMock = jest
    .mocked(ImagesSamples)
    .mockReturnValue(<div id="ImagesSamplesMock" />)

describe('<HomePage />', () => {
    it('should render', () => {
        expect.assertions(1)

        const onImagesSelect = jest.fn()

        const { container } = render(
            <HomePage onImagesSelect={onImagesSelect} />,
        )

        expect(container).toMatchSnapshot()
    })

    it('should pass uploaded images items to onImagesSelect onDrop', () => {
        expect.assertions(2)

        const onImagesSelect = jest.fn()

        render(<HomePage onImagesSelect={onImagesSelect} />)

        const onDrop = DropZoneMock.mock.calls[0][0].onDrop

        onDrop([
            new File([], 'cat.png', {
                type: 'image/png',
            }),
        ])

        expect(onImagesSelect).toHaveBeenCalledOnce()

        expect(onImagesSelect.mock.calls[0][0]).toMatchInlineSnapshot(`
            [
              {
                "id": "cat-UUID",
                "name": "cat",
                "original": "blob:http://test/cat.png",
                "status": "pending",
              },
            ]
        `)
    })

    it('should pass sample image item to onImagesSelect onSampleClick', () => {
        expect.assertions(2)

        const onImagesSelect = jest.fn()

        render(<HomePage onImagesSelect={onImagesSelect} />)

        const onSampleClick = ImagesSamplesMock.mock.calls[0][0].onSampleClick

        onSampleClick(new File([], 'dog.png', { type: 'image/png' }))

        expect(onImagesSelect).toHaveBeenCalledOnce()

        expect(onImagesSelect.mock.calls[0][0]).toMatchInlineSnapshot(`
            [
              {
                "id": "dog-UUID",
                "name": "dog",
                "original": "blob:http://test/dog.png",
                "status": "pending",
              },
            ]
        `)
    })
})
