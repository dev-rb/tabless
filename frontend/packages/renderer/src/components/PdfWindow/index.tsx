import { IPdf } from '@/types';
import { Button, createStyles, Tab, Tabs } from '@mantine/core';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { MdFilePresent, MdFileUpload } from 'react-icons/md';
import PdfViewer from '../PdfViewer';

const useStyles = createStyles({
    root: { flex: 1 },
    tabsList: { gap: 0 },
    tabControl: { ':hover:not(.mantine-Tabs-tabActive)': { borderRadius: 0, backgroundColor: '#3E315360 !important', color: '#A2A2A3' }, color: '#A2A2A3 !important' },
    tabActive: { borderRadius: 0, backgroundColor: '#3E3153 !important', color: 'white !important' },
    tabLabel: { maxWidth: '15ch', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    body: { maxHeight: '100%', overflow: 'hidden' }
})

interface PdfWindowProps {
    pdfs?: IPdf[]
}

const PdfWindow = ({ pdfs }: PdfWindowProps) => {

    const { classes } = useStyles();

    const [currentPdfs, setCurrentPdfs] = React.useState<IPdf[] | undefined>(pdfs);
    const [activePdf, setActivePdf] = React.useState<IPdf | undefined>();
    const [activeTab, setActiveTab] = React.useState(0);

    const onTabChange = (active: number) => {
        setActiveTab(active);

        if (currentPdfs) {
            setActivePdf(currentPdfs[active]);
        }
    }

    const openNewPdf = (newPdfLocation: string, newPdfName: string) => {
        const newPdf: IPdf = { id: nanoid(), location: newPdfLocation, name: newPdfName };
        setCurrentPdfs((prev) => [...prev || [], newPdf]);
        setActivePdf(newPdf);
        setActiveTab(currentPdfs ? currentPdfs.length : 0);
    }

    return (
        <div className="flex flex-col h-full max-w-4xl w-full">
            {/* Tab System */}
            <div className="flex flex-row border-b-[1px] border-b-[#343437] " >
                <Tabs variant='pills' tabPadding={"xl"} active={activeTab} onTabChange={onTabChange} classNames={classes}>
                    {currentPdfs ?
                        currentPdfs.map((val) =>
                            <Tab key={val.id} title={val.name} label={val.name}>
                                <div className="w-full h-full max-h-screen overflow-auto">
                                    <PdfViewer fileLocation={val.location} />
                                </div>
                            </Tab>
                        )
                        :
                        <Tab label="No PDFs open" className="!bg-transparent pointer-events-none">
                        </Tab>
                    }
                    <OpenFile openPdf={openNewPdf} />
                </Tabs>
            </div>

            {/* Pdf Viewer */}
            {/* {
                activePdf ?
                    <PdfViewer fileLocation={activePdf.location} /> :
                    <div className="flex w-full h-full items-center justify-center">
                        <OpenFile openPdf={openNewPdf} />
                    </div>
            } */}
        </div>
    );
}

export default PdfWindow;


interface CustomOpenProps {
    openPdf: (pdfFilePath: string, pdfFileName: string) => void
}

const OpenFile = ({ openPdf }: CustomOpenProps) => {

    const openFileDialog = async () => {
        // dialog.showOpenDialogSync({ properties: ['openFile'] })
        const result: { path: string; name: string; }[] = await window.openFile.getFileOnSystem();
        console.log(result);

        if (result) {
            openPdf(result[0].path, result[0].name);
        }
    }

    return (
        <Button className="bg-blue-600 ml-auto" leftIcon={<MdFilePresent size={20} />} onClick={openFileDialog}>
            Open File
        </Button>
    );
}