import * as React from 'react';
import { PageChangeEvent, SpecialZoomLevel, Viewer, ZoomEvent } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { IPdf } from '@/types';

interface PdfViewerProps extends IPdf {
    isVisible: boolean,
}

const PdfViewer = ({ location, initialPage }: IPdf) => {

    const [filePath, setFilePath] = React.useState(location);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [currentZoom, setCurrentZoom] = React.useState(0.5);

    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;

    const handlePageChange = (e: PageChangeEvent) => {
        setCurrentPage(e.currentPage);
        // e.doc.getPage(1).then((val) => console.log(val.getTextContent().then((val) => console.log(val))))
    }

    const handleZoomChange = (e: ZoomEvent) => {
        setCurrentZoom(e.scale);
    }

    React.useEffect(() => {
        console.log("Created pdf view");

        return () => {
            console.log("Destroyed pdf view");
        }
    }, [])

    return (
        <div className={"w-full h-full select-text pb-20 relative transition-all ml-auto"}>

            <div className="h-full w-full">
                <div className="w-full flex flex-row items-center bg-[#A2A2A3]">
                    <Toolbar>
                        {(props: ToolbarSlot) => <CustomPdfToolbar {...props} updateFilePath={(str: string) => setFilePath(str)} />}
                    </Toolbar>
                </div>
                {filePath !== "" &&
                    <Viewer
                        fileUrl={`app://getMediaFile/${location}`}
                        onDocumentLoad={(e) => { console.log(e.doc) }}
                        onPageChange={handlePageChange}
                        onZoom={handleZoomChange}
                        plugins={[toolbarPluginInstance]}
                        initialPage={initialPage}
                        defaultScale={SpecialZoomLevel.PageWidth} />
                    // :
                    // <div className="h-full w-full flex items-center justify-center flex-col gap-8">
                    //     <h1 className="text-white font-bold text-xl"> Open a file </h1>
                    //     <Loader />
                    // </div>
                }
            </div>
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