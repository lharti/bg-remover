import { AddNewImagesBtn } from '@/components/AddNewImagesBtn'
import { render, screen } from '@testing-library/react'
import { useFilePicker } from 'use-file-picker'

jest.mock('use-file-picker')
jest.mock('@/libs/generateImageItemsFromFiles')

const openFilePickerMock = jest.fn()

const useFilePickerMock = jest.mocked(useFilePicker).mockReturnValue({
    openFilePicker: openFilePickerMock,
})

describe('<AddNewImagesBtn />', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(<AddNewImagesBtn onAdd={jest.fn()} />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <button
                aria-label="Add new images"
                class="flex size-20 items-center justify-center rounded-lg bg-blue-100 transition-color text-blue-500 duration-300 ease-in-out active:bg-blue-300 hover:bg-blue-200"
                role="button"
              >
                <svg
                  class="tabler-icon tabler-icon-plus size-8"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5l0 14"
                  />
                  <path
                    d="M5 12l14 0"
                  />
                </svg>
              </button>
            </div>
        `)
    })

    it('should use useFilePicker', () => {
        expect.assertions(1)

        render(<AddNewImagesBtn onAdd={jest.fn()} />)

        expect(useFilePicker).toHaveBeenCalledExactlyOnceWith({
            multiple: true,
            accept: ['image/jpeg', 'image/png', 'image/bmp', 'image/webp'],
            onFilesSelected: expect.any(Function),
        })
    })

    it('should open files picker on click', () => {
        expect.assertions(1)

        render(<AddNewImagesBtn onAdd={jest.fn()} />)

        const button = screen.getByRole('button', { name: 'Add new images' })

        button.click()

        expect(openFilePickerMock).toHaveBeenCalledOnce()
    })

    it('should pass images items to onAdd', () => {
        expect.assertions(2)

        const onAdd = jest.fn()

        render(<AddNewImagesBtn onAdd={onAdd} />)

        const onFilesSelected = useFilePickerMock.mock.calls[0][0]
            .onFilesSelected as (data: unknown) => void

        onFilesSelected({
            plainFiles: [
                new File([], 'cat.png', {
                    type: 'image/png',
                }),

                new File([], 'dog.jpg', {
                    type: 'image/jpeg',
                }),
            ],
        })

        expect(onAdd).toHaveBeenCalledOnce()

        expect(onAdd.mock.calls[0][0]).toMatchInlineSnapshot(`
            [
              {
                "id": "cat-UUID",
                "name": "cat",
                "original": "blob:http://test/cat.png",
                "status": "pending",
              },
              {
                "id": "dog-UUID",
                "name": "dog",
                "original": "blob:http://test/dog.jpg",
                "status": "pending",
              },
            ]
        `)
    })
})
