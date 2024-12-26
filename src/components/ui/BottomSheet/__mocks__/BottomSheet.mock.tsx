import { BottomSheetProps } from '@/components/ui/BottomSheet'
import { convertPropsToDataAttributes } from '@/utils/convertPropsToDataAttributes'

export const BottomSheet = jest.fn(
    ({ children, ...otherProps }: BottomSheetProps) => {
        const dataAttributes = convertPropsToDataAttributes(otherProps)

        return <div {...dataAttributes}>{children}</div>
    },
)
