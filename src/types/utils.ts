export type ArrayItemType<T extends unknown[]> = T extends (infer U)[]
    ? U
    : never

export type NotEmptyArray<T> = [T, ...T[]]
