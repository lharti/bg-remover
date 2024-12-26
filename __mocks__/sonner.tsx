/* eslint-disable react-refresh/only-export-components */
export const toast = {
    promise: jest.fn(),
}

export const Toaster = jest.fn(({ position }) => (
    <div data-testid="toaster" data-position={position} />
))
