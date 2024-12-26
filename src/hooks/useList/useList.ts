import { useEffect, useRef, useState } from 'react'
import { ListItemBase, UseListParams, UseListResult } from './useList.types'

export const useList = <ListItem extends ListItemBase>({
    initialList,

    onNewItems,
}: UseListParams<ListItem>): UseListResult<ListItem> => {
    const [list, setListItems] = useState<ListItem[]>(initialList)

    const [selectedListItem, setSelectedListItem] = useState<
        ListItem | undefined
    >(initialList[0])

    const addItemsToList = (newItems: ListItem[]) => {
        setListItems(prevItems => [...prevItems, ...newItems])

        onNewItems?.(newItems)
    }

    const updateListItem = (itemId: string, newValue: ListItem) => {
        setListItems(updateItemById(itemId, newValue))

        // Update selected item data if it's the one being updated
        setSelectedListItem(prevItem => {
            return prevItem?.id === itemId ? newValue : prevItem
        })
    }

    // call onNewItems with initialList on first render
    const isFirstRun = useRef(true)

    useEffect(() => {
        if (!isFirstRun.current) return

        isFirstRun.current = false

        onNewItems?.(initialList)
    }, [initialList, onNewItems])

    return {
        list,
        selectedListItem,

        addItemsToList,
        updateListItem,

        setSelectedListItem,
    }
}

const updateItemById = <ListItem extends ListItemBase>(
    targetId: string,
    newValue: ListItem,
) => {
    const setItemsCb = (items: ListItem[]) =>
        items.map(item => {
            if (item.id !== targetId) return item

            return newValue
        })

    return setItemsCb
}
