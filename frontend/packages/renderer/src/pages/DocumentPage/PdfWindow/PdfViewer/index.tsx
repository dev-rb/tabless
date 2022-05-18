import * as React from 'react';
import { LoadError, PageChangeEvent, SpecialZoomLevel, Viewer, ZoomEvent } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { IPdf } from '@/types';
import { Box, Group } from '@mantine/core';
import { useUpdatePdfMutation } from '@/redux/api/pdfEndpoints';
import { useInterval } from '@mantine/hooks';

interface PdfViewerProps extends IPdf {
    updatePdfPage: (pdfId: string, newPage: number) => void
}

const PdfViewer = ({ id, location, name, initialPage, updatePdfPage }: PdfViewerProps) => {

    const [filePath, setFilePath] = React.useState(location);
    const [currentPage, setCurrentPage] = React.useState(initialPage);
    const [currentZoom, setCurrentZoom] = React.useState(0.5);

    const [updatePdf] = useUpdatePdfMutation();
    // const interval = useInterval(() => updatePdf({ id, location, name, initialPage: currentPage }), 25000);

    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;

    const handlePageChange = (e: PageChangeEvent) => {
        setCurrentPage(e.currentPage);
        updatePdfPage(id, e.currentPage);
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

    React.useEffect(() => {
        const timer = setTimeout(() => {
            updatePdf({ id, location, name, initialPage: currentPage })
        }, 10000);

        return () => {
            clearTimeout(timer);
        }
    }, [currentPage])

    return (
        <Box sx={{ width: '100%', height: '100%', userSelect: 'text', position: 'relative', transition: 'all', marginLeft: 'auto' }}>

            <Box sx={{ width: '100%', height: '80vh', paddingBottom: '2rem' }}>
                <Group align='center' sx={{ backgroundColor: '#A2A2A3', width: '100%', gap: 0 }} noWrap>
                    <Toolbar>
                        {(props: ToolbarSlot) => <CustomPdfToolbar {...props} updateFilePath={(str: string) => setFilePath(str)} />}
                    </Toolbar>
                </Group>
                {filePath !== "" &&
                    <Viewer
                        fileUrl={`app://getMediaFile/${location}`}
                        onDocumentLoad={(e) => { console.log(e.doc) }}
                        onPageChange={handlePageChange}
                        onZoom={handleZoomChange}
                        plugins={[toolbarPluginInstance]}
                        initialPage={currentPage}
                        defaultScale={SpecialZoomLevel.PageWidth}
                        renderError={renderError}
                    />
                    // :
                    // <div className="h-full w-full flex items-center justify-center flex-col gap-8">
                    //     <h1 className="text-white font-bold text-xl"> Open a file </h1>
                    //     <Loader />
                    // </div>
                }
            </Box>
        </Box>
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


const renderError = (error: LoadError) => {
    let message = '';
    switch (error.name) {
        case 'InvalidPDFException':
            message = 'The document is invalid or corrupted';
            break;
        case 'MissingPDFException':
            message = 'The document is missing';
            break;
        case 'UnexpectedResponseException':
            message = 'Unexpected server response. \n The file may be missing.';
            break;
        default:
            message = 'Cannot load the document';
            break;
    }

    return (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    backgroundColor: '#e53e3e',
                    borderRadius: '0.25rem',
                    color: '#fff',
                    padding: '0.5rem',
                }}
            >
                {message}
            </div>
        </div>
    );
};

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