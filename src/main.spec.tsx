import App from '@/App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

jest.mock('@/App')
jest.mock('react-dom/client')

const render = jest.fn()

const createRootMock = jest.mocked(createRoot).mockReturnValueOnce({
    render,
    unmount: jest.fn(),
})

document.getElementById = jest.fn((id: string) => {
    const element = document.createElement('div')

    element.id = id

    return element
})

describe('main', () => {
    it('should render App', async () => {
        expect.assertions(1)

        await jest.isolateModulesAsync(async () => {
            await await import('./main')

            expect(render).toHaveBeenCalledExactlyOnceWith(
                <StrictMode>
                    <App />
                </StrictMode>,
            )
        })
    })

    it('should create root', async () => {
        expect.assertions(1)

        const render = jest.fn()

        createRootMock.mockReturnValueOnce({
            render,
            unmount: jest.fn(),
        })

        await jest.isolateModulesAsync(async () => {
            await import('./main')

            expect(createRootMock.mock.calls).toMatchInlineSnapshot(`
                [
                  [
                    <div
                      id="root"
                    />,
                  ],
                ]
            `)
        })
    })
})
