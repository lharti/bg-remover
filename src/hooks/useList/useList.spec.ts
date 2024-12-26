import { useList } from '@/hooks/useList/useList'
import { act, renderHook } from '@testing-library/react'

describe('useList', () => {
    it('should return list ', () => {
        expect.assertions(1)

        const initialList = [{ id: '1', name: 'test' }]

        const { result } = renderHook(() => useList({ initialList }))

        expect(result.current.list).toMatchInlineSnapshot(`
            [
              {
                "id": "1",
                "name": "test",
              },
            ]
        `)
    })

    it('should call onNewItems with initialList', () => {
        expect.assertions(1)

        const initialList = [{ id: '1', name: 'test' }]
        const onNewItems = jest.fn()

        const { rerender } = renderHook(useList, {
            initialProps: { initialList, onNewItems },
        })

        rerender({
            initialList,
            onNewItems: jest.fn(),
        })

        expect(onNewItems).toHaveBeenCalledExactlyOnceWith(initialList)
    })

    it('should return selectedListItem ', () => {
        expect.assertions(1)

        const initialList = [
            { id: '1', name: 'test' },
            { id: '2', name: 'test2' },
        ]

        const { result } = renderHook(() => useList({ initialList }))

        expect(result.current.selectedListItem).toMatchInlineSnapshot(`
            {
              "id": "1",
              "name": "test",
            }
        `)
    })

    describe('addItemsToList', () => {
        it('should add items to list', () => {
            expect.assertions(1)

            const initialList = [{ id: '1', name: 'test' }]

            const { result } = renderHook(() => useList({ initialList }))

            const newItems = [{ id: '2', name: 'test2' }]

            act(() => {
                result.current.addItemsToList(newItems)
            })

            expect(result.current.list).toMatchInlineSnapshot(`
                [
                  {
                    "id": "1",
                    "name": "test",
                  },
                  {
                    "id": "2",
                    "name": "test2",
                  },
                ]
            `)
        })

        it('should call onNewItems with new items', () => {
            expect.assertions(2)

            const initialList = [{ id: '1', name: 'test' }]
            const onNewItems = jest.fn()

            const { result } = renderHook(() =>
                useList({ initialList, onNewItems }),
            )

            const newItems = [{ id: '2', name: 'test2' }]

            act(() => {
                result.current.addItemsToList(newItems)
            })

            expect(onNewItems).toHaveBeenCalledTimes(2)

            expect(onNewItems).toHaveBeenLastCalledWith(newItems)
        })
    })

    describe('updateListItem', () => {
        it('should update item in list', () => {
            expect.assertions(1)

            const initialList = [
                { id: '1', status: 'initial' },
                { id: '2', status: 'initial' },
            ]

            const { result } = renderHook(() => useList({ initialList }))

            const newValue = { id: '4', status: 'updated' }

            act(() => {
                result.current.updateListItem('2', newValue)
            })

            expect(result.current.list).toMatchInlineSnapshot(`
                [
                  {
                    "id": "1",
                    "status": "initial",
                  },
                  {
                    "id": "4",
                    "status": "updated",
                  },
                ]
            `)
        })

        it('should update selected item if it is the one being updated', () => {
            expect.assertions(1)

            const initialList = [
                { id: '1', status: 'initial' },
                { id: '2', status: 'initial' },
            ]

            const { result } = renderHook(() => useList({ initialList }))

            const newValue = { id: '1', status: 'updated' }

            act(() => {
                result.current.updateListItem('1', newValue)
            })

            expect(result.current.selectedListItem).toMatchInlineSnapshot(`
                {
                  "id": "1",
                  "status": "updated",
                }
            `)
        })
    })

    describe('setSelectedListItem', () => {
        it('should set selected item', () => {
            expect.assertions(1)

            const initialList = [
                { id: '1', name: 'test' },
                { id: '2', name: 'test2' },
            ]

            const { result } = renderHook(() => useList({ initialList }))

            act(() => {
                result.current.setSelectedListItem(initialList[1])
            })

            expect(result.current.selectedListItem).toMatchInlineSnapshot(`
                {
                  "id": "2",
                  "name": "test2",
                }
            `)
        })
    })
})
