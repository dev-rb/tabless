import * as React from 'react';
import { DeltaStatic } from 'quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomEditorToolbar from './CustomEditorToolbar';
import { Box } from '@mantine/core';

const initialValue = "Start Typing...";
const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "background",
    "list",
    "bullet",
    "color",
];

const modules = {
    toolbar: {
        container: "#toolbar",
        // handlers: {
        //     undo: undoChange,
        //     redo: redoChange
        // }
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
};

interface TextEditorProps {
    updateText: (raw: string, newVal: string) => void,
    text?: string
}

export const TextEditor = ({ updateText, text = '' }: TextEditorProps) => {

    const [value, setValue] = React.useState(text);
    const editorRef = React.useRef<ReactQuill>(null);

    const getEditorText = (newVal: React.SetStateAction<string>, delta: DeltaStatic) => {
        const editor = editorRef.current;
        setValue(newVal);

        if (editor) {
            // console.log(editor.getEditorContents().toString());
            const text = editor.getEditorContents().toString();
            updateText(text, editor.getEditor().getText());
        }
    }

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ borderBottom: '2px solid #CFCFCF', marginTop: '1rem' }}>
                <CustomEditorToolbar />
            </Box>
            <ReactQuill
                ref={editorRef}
                value={value}
                placeholder={initialValue}
                onChange={(val: React.SetStateAction<string>, delta) => getEditorText(val, delta)}
                style={{ color: 'white', wordBreak: 'break-word', height: '70vh' }}
                formats={formats}
                modules={modules}
            />
        </Box>
    );
}