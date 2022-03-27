import { NativeSelect, Select } from '@mantine/core';
import RichTextEditor from '@mantine/rte';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

const TextEditor = () => {

    const [value, setValue] = React.useState("");

    return (
        <div className="w-full h-full">
            <div className="border-b-2 border-[#CFCFCF] mt-4">
                <CustomEditorToolbar/>
            </div>
            <ReactQuill 
            className="placeholder-white border-none" 
            value={value} 
            placeholder={initialValue} 
            onChange={(val) => setValue(val)} 
            style={{ color: 'white' }}
            formats={formats}
            modules={modules}
            />
        </div>
    );
}

export default TextEditor;

const CustomEditorToolbar = () => {
    return (
        <div id="toolbar">
            <span className="ql-formats">
                
                {/* <NativeSelect className="ql-header" data={['Heading', 'Subheading', 'Normal']} defaultValue={"3"}>
                    
                </NativeSelect> */}
                <select className="ql-header" defaultValue="3">
                    <option value="1">Heading</option>
                    <option value="2">Subheading</option>
                    <option value="3">Normal</option>
                </select>
            </span>
            <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <select className="ql-align" />
            </span>
            
            <span className="ql-formats">
                <select className="ql-color" />
                <select className="ql-background" />
            </span>
            
            <span className="ql-formats">
                <button className="ql-undo">
                    {/* <CustomUndo /> */}
                </button>
                <button className="ql-redo">
                    {/* <CustomRedo /> */}
                </button>
            </span>
        </div>
    );
}