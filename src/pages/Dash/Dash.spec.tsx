import { AddNewImagesBtn } from '@/components/AddNewImagesBtn'
import { useRemoveBgQueue } from '@/hooks/useRemoveBgQueue'
import { DashPage } from '@/pages/Dash/Dash'
import { ImageItemStatus } from '@/types/imageItem'
import { render } from '@testing-library/react'
import { act } from 'react'

jest.mock('@/hooks/useRemoveBgQueue')
jest.mock('@/components/ui/BottomSheet')
jest.mock('@/components/ImageViewer')
jest.mock('@/components/AddNewImagesBtn')
jest.mock('@/components/ImagesList')

const setupMocks = () => {
    const addToQueueMock = jest.fn()

    const useRemoveBgQueueMock = jest.mocked(useRemoveBgQueue).mockReturnValue({
        addToQueue: addToQueueMock,
    })

    const AddNewImagesBtnMock = jest.mocked(AddNewImagesBtn)

    return {
        useRemoveBgQueueMock,
        addToQueueMock,
        AddNewImagesBtnMock,
    }
}

describe('<DashPage />', () => {
    it('should render- without initialImages', () => {
        expect.assertions(1)

        setupMocks()

        const { container } = render(<DashPage />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                <div
                  data-snappoints="150px,300px"
                >
                  <div
                    id="ImagesListMock"
                  >
                    <button
                      aria-label="Add new images"
                      id="AddNewImagesBtnMock"
                      role="button"
                    />
                  </div>
                </div>
              </div>
            </div>
        `)
    })

    it('should render- with initialImages', () => {
        expect.assertions(1)

        setupMocks()

        const initialImages = [
            {
                id: 'UUID-1',
                name: 'cat',
                original: 'blob:http://test/cat.png',
                status: ImageItemStatus.PENDING,
            },

            {
                id: 'UUID-2',
                name: 'dog',
                original: 'blob:http://test/dog.jpg',
                processed: 'blob:http://test/dog-masked.jpg',
                status: ImageItemStatus.PROCESSED,
            },
        ]

        const { container } = render(<DashPage initialImages={initialImages} />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                <div
                  data-name="cat"
                  data-original="blob:http://test/cat.png"
                  id="ImageViewerMock"
                />
                <div
                  data-snappoints="150px,300px"
                >
                  <div
                    id="ImagesListMock"
                  >
                    <button
                      aria-label="Add new images"
                      id="AddNewImagesBtnMock"
                      role="button"
                    />
                    <div
                      data-id="UUID-1"
                      data-name="cat"
                      data-original="blob:http://test/cat.png"
                      data-selected="true"
                      data-status="pending"
                      id="ImagesListItemMock"
                    />
                    <div
                      data-id="UUID-2"
                      data-name="dog"
                      data-original="blob:http://test/dog.jpg"
                      data-processed="blob:http://test/dog-masked.jpg"
                      data-selected="false"
                      data-status="processed"
                      id="ImagesListItemMock"
                    />
                  </div>
                </div>
              </div>
            </div>
        `)
    })

    it('should send initialImages to remove bg queue', () => {
        expect.assertions(1)

        const { addToQueueMock } = setupMocks()

        const initialImages = [
            {
                id: 'UUID-1',
                name: 'cat',
                original: 'blob:http://test/cat.png',
                status: ImageItemStatus.PENDING,
            },
        ]

        render(<DashPage initialImages={initialImages} />)

        expect(addToQueueMock).toHaveBeenCalledExactlyOnceWith(initialImages)
    })

    it('should update images items after queue processing', () => {
        expect.assertions(1)

        const { useRemoveBgQueueMock } = setupMocks()

        const initialImages = [
            {
                id: 'UUID-1',
                name: 'cat',
                original: 'blob:http://test/cat.png',
                status: ImageItemStatus.PENDING,
            },
        ]
        const { container } = render(<DashPage initialImages={initialImages} />)

        const onItemProcessed =
            useRemoveBgQueueMock.mock.calls[0]?.[0]?.onItemProcessed

        act(() => {
            return onItemProcessed?.({
                ...initialImages[0],
                processed: 'blob:http://test/cat-masked.png',
                status: ImageItemStatus.PROCESSED,
            })
        })

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                <div
                  data-name="cat"
                  data-original="blob:http://test/cat.png"
                  data-processed="blob:http://test/cat-masked.png"
                  id="ImageViewerMock"
                />
                <div
                  data-snappoints="150px,300px"
                >
                  <div
                    id="ImagesListMock"
                  >
                    <button
                      aria-label="Add new images"
                      id="AddNewImagesBtnMock"
                      role="button"
                    />
                    <div
                      data-id="UUID-1"
                      data-name="cat"
                      data-original="blob:http://test/cat.png"
                      data-processed="blob:http://test/cat-masked.png"
                      data-selected="true"
                      data-status="processed"
                      id="ImagesListItemMock"
                    />
                  </div>
                </div>
              </div>
            </div>
        `)
    })

    describe('adding new images items', () => {
        it('should add new items using AddNewImagesBtn', () => {
            expect.assertions(1)

            const { AddNewImagesBtnMock } = setupMocks()

            const initialImages = [
                {
                    id: 'UUID-initial-1',
                    name: 'initial-cat',
                    original: 'blob:http://initial/cat.png',
                    status: ImageItemStatus.PENDING,
                },
            ]

            const { container } = render(
                <DashPage initialImages={initialImages} />,
            )

            const onAdd = AddNewImagesBtnMock.mock.calls[0][0].onAdd

            const newItems = [
                {
                    id: 'UUID-new-1',
                    name: 'new-cat',
                    original: 'blob:http://new/cat.png',
                    status: ImageItemStatus.PENDING,
                },
            ]

            act(() => {
                onAdd(newItems)
            })

            expect(container).toMatchInlineSnapshot(`
                <div>
                  <div>
                    <div
                      data-name="new-cat"
                      data-original="blob:http://new/cat.png"
                      id="ImageViewerMock"
                    />
                    <div
                      data-snappoints="150px,300px"
                    >
                      <div
                        id="ImagesListMock"
                      >
                        <button
                          aria-label="Add new images"
                          id="AddNewImagesBtnMock"
                          role="button"
                        />
                        <div
                          data-id="UUID-initial-1"
                          data-name="initial-cat"
                          data-original="blob:http://initial/cat.png"
                          data-selected="false"
                          data-status="pending"
                          id="ImagesListItemMock"
                        />
                        <div
                          data-id="UUID-new-1"
                          data-name="new-cat"
                          data-original="blob:http://new/cat.png"
                          data-selected="true"
                          data-status="pending"
                          id="ImagesListItemMock"
                        />
                      </div>
                    </div>
                  </div>
                </div>
            `)
        })

        it('should send new images to remove bg queue', () => {
            expect.assertions(1)

            const { addToQueueMock, AddNewImagesBtnMock } = setupMocks()

            const { rerender } = render(<DashPage />)

            rerender(<DashPage />)

            const onAdd = AddNewImagesBtnMock.mock.calls[0][0].onAdd

            const newImages = [
                {
                    id: 'UUID-new-2',
                    name: 'new-dog',
                    original: 'blob:http://new/dog.jpg',
                    status: ImageItemStatus.PENDING,
                },
            ]
            act(() => {
                onAdd(newImages)
            })

            expect(addToQueueMock).toHaveBeenCalledExactlyOnceWith(newImages)
        })
    })
})
