export type ListItemBase = {
    id: string | number
}

export type UseListParams<ListItem extends ListItemBase> = {
    initialList: ListItem[]

    onNewItems?: (newItems: ListItem[]) => void
}

export type UseListResult<ListItem extends ListItemBase> = {
    list: ListItem[]
    selectedListItem?: ListItem

    addItemsToList: (Items: ListItem[]) => void
    updateListItem: (itemId: string, newValue: ListItem) => void

    setSelectedListItem: React.Dispatch<
        React.SetStateAction<ListItem | undefined>
    >
}
