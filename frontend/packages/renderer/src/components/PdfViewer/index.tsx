import * as React from 'react';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { dialog } from 'electron';
import { Loader } from '@mantine/core';
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
        <div className={`${isExpanded ? 'w-full' : 'w-0'} h-full max-w-4xl select-text pb-20 relative transition-all ml-auto`}>
            <button className="absolute -left-2 m-auto top-0 bottom-0 w-8 h-32 bg-red-500 z-10 flex items-center justify-center" onClick={() => setIsExpanded((prev) => !prev)}>
                {isExpanded ?
                    <MdExpandLess size={80} transform={'rotate(90)'} /> :
                    <MdExpandMore size={80} transform={'rotate(90)'} />
                }
            </button>
            {isExpanded &&
                <div className="h-full w-full">
                    {isExpanded &&
                        <div className="w-full flex flex-row items-center bg-white">
                            <Toolbar>
                                {(props: ToolbarSlot) => <CustomPdfToolbar {...props} updateFilePath={(str: string) => setFilePath(str)} />}
                            </Toolbar>
                        </div>}
                    {filePath !== "" && isExpanded
                        ?
                        <Viewer fileUrl={`app://getMediaFile/${filePath}`} plugins={[toolbarPluginInstance]} defaultScale={SpecialZoomLevel.PageFit} />
                        :
                        <div className="h-full w-full flex items-center justify-center flex-col gap-8">
                            <h1 className="text-white font-bold text-xl"> Open a file </h1>
                            <Loader />
                        </div>}
                </div>
            }
        </div>
    );
}

export default PdfViewer;

interface Props {
    updateFilePath: (newFilePath: string) => void
}

type AllProps = ToolbarSlot & Props;

const CustomPdfToolbar = (props: AllProps) => {
    const { CurrentPageInput, Download, GoToNextPage, GoToPreviousPage, Print, Zoom, ZoomIn, ZoomOut, Open, updateFilePath } = props;
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
            <div style={{ padding: '0px 20px' }}>
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
        openFile: any
    }
}
const OpenFile = ({ updateFilePath }: CustomOpenProps) => {

    const openFileDialog = async () => {
        // dialog.showOpenDialogSync({ properties: ['openFile'] })
        const result: string[] = await window.openFile.getFileOnSystem();
        console.log(result);

        if (result) {
            updateFilePath(result[0]);
        }
    }

    return (
        <button className="bg-blue-600 h-full" onClick={openFileDialog}>
            Open File
        </button>
    );
}