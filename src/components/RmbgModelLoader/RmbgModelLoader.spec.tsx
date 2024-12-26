import { RmbgModelLoader } from '@/components/RmbgModelLoader'
import { initModel } from '@/libs/rmbgModel'
import { render } from '@testing-library/react'
import { toast } from 'sonner'

jest.mock('@/libs/rmbgModel')
jest.mock('sonner')

const initModelMock = jest.mocked(initModel)
const toastMock = jest.mocked(toast)

describe('<RmbgModelLoader />', () => {
    it('should use <Toaster/>', () => {
        expect.assertions(1)

        const { container } = render(<RmbgModelLoader />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                data-position="top-center"
                data-testid="toaster"
              />
            </div>
        `)
    })

    it('should init ai model once', () => {
        expect.assertions(1)

        window.isModelInitialized = ''

        const { rerender } = render(<RmbgModelLoader />)

        rerender(<RmbgModelLoader />)
        rerender(<RmbgModelLoader />)

        expect(initModelMock).toHaveBeenCalledOnce()
    })

    it('should show loading toast after 2s', async () => {
        expect.assertions(2)

        jest.useFakeTimers()

        window.isModelInitialized = ''

        render(<RmbgModelLoader />)

        expect(toastMock.promise).not.toHaveBeenCalled()

        await jest.advanceTimersByTimeAsync(2000)

        expect(toastMock.promise).toHaveBeenCalledExactlyOnceWith(
            initModelMock(),

            {
                loading:
                    'Loading AI model...\n Feel free to start adding images',
                success: 'AI model loaded successfully',
                error: 'Failed to load AI model',
            },
        )
    })

    it('should not init ai model if it is already done', () => {
        expect.assertions(1)

        window.isModelInitialized = 'done'

        render(<RmbgModelLoader />)

        expect(initModelMock).not.toHaveBeenCalled()
    })
})
