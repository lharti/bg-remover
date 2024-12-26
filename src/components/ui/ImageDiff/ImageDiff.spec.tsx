import { ImageDiff } from '@/components/ui/ImageDiff'
import { render } from '@testing-library/react'
import { useReactCompareSliderRef } from 'react-compare-slider'

jest.mock('react-compare-slider')

describe('<ImageDiff />', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(
            <ImageDiff
                before="blob:https://site.com/img-before.jpg"
                after="blob:https://site.com/img-after.png"
                maxHeight="60vh"
            />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="max-h-[60vh] cursor-ew-resize rounded-2xl"
                position="100"
                transition=".75s ease-in-out"
              >
                <img
                  alt="before"
                  src="blob:https://site.com/img-before.jpg"
                />
                <img
                  alt="after"
                  src="blob:https://site.com/img-after.png"
                />
              </div>
            </div>
        `)
    })

    it('should set the slide position to 100', () => {
        expect.assertions(1)

        const setPositionMock = jest.fn()

        // @ts-expect-error: hold my beet TS
        useReactCompareSliderRef.mockReturnValue({
            initData: {
                setPosition: setPositionMock,
            },
        })

        render(
            <ImageDiff
                before="blob:https://site.com/img-before.jpg"
                after="blob:https://site.com/img-after.png"
                maxHeight="60vh"
            />,
        )

        expect(setPositionMock).toHaveBeenCalledExactlyOnceWith(100)
    })

    it('should slide from position 100 to 0', async () => {
        expect.assertions(1)
        const setPositionMock = jest.fn()

        jest.useFakeTimers()
        // @ts-expect-error: hold my beet TS
        useReactCompareSliderRef.mockReturnValue({
            initData: {
                setPosition: setPositionMock,
            },
        })

        render(
            <ImageDiff
                before="blob:https://site.com/img-before.jpg"
                after="blob:https://site.com/img-after.png"
                maxHeight="60vh"
            />,
        )

        await jest.advanceTimersByTimeAsync(750)

        expect(setPositionMock.mock.calls).toMatchInlineSnapshot(`
            [
              [
                100,
              ],
              [
                0,
              ],
            ]
        `)
    })
})
