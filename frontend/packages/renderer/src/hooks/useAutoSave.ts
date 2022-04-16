import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import { RefObject, useEffect, useState } from "react"

interface Props {
    callback: VoidFunction,
}

export const useAutoSave = ({ callback }: Props) => {
    const [currentValue, setCurrentValue] = useState('');
    const [debounced, cancel] = useDebouncedValue(currentValue, 5000);

    const onInputChange = (newValue: string) => {
        setCurrentValue(newValue);
    }

    useDidUpdate(() => {
        if (debounced === currentValue) {
            console.log("Callback called")
            callback();
        }
    }, [debounced])

    return { onInputChange }

}