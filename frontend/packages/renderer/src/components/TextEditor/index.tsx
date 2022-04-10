import { NativeSelect, Select } from '@mantine/core';
import RichTextEditor from '@mantine/rte';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MdFormatAlignCenter, MdFormatAlignJustify, MdFormatAlignLeft, MdFormatAlignRight, MdFormatBold, MdFormatColorFill, MdFormatColorText, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdFormatStrikethrough, MdFormatUnderlined } from 'react-icons/md';
import ReactQuill, { Quill } from 'react-quill';
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

const icons = Quill.import('ui/icons');
icons['bold'] = ReactDOMServer.renderToStaticMarkup(<MdFormatBold size={20} />);
icons['italic'] = ReactDOMServer.renderToStaticMarkup(<MdFormatItalic size={20} />);
icons['underline'] = ReactDOMServer.renderToStaticMarkup(<MdFormatUnderlined size={20} />);
icons['strike'] = ReactDOMServer.renderToStaticMarkup(<MdFormatStrikethrough size={20} />);
icons['list'].bullet = ReactDOMServer.renderToStaticMarkup(<MdFormatListBulleted size={20} />);
icons['list'].ordered = ReactDOMServer.renderToStaticMarkup(<MdFormatListNumbered size={20} />);
icons['align'][""] = ReactDOMServer.renderToStaticMarkup(<MdFormatAlignLeft size={20} />);
icons['align'].center = ReactDOMServer.renderToStaticMarkup(<MdFormatAlignCenter size={20} />);
icons['align'].right = ReactDOMServer.renderToStaticMarkup(<MdFormatAlignRight size={20} />);
icons['align'].justify = ReactDOMServer.renderToStaticMarkup(<MdFormatAlignJustify size={20} />);
icons['color'] = ReactDOMServer.renderToStaticMarkup(<MdFormatColorText size={20} />);
icons['background'] = ReactDOMServer.renderToStaticMarkup(<MdFormatColorFill size={20} />);
// console.log(icons['align'])
const TextEditor = () => {

    const [value, setValue] = React.useState("");

    return (
        <div className="w-full h-full">
            <div className="border-b-2 border-toolbarBorderColor mt-4">
                <CustomEditorToolbar />
            </div>
            <ReactQuill
                className="placeholder-white border-none"
                value={value}
                placeholder={initialValue}
                onChange={(val: React.SetStateAction<string>) => setValue(val)}
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
        <div id="toolbar" className="!flex items-center gap-2 text-[#72747B] flex-wrap">
            <span className="ql-formats !flex gap-2 !mr-0">

                {/* <NativeSelect value={"Normal"} data={['Heading', 'Subheading', 'Normal']} styles={{root: {width: 'fit-content'}}} /> */}

                <select className="ql-header" defaultValue="3">
                    <option value="1">Heading</option>
                    <option value="2">Subheading</option>
                    <option value="3">Normal</option>
                </select>
            </span>

            <span className="toolbar-separator" />

            <span className="ql-formats !flex gap-2 !mr-0">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
            </span>
            <span className="toolbar-separator" />
            <span className="ql-formats !flex gap-2 justify-between !mr-0">
                <button className="ql-align" value="" />
                <button className="ql-align" value="center" />
                <button className="ql-align" value="right" />
                <button className="ql-align" value="justify" />
            </span>

            <span className="toolbar-separator" />
            <span className="ql-formats !flex gap-2 justify-between !mr-0">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />

            </span>
            <span className="toolbar-separator" />

            <span className="ql-formats !flex flex-row gap-2 !mr-0">
                <select className="ql-color" />
                <select className="ql-background" />
            </span>
            {/* <span className="toolbar-separator" /> */}
            {/*             
            <span className="ql-formats">
                <button className="ql-undo">
                    <CustomUndo />
                </button>
                <button className="ql-redo">
                    <CustomRedo />
                </button>
            </span> */}
        </div>
    );
}