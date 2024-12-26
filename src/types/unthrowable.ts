export type UnthrowablePromise<Result, Err extends Error> = Promise<{
    result?: Result
    error?: Err
}>

export type Unthrowable<Result, Err extends Error> = {
    result?: Result
    error?: Err
}
