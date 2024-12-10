import { act, fireEvent, render, screen } from '@testing-library/react'
import { DropZone } from './DropZone'

describe('<DropZone />', () => {
    it('should render stale state', () => {
        expect.assertions(1)

        const { container } = render(<DropZone onDrop={jest.fn()} />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                aria-label="dropzone"
                class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-8 text-center text-gray-600 shadow-md transition-colors duration-300 hover:cursor-pointer hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 border-gray-300"
                role="presentation"
                tabindex="0"
              >
                <svg
                  class="tabler-icon tabler-icon-file-upload mb-2 rounded-full bg-blue-100/40 p-2 text-blue-500"
                  fill="none"
                  height="50"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 3v4a1 1 0 0 0 1 1h4"
                  />
                  <path
                    d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                  />
                  <path
                    d="M12 11v6"
                  />
                  <path
                    d="M9.5 13.5l2.5 -2.5l2.5 2.5"
                  />
                </svg>
                <input
                  accept="image/jpeg,image/png,image/bmp,image/webp"
                  class="hidden"
                  multiple=""
                  style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: 0px -1px -1px 0px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;"
                  tabindex="-1"
                  type="file"
                />
                <p
                  class="font-medium"
                >
                  Drag images here, or click to browse
                </p>
              </div>
            </div>
        `)
    })

    it('should render drag enter state', async () => {
        expect.assertions(1)

        const onDrop = jest.fn()
        const { container } = render(<DropZone onDrop={onDrop} />)

        const dropzone = screen.getByRole('presentation', {
            name: 'dropzone',
        })

        await act(() => {
            fireEvent.dragEnter(dropzone, {
                dataTransfer: {
                    files: [new File([], 'test.png')],
                    items: [],
                    types: ['Files'],
                },
            })
        })

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                aria-label="dropzone"
                class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-8 text-center text-gray-600 shadow-md transition-colors duration-300 hover:cursor-pointer hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 border-blue-400 bg-blue-50"
                role="presentation"
                tabindex="0"
              >
                <svg
                  class="tabler-icon tabler-icon-file-upload mb-2 rounded-full bg-blue-100/40 p-2 text-blue-500"
                  fill="none"
                  height="50"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 3v4a1 1 0 0 0 1 1h4"
                  />
                  <path
                    d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                  />
                  <path
                    d="M12 11v6"
                  />
                  <path
                    d="M9.5 13.5l2.5 -2.5l2.5 2.5"
                  />
                </svg>
                <input
                  accept="image/jpeg,image/png,image/bmp,image/webp"
                  class="hidden"
                  multiple=""
                  style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: 0px -1px -1px 0px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;"
                  tabindex="-1"
                  type="file"
                />
                <p
                  class="text-blue-800"
                >
                  Drop the images here...
                </p>
              </div>
            </div>
        `)
    })

    it('should pass dropped files to onDrop', async () => {
        expect.assertions(1)

        const onDrop = jest.fn()
        render(<DropZone onDrop={onDrop} />)

        const dropzone = screen.getByRole('presentation', {
            name: 'dropzone',
        })

        const droppedFilesMock = [
            {
                kind: 'file',
                type: 'image/png',
                getAsFile: () => new File([], 'test.png'),
            },
        ]

        await act(() => {
            fireEvent.drop(dropzone, {
                dataTransfer: {
                    items: droppedFilesMock,
                    types: ['Files'],
                },
            })
        })

        expect(onDrop.mock.calls[0][0]).toMatchInlineSnapshot(`
            [
              File {
                "path": "./test.png",
                "relativePath": "./test.png",
                "type": "image/png",
              },
            ]
        `)
    })
})
