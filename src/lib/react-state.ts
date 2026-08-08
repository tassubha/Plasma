import { Dispatch, SetStateAction } from "react";

type ReactState<T> = {
    value: T,
    set: Dispatch<SetStateAction<T>>,
}

export type {
    ReactState,
}