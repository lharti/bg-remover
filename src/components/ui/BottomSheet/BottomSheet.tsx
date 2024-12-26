import React, { PropsWithChildren, useState } from 'react'
import { Drawer } from 'vaul'

export interface BottomSheetProps extends PropsWithChildren {
    snapPoints: string[]
    expended?: boolean
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
    children,
    snapPoints,

    expended = false,
}) => {
    const initialSnapPoint = expended
        ? (snapPoints.at(-1) as string)
        : snapPoints[0]

    const [activeSnapPoint, setSnap] = useState<number | string | null>(
        initialSnapPoint,
    )

    const expand = () => setSnap(snapPoints.at(-1) as string)

    const collapse = () => setSnap(snapPoints[0])

    return (
        <Drawer.Root
            open
            snapPoints={snapPoints}
            activeSnapPoint={activeSnapPoint}
            setActiveSnapPoint={setSnap}
            modal={false}
        >
            <Drawer.Portal>
                <Drawer.Content
                    className={`fixed inset-x-0 bottom-0 h-full bg-white`}
                    onMouseLeave={() => collapse()}
                    onMouseEnter={() => expand()}
                    // A hack to make the sheet collapse when an item is clicked
                    // TODO: Create a ref.current.collapse and do it outside the component
                    onClick={() => {
                        const isExpanded = activeSnapPoint === snapPoints.at(-1)

                        if (isExpanded) collapse()
                        else expand()
                    }}
                >
                    <Drawer.Title />
                    <Drawer.Description />

                    <Drawer.Handle className="mb-4 mt-2" />

                    {children}
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
