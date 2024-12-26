import { BottomSheet } from '@/components/ui/BottomSheet'
import { render } from '@testing-library/react'
import { act } from 'react'
import { Drawer } from 'vaul'

jest.mock('vaul', () => ({
    Drawer: {
        Root: jest.fn(({ children }) => <div id="root">{children}</div>),

        Portal: jest.fn(({ children, ...otherProps }) => (
            <div id="portal" {...otherProps}>
                {children}
            </div>
        )),

        Content: jest.fn(({ children, ...otherProps }) => (
            <div id="content" {...otherProps}>
                {children}
            </div>
        )),

        Handle: jest.fn(props => <div id="handle" {...props} />),

        Title: jest.fn(),

        Description: jest.fn(),
    },
}))

const DrawerMock = jest.mocked(Drawer)

describe('<BottomSheet />', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(
            <BottomSheet snapPoints={['125px', '900px']}>
                <div>Content</div>
            </BottomSheet>,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                id="root"
              >
                <div
                  id="portal"
                >
                  <div
                    class="fixed inset-x-0 bottom-0 h-full bg-white"
                    id="content"
                  >
                    <div
                      class="mb-4 mt-2"
                      id="handle"
                    />
                    <div>
                      Content
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `)
    })

    it('should be collapsed by default', () => {
        expect.assertions(1)

        render(<BottomSheet snapPoints={['170px', '200px', '300px']} />)

        expect(Drawer.Root).toHaveBeenLastCalledWith(
            expect.objectContaining({
                activeSnapPoint: '170px',
            }),

            undefined,
        )
    })

    it('should set up Drawer.Root', () => {
        expect.assertions(1)

        const SNAP_POINTS = ['150px', '300px', '450px']

        render(<BottomSheet snapPoints={SNAP_POINTS} />)

        expect(Drawer.Root).toHaveBeenCalledExactlyOnceWith({
            open: true,
            modal: false,

            snapPoints: SNAP_POINTS,
            activeSnapPoint: SNAP_POINTS[0],
            setActiveSnapPoint: expect.any(Function),

            children: expect.any(Object),
        })
    })

    describe('expand', () => {
        it('should expand if expended is true', () => {
            expect.assertions(1)

            render(
                <BottomSheet
                    expended
                    snapPoints={['100px', '200px', '300px', '400px']}
                />,
            )

            expect(Drawer.Root).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    activeSnapPoint: '400px',
                }),

                undefined,
            )
        })

        it('should expand on mouse enter', () => {
            expect.assertions(1)

            render(<BottomSheet snapPoints={['100px', '200px', '300px']} />)

            const onMouseEnter =
                DrawerMock.Content.mock.calls[0][0].onMouseEnter

            act(() => {
                // @ts-expect-error - We don't care about the event object
                onMouseEnter({})
            })

            expect(Drawer.Root).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    activeSnapPoint: '300px',
                }),

                undefined,
            )
        })

        it('should expand on click if sheet is collapsed', () => {
            expect.assertions(1)

            render(<BottomSheet snapPoints={['100px', '200px', '500px']} />)

            const onClick = DrawerMock.Content.mock.calls[0][0].onClick

            act(() => {
                // @ts-expect-error - We don't care about the event object
                onClick({})
            })

            expect(Drawer.Root).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    activeSnapPoint: '500px',
                }),

                undefined,
            )
        })
    })

    describe('collapse', () => {
        it('should collapse on mouse leave', () => {
            expect.assertions(1)

            render(
                <BottomSheet
                    expended
                    snapPoints={['140px', '250px', '300px']}
                />,
            )

            const onMouseLeave =
                DrawerMock.Content.mock.calls[0][0].onMouseLeave

            act(() => {
                // @ts-expect-error - We don't care about the event object
                onMouseLeave({})
            })

            expect(Drawer.Root).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    activeSnapPoint: '140px',
                }),

                undefined,
            )
        })

        it('should collapse on click if sheet expanded', () => {
            expect.assertions(1)

            render(
                <BottomSheet
                    expended
                    snapPoints={['100px', '200px', '300px']}
                />,
            )

            const onClick = DrawerMock.Content.mock.calls[0][0].onClick

            act(() => {
                // @ts-expect-error - We don't care about the event object
                onClick({})
            })

            expect(Drawer.Root).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    activeSnapPoint: '100px',
                }),

                undefined,
            )
        })
    })
})
