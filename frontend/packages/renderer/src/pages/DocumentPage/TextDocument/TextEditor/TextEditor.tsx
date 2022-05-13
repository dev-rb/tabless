import * as React from 'react';
import { DeltaStatic } from 'quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomEditorToolbar from './CustomEditorToolbar';

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
    updateText: (newVal: string) => void,
    text?: string
}

const TextEditor = ({ updateText, text = '' }: TextEditorProps) => {

    const [value, setValue] = React.useState(text);
    const editorRef = React.useRef<ReactQuill>(null);

    const getEditorText = (newVal: React.SetStateAction<string>, delta: DeltaStatic) => {
        const editor = editorRef.current;
        setValue(newVal);

        if (editor) {
            const text = editor.getEditor().getText();
            updateText(text);
        }
    }

    return (
        <div className="w-full h-full">
            <div className="border-b-2 border-toolbarBorderColor mt-4">
                <CustomEditorToolbar />
            </div>
            <ReactQuill
                ref={editorRef}
                className="placeholder-white border-none"
                value={value}
                placeholder={initialValue}
                onChange={(val: React.SetStateAction<string>, delta) => getEditorText(val, delta)}
                style={{ color: 'white', wordBreak: 'break-word' }}
                formats={formats}
                modules={modules}
            />
        </div>
    );
}

export default TextEditor;
