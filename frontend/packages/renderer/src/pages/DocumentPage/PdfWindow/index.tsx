import * as React from 'react';
import { IPdf } from '@/types';
import { ActionIcon, Button, createStyles, Tab, Tabs } from '@mantine/core';
import { nanoid } from 'nanoid';
import { MdClose, MdFilePresent } from 'react-icons/md';
import PdfViewer from './PdfViewer';

const useStyles = createStyles({
    root: { flex: 1 },
    tabsList: { gap: 0, borderBottom: '1px solid #343437' },
    tabControl: { ':hover:not(.mantine-Tabs-tabActive)': { borderRadius: 0, backgroundColor: '#3E315360 !important', color: '#A2A2A3' }, color: '#A2A2A3 !important' },
    tabActive: { borderRadius: 0, backgroundColor: '#3E3153 !important', color: 'white !important' },
    // tabLabel: { maxWidth: '15ch', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: 'fit-content' },
    body: { height: '100%' }
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
        <div className="flex flex-col h-full max-w-4xl w-full border-l-2 border-l-[#A2A2A3] pl-2">
            <OpenFile openPdf={openNewPdf} />
            {/* Tab System */}
            <div className="flex flex-row" >
                <Tabs variant='pills' tabPadding={"xl"} active={activeTab} onTabChange={onTabChange} classNames={classes}>
                    {currentPdfs ?
                        currentPdfs.map((val) =>
                            <Tab key={val.id} title={val.name} label={<TabControlLabel text={val.name} onClose={() => { }} />}>
                                <div className="w-full h-full max-h-[80vh]">
                                    <PdfViewer {...val} />
                                </div>
                            </Tab>
                        )
                        :
                        <Tab label="No PDFs open" className="!bg-transparent pointer-events-none">
                        </Tab>
                    }

                </Tabs>
            </div>
        </div>
    );
}

export default PdfWindow;

interface TabControlLabelProps {
    text: string,
    onClose: () => void
}

const TabControlLabel = ({ onClose, text }: TabControlLabelProps) => {
    return (
        <div className="flex items-center gap-2 text-white w-fit max-w-[10rem]">
            <h6 className="max-w-full whitespace-nowrap text-ellipsis overflow-hidden"> {text} </h6>
            <ActionIcon component='div' size={'xs'} styles={{ root: { ':hover': { background: '#54446E !important', color: 'white' }, color: '#6F5C8E' } }}>
                <MdClose />
            </ActionIcon>
        </div>
    );
}


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
        <Button className="bg-blue-600 min-h-fit mr-auto" leftIcon={<MdFilePresent size={20} />} onClick={openFileDialog}>
            Open File
        </Button>
    );
}