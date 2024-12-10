import { render } from '@testing-library/react'
import { ImagesList } from './ImagesList'

global.URL.createObjectURL = (file: File) =>
    `blob:http://localhost:3000/${file.name}`

const revokeObjectURL = jest.fn()
global.URL.revokeObjectURL = revokeObjectURL

describe('<ImagesList />', () => {
    it('should render with empty files', () => {
        expect.assertions(1)

        const { container } = render(<ImagesList files={[]} />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="grid grid-cols-2 gap-2 lg:grid-cols-6 sm:grid-cols-4"
              />
            </div>
        `)
    })

    it('should render with files', () => {
        expect.assertions(1)

        const files = [
            new File([''], 'test.jpg', { type: 'image/jpeg' }),
            new File([''], 'test-2.png', { type: 'image/png' }),
        ]

        const { container } = render(<ImagesList files={files} />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="grid grid-cols-2 gap-2 lg:grid-cols-6 sm:grid-cols-4"
              >
                <img
                  alt="test.jpg"
                  class="
                                  aspect-square size-full rounded-lg object-cover

                                  hover:opacity-80
                                "
                  src="blob:http://localhost:3000/test.jpg"
                />
                <img
                  alt="test-2.png"
                  class="
                                  aspect-square size-full rounded-lg object-cover

                                  hover:opacity-80
                                "
                  src="blob:http://localhost:3000/test-2.png"
                />
              </div>
            </div>
        `)
    })

    it('should revoke unused object URls', () => {
        expect.assertions(1)

        const files = [
            new File([''], 'test.jpg', { type: 'image/jpeg' }),
            new File([''], 'test-2.png', { type: 'image/png' }),
        ]

        const { rerender } = render(<ImagesList files={files} />)

        rerender(<ImagesList files={[]} />)

        expect(revokeObjectURL.mock.calls).toMatchInlineSnapshot(`
            [
              [
                "blob:http://localhost:3000/test.jpg",
              ],
              [
                "blob:http://localhost:3000/test-2.png",
              ],
            ]
        `)
    })
})
