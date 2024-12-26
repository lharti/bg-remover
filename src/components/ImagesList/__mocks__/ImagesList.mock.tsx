import { ImagesListProps } from '@/components/ImagesList'
import { ImageItem } from '@/types/imageItem'
import { convertPropsToDataAttributes } from '@/utils/convertPropsToDataAttributes'

export const ImagesList = jest.fn(
    ({ list, renderAddNewItemBtn, selectedItemId }: ImagesListProps) => {
        return (
            <div id="ImagesListMock">
                {renderAddNewItemBtn && renderAddNewItemBtn()}

                {list.map((item: ImageItem) => {
                    const dataAttributes = convertPropsToDataAttributes(item)

                    return (
                        <div
                            id="ImagesListItemMock"
                            key={item.id}
                            data-selected={selectedItemId === item.id}
                            {...dataAttributes}
                        />
                    )
                })}
            </div>
        )
    },
)
