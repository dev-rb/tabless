import { useDebouncedValue } from "@mantine/hooks";
import { RefObject, useEffect, useState } from "react"

interface Props {
    inputRef: RefObject<HTMLInputElement>
    callback: VoidFunction,
}

export const useAutoSave = ({ callback, inputRef }: Props) => {
    const [currentValue, setCurrentValue] = useState(inputRef.current?.value);
    const [debounced, cancel] = useDebouncedValue(currentValue, 5000);

    const onInputChange = (newValue: string) => {
        setCurrentValue(newValue);
    }

    useEffect(() => {
        if (debounced === currentValue) {
            callback();
        }
    }, [debounced])

    return { onInputChange }

}