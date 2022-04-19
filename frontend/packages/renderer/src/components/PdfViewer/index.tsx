import * as React from 'react';
import { ScrollMode, SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { Loader } from '@mantine/core';

interface PdfViewerProps {
    fileLocation: string
}

const PdfViewer = ({ fileLocation }: PdfViewerProps) => {

    const [filePath, setFilePath] = React.useState(fileLocation);
    const [isExpanded, setIsExpanded] = React.useState(false);

    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;

    React.useEffect(() => {
        console.log("Created pdf view");

        return () => {
            console.log("Destroyed pdf view");
        }
    }, [])

    return (
        <div className={"w-full h-full select-text pb-20 relative transition-all ml-auto"}>
            {/* <button className="absolute -left-2 m-auto top-0 bottom-0 w-8 h-32 bg-red-500 z-10 flex items-center justify-center" onClick={() => setIsExpanded((prev) => !prev)}>
                {isExpanded ?
                    <MdExpandLess size={80} transform={'rotate(90)'} /> :
                    <MdExpandMore size={80} transform={'rotate(90)'} />
                }
            </button> */}
            <div className="h-full w-full">
                <div className="w-full flex flex-row items-center bg-[#A2A2A3]">
                    <Toolbar>
                        {(props: ToolbarSlot) => <CustomPdfToolbar {...props} updateFilePath={(str: string) => setFilePath(str)} />}
                    </Toolbar>
                </div>
                {filePath !== "" &&
                    <Viewer fileUrl={`app://getMediaFile/${fileLocation}`} onDocumentLoad={(e) => { console.log(e.doc) }} onZoom={(e) => console.log("Zoom: ", e)} plugins={[toolbarPluginInstance]} defaultScale={SpecialZoomLevel.PageWidth} />
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