import App from '@/App'
import { RmbgModelLoader } from '@/components/RmbgModelLoader'
import { DashPage } from '@/pages/Dash'
import { HomePage } from '@/pages/Home'
import { ImageItemStatus } from '@/types/imageItem'
import { render } from '@testing-library/react'
import { act } from 'react'

jest.mock('@/pages/Home')
jest.mock('@/pages/Dash')
jest.mock('@/components/RmbgModelLoader')

export const HomePageMock = jest
    .mocked(HomePage)
    .mockReturnValue(<div>HomePage</div>)

export const DashPageMock = jest
    .mocked(DashPage)
    .mockReturnValue(<div>DashPage</div>)

export const RmbgModelLoaderMock = jest
    .mocked(RmbgModelLoader)
    .mockReturnValue(<div>RmbgModelLoader</div>)

describe('<App />', () => {
    it('should render HomePage by default', () => {
        expect.assertions(1)

        const { container } = render(<App />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                HomePage
              </div>
              <div>
                RmbgModelLoader
              </div>
            </div>
        `)
    })

    it('should render DashPage after selecting images', () => {
        expect.assertions(1)

        const { container } = render(<App />)

        const onImagesSelect = HomePageMock.mock.calls[0][0].onImagesSelect

        const imagesItems = [
            {
                id: '1',
                url: 'blob:https://example.com/image1.png',
                name: 'image1.png',
                status: ImageItemStatus.PENDING,
                original: '',
            },

            {
                id: '2',
                url: 'blob:https://example.com/image2.png',
                name: 'image2.png',
                status: ImageItemStatus.PENDING,
                original: '',
            },
        ]

        act(() => {
            onImagesSelect(imagesItems)
        })

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                DashPage
              </div>
              <div>
                RmbgModelLoader
              </div>
            </div>
        `)
    })

    it('should pass initialImages to DashPage', () => {
        expect.assertions(1)

        render(<App />)

        const onImagesSelect = HomePageMock.mock.calls[0][0].onImagesSelect

        const imagesItems = [
            {
                id: '1',
                url: 'blob:https://site.com/cat.png',
                name: 'cat.png',
                status: ImageItemStatus.PENDING,
                original: '',
            },

            {
                id: '2',
                url: 'blob:https://site.com/dog.png',
                name: 'dog.png',
                status: ImageItemStatus.PENDING,
                original: '',
            },
        ]

        act(() => {
            onImagesSelect(imagesItems)
        })

        expect(DashPageMock).toHaveBeenCalledExactlyOnceWith({
            className: 'mx-auto mt-20 max-w-screen-lg px-6',
            initialImages: imagesItems,
        })
    })
})
