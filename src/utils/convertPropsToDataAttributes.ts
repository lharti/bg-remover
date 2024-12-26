type Props = Record<string, unknown>

export const convertPropsToDataAttributes = (props: Props): Props => {
    const dataAttributes: Props = {}

    for (const [key, value] of Object.entries(props)) {
        dataAttributes[`data-${key.toLowerCase()}`] = value
    }

    return dataAttributes
}
