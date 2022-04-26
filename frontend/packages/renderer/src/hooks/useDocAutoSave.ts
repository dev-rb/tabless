import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import { RefObject, useEffect, useState } from "react"

interface Props {
    updateDocument: (field: string, newValue: string) => void
}

type InputTypes = 'text' | 'author' | 'title';

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