import { Group } from '@mantine/core';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MdFormatAlignCenter, MdFormatAlignJustify, MdFormatAlignLeft, MdFormatAlignRight, MdFormatBold, MdFormatColorFill, MdFormatColorText, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdFormatStrikethrough, MdFormatUnderlined } from 'react-icons/md';
import { Quill } from 'react-quill';

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

const CustomEditorToolbar = () => {
    return (
        <Group id="toolbar" align="center" sx={{ gap: '0.5rem', color: '#72747B' }} noWrap={false} >
            <Group className="ql-formats" sx={{ marginRight: '0 !important', gap: '0.5rem', display: 'flex !important' }}>

                {/* <NativeSelect value={"Normal"} data={['Heading', 'Subheading', 'Normal']} styles={{root: {width: 'fit-content'}}} /> */}

                <select className="ql-header" defaultValue="3">
                    <option value="1">Heading</option>
                    <option value="2">Subheading</option>
                    <option value="3">Normal</option>
                </select>
            </Group>

            <span className="toolbar-separator" />

            <Group className="ql-formats" sx={{ marginRight: '0 !important', gap: '0.5rem', display: 'flex !important' }}>
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
            </Group>
            <span className="toolbar-separator" />
            <Group className="ql-formats" position='apart' sx={{ marginRight: '0 !important', gap: '0.5rem', display: 'flex !important' }}>
                <button className="ql-align" value="" />
                <button className="ql-align" value="center" />
                <button className="ql-align" value="right" />
                <button className="ql-align" value="justify" />
            </Group>

            <span className="toolbar-separator" />
            <Group className="ql-formats" position='apart' sx={{ marginRight: '0 !important', gap: '0.5rem', display: 'flex !important' }}>
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />

            </Group>
            <span className="toolbar-separator" />

            <Group className="ql-formats" sx={{ marginRight: '0 !important', gap: '0.5rem', display: 'flex !important' }}>
                <select className="ql-color" />
                <select className="ql-background" />
            </Group>
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
        </Group>
    );
}

export default CustomEditorToolbar;