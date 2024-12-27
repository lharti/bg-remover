import { DropZone } from '@/components/ui/DropZone'
import { HomePage } from '@/pages/Home'
import { render } from '@testing-library/react'

jest.mock('@/libs/generateImageItemsFromFiles')
jest.mock('@/components/ui/DropZone')

const DropZoneMock = jest
    .mocked(DropZone)
    .mockImplementation(({ className }) => (
        <div id="DropZoneMock" className={className} />
    ))

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
})
