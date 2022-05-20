import { useProcessTextMutation } from "/@/redux/api/searchEndpoints";
import { IRootState } from "/@/redux/store";
import { ISearchResult } from "/@/types";
import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { diffWords, diffSentences, diffTrimmedLines } from "diff";
import Diff from "text-diff";
import { addTextToHistory } from "/@/redux/slices/historySlice";

const MAX_CHAR_LIMIT = 800;
const MIN_CHAR_LIMIT = 200;

export const useGenerateSearchResults = (documentText: string) => {
    const [processText, { isLoading, error }] = useProcessTextMutation();
    const [debouncedText, cancel] = useDebouncedValue(documentText, 2500);
    const [results, setResults] = useState<ISearchResult[]>([]);

    const texts = useSelector((state: IRootState) => state.history.texts);

    const dispatch = useDispatch();

    const shouldTextBeProcessed = (newText: string, historyText: string) => {
        console.log("Comparing the two following texts: ", newText, historyText)
        const diff = new Diff();
        var textDiff = diff.main(newText, historyText);
        console.log("Here are all the changes made! ", textDiff);
        console.log(diff.levenshtein(textDiff));

        // textDiff.forEach((val) => {
        //     if (val.added && val.count) {
        //         if (val.count > 35) {
        //             return true;
        //         }
        //     }
        // })

        return false;
    }

    const checkIfValid = () => {
        if (debouncedText.length < MIN_CHAR_LIMIT) {
            return;
        }
        console.log("Text is being checked")

        if (debouncedText.length >= MAX_CHAR_LIMIT) {
            let textParts = [];
            const totalParts = Math.round(debouncedText.length / MAX_CHAR_LIMIT);
            console.log("Text is larger than max char limit")
            let start = 0;
            let end = MAX_CHAR_LIMIT;
            for (let i = 0; i < totalParts; i++) {
                let textSlice = debouncedText.slice(start, end);
                let historyText = texts[JSON.stringify({ start, end })];
                console.log(texts)
                if (historyText) {
                    if (shouldTextBeProcessed(textSlice, historyText)) {
                        console.log("This text should be processed because thee are a lot of changes! ")
                        console.log(textSlice)
                        dispatch(addTextToHistory({ position: { start, end }, content: textSlice }));
                        textParts.push(textSlice);
                    } else {
                        console.log("This text should not be processed because there aren't enough changes! ")
                        console.log(textSlice)

                    }

                } else {
                    console.log("This text is not in the history and will be processed! ")
                    console.log(textSlice)
                    dispatch(addTextToHistory({ position: { start, end }, content: textSlice }));
                    textParts.push(textSlice);
                }


                if (start + MAX_CHAR_LIMIT >= debouncedText.length) {
                    end = debouncedText.length;
                } else {
                    end = MAX_CHAR_LIMIT;
                }
                start += MAX_CHAR_LIMIT;
            }
            return textParts;
        }

        let historyText = texts[JSON.stringify({ start: 0, end: MAX_CHAR_LIMIT })];
        console.log(texts)
        if (historyText) {
            if (shouldTextBeProcessed(debouncedText, historyText)) {
                console.log("This text should be processed! ", debouncedText)
                dispatch(addTextToHistory({ position: { start: 0, end: MAX_CHAR_LIMIT }, content: debouncedText }));
            } else {

                console.log("This text should not be processed! ", debouncedText)
            }
        } else {
            console.log("This text is not in the history and will be processed! ", debouncedText)
            dispatch(addTextToHistory({ position: { start: 0, end: MAX_CHAR_LIMIT }, content: debouncedText }));
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