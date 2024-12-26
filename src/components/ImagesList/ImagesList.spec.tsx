import { ImagesList } from '@/components/ImagesList'
import { ImageItem, ImageItemStatus } from '@/types/imageItem'
import { render, screen } from '@testing-library/react'

describe('<ImagesList />', () => {
    it('should render with empty items', () => {
        expect.assertions(1)

        const { container } = render(
            <ImagesList list={[]} onItemSelect={jest.fn()} />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="grid grid-cols-3 place-content-start place-items-center gap-4 px-4 md:grid-cols-8 sm:grid-cols-6 xs:grid-cols-4"
              />
            </div>
        `)
    })

    it('should render items', () => {
        expect.assertions(1)

        const items: ImageItem[] = [
            {
                id: '1',
                status: ImageItemStatus.PENDING,
                name: 'original-1',
                original: 'original-1.jpg',
            },

            {
                id: '2',
                status: ImageItemStatus.PROCESSED,
                name: 'original-2',
                original: 'original-2.png',
                processed: 'masked-2.png',
            },
        ]

        const { container } = render(
            <ImagesList list={items} onItemSelect={jest.fn()} />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="grid grid-cols-3 place-content-start place-items-center gap-4 px-4 md:grid-cols-8 sm:grid-cols-6 xs:grid-cols-4"
              >
                <button
                  aria-label="Select image"
                  class="
                                  relative size-20 overflow-hidden rounded-lg border-2

                                  border-gray-200

                                  hover:opacity-80
                                "
                  role="button"
                >
                  <img
                    alt="original-1"
                    class="aspect-square size-full object-cover"
                    src="original-1.jpg"
                  />
                  <div
                    class="
                                          absolute inset-0 flex items-center justify-center
                                          bg-black/50
                                        "
                  >
                    <svg
                      class="tabler-icon tabler-icon-loader-2 size-8 animate-spin text-white/50"
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
                        d="M12 3a9 9 0 1 0 9 9"
                      />
                    </svg>
                  </div>
                </button>
                <button
                  aria-label="Select image"
                  class="
                                  relative size-20 overflow-hidden rounded-lg border-2

                                  border-gray-200

                                  hover:opacity-80
                                "
                  role="button"
                >
                  <img
                    alt="original-2"
                    class="aspect-square size-full object-cover"
                    src="original-2.png"
                  />
                </button>
              </div>
            </div>
        `)
    })

    it('should render add new item button', () => {
        expect.assertions(1)

        const { container } = render(
            <ImagesList
                list={[]}
                renderAddNewItemBtn={() => <button>Add new item</button>}
                onItemSelect={jest.fn()}
            />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="grid grid-cols-3 place-content-start place-items-center gap-4 px-4 md:grid-cols-8 sm:grid-cols-6 xs:grid-cols-4"
              >
                <button>
                  Add new item
                </button>
              </div>
            </div>
        `)
    })

    it('should call onItemSelect on item click', () => {
        expect.assertions(1)

        const onItemSelectMock = jest.fn()

        const items: ImageItem[] = [
            {
                id: '1',
                status: ImageItemStatus.PENDING,
                name: 'original-1',
                original: 'original-1.jpg',
            },
        ]

        render(<ImagesList list={items} onItemSelect={onItemSelectMock} />)

        const item = screen.getByRole('button', { name: 'Select image' })

        item?.click()

        expect(onItemSelectMock).toHaveBeenCalledExactlyOnceWith(items[0])
    })

    it('should highlight selected item', () => {
        expect.assertions(1)

        const items: ImageItem[] = [
            {
                id: '1',
                status: ImageItemStatus.PROCESSED,
                name: 'original-1',
                original: 'original-1.jpg',
                processed: 'masked-1.png',
            },
        ]

        render(
            <ImagesList
                list={items}
                selectedItemId="1"
                onItemSelect={jest.fn()}
            />,
        )

        const selectedItemElement = screen.getByRole('button', {
            name: 'Select image',
        })

        expect(selectedItemElement).toMatchInlineSnapshot(`
            <button
              aria-label="Select image"
              class="
                                  relative size-20 overflow-hidden rounded-lg border-2

                                  !border-blue-500

                                  hover:opacity-80
                                "
              role="button"
            >
              <img
                alt="original-1"
                class="aspect-square size-full object-cover"
                src="original-1.jpg"
              />
            </button>
        `)
    })
})
