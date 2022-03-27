import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';


const PdfViewer = () => {

    const [filePath, setFilePath] = React.useState("");
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;

    return (
        <div className="w-full h-full max-w-4xl select-text pb-20">
            <div className="w-full flex flex-row items-center bg-white" >
            <Toolbar>
                {(props: ToolbarSlot) => <CustomPdfToolbar {...props} />}
            </Toolbar>
            </div>
            <Viewer fileUrl={`app://getMediaFile/D:\\Desktop\\School\\Readings\\BrayGT.pdf`} plugins={[toolbarPluginInstance]} />
        </div>
    );
}

export default PdfViewer;

const CustomPdfToolbar = (props: ToolbarSlot) => {
    const { CurrentPageInput, Download, GoToNextPage, GoToPreviousPage, Print, Zoom, ZoomIn, ZoomOut } = props;
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
        </>
    );
}