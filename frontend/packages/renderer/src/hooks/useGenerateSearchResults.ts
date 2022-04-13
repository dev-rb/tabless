import { useProcessTextMutation } from "@/redux/api/searchEndpoints";
import { ISearchResult } from "@/types";
import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import { useState } from "react";

const MAX_CHAR_LIMIT = 800;
const MIN_CHAR_LIMIT = 200;

export const useGenerateSearchResults = (documentText: string) => {
    const [processText, { isLoading, error }] = useProcessTextMutation();
    const [debouncedText, cancel] = useDebouncedValue(documentText, 2500);
    const [results, setResults] = useState<ISearchResult[]>([]);

    const checkIfValid = () => {
        if (debouncedText.length < MIN_CHAR_LIMIT) {
            return;
        }

        if (debouncedText.length >= MAX_CHAR_LIMIT) {
            let textParts = [];
            const totalParts = Math.round(debouncedText.length / MAX_CHAR_LIMIT);

            let start = 0;
            let end = MAX_CHAR_LIMIT;
            for (let i = 0; i < totalParts; i++) {
                textParts.push(debouncedText.slice(start, end));

                if (start + MAX_CHAR_LIMIT > debouncedText.length) {
                    end = debouncedText.length;
                } else {
                    end = MAX_CHAR_LIMIT;
                }
                start += MAX_CHAR_LIMIT;
            }
            return textParts;
        }

        return debouncedText;
    }

    const handleTextChange = async () => {
        const valid = checkIfValid();
        if (typeof valid === 'string') {
            let res = await processText(valid).unwrap();
            setResults((prev) => prev.concat(res));
        } else if (valid !== undefined) {
            valid.forEach(async (val) => {
                let res = await processText(val).unwrap();
                setResults((prev) => prev.concat(res));
            });
        }
    }

    useDidUpdate(() => {
        if (debouncedText.length > 0) {
            handleTextChange();
        }
    }, [debouncedText])

    return { results, isLoading, error }
}