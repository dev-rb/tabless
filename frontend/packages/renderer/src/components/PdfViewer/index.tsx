import * as React from 'react';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { dialog } from 'electron';
// const electron = window.require('electron');
// const {shell} = window.require('electron');
// const remote = electron.remote
// const {dialog} = remote


const PdfViewer = () => {

    const [filePath, setFilePath] = React.useState("");
    const [isExpanded, setIsExpanded] = React.useState(false);

    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;

    return (
        <div className={`${isExpanded ? 'w-full' : 'w-0'} h-full max-w-4xl select-text pb-20 relative`}>
            <button className="absolute -left-2 m-auto top-0 bottom-0 w-8 h-32 bg-red-500 z-10 flex items-center justify-center" onClick={() => setIsExpanded((prev) => !prev)}>
                {isExpanded ?
                    <MdExpandLess size={80} transform={'rotate(90)'} /> :
                    <MdExpandMore size={80} transform={'rotate(90)'} />
                }
            </button>
            <>
                {isExpanded &&
                    <div className="w-full flex flex-row items-center bg-white">
                        <Toolbar>
                            {(props: ToolbarSlot) => <CustomPdfToolbar {...props} />}
                        </Toolbar>
                    </div>}
                <Viewer fileUrl={`app://getMediaFile/D:\\Desktop\\School\\Readings\\BrayGT.pdf`} plugins={[toolbarPluginInstance]} defaultScale={SpecialZoomLevel.PageFit} />
            </>

        </div>
    );
}

export default PdfViewer;

const CustomPdfToolbar = (props: ToolbarSlot, updateFilePath: (newFilePath: string) => void) => {
    const { CurrentPageInput, Download, GoToNextPage, GoToPreviousPage, Print, Zoom, ZoomIn, ZoomOut, Open } = props;
    return (
        <>
            <div style={{ padding: '0px 2px' }}>
                <ZoomOut />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <Zoom />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <ZoomIn />
            </div>
            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                <GoToPreviousPage />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <GoToNextPage />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <Download />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <Print />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <OpenFile updateFilePath={updateFilePath} />
            </div>
        </>
    );
}

interface CustomOpenProps {
    updateFilePath: (newFilePath: string) => void
}
declare global {
    interface Window {
        nodeCrypto: any
    }
}
const OpenFile = ({ updateFilePath }: CustomOpenProps) => {

    const openFileDialog = () => {
        // dialog.showOpenDialogSync({ properties: ['openFile'] })
        console.log(window.openFile.getFileOnSystem());
    }

    return (
        <button onClick={openFileDialog}>
            Open File
        </button>
    );
}