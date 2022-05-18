import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import { RefObject, useEffect, useState } from "react"

export type InputTypes = 'text' | 'author' | 'title';

interface Props {
    updateDocument: (field: InputTypes, newValue: string) => void
}

export const useDocAutoSave = ({ updateDocument }: Props) => {
    const [inputType, setInputType] = useState<InputTypes>('text');
    const [currentValue, setCurrentValue] = useState('');
    const [debounced, cancel] = useDebouncedValue(currentValue, 5000);

    const onInputChange = (newValue: string, type: InputTypes) => {
        setInputType(type);
        setCurrentValue(newValue);
    }

    useDidUpdate(() => {
        if (debounced === currentValue) {
            console.log("updateDocument called")
            updateDocument(inputType, currentValue);
        }
    }, [debounced])

    return { onInputChange }

}