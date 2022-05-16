import * as React from 'react';
import { IPdf } from '@/types';
import { ActionIcon, Box, Button, createStyles, Group, Stack, Tab, Tabs, Title } from '@mantine/core';
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
        <Stack sx={{ maxWidth: '56rem', width: '100%', height: '100%', paddingLeft: '0.5rem' }}>
            <OpenFile openPdf={openNewPdf} />
            {/* Tab System */}
            <Group noWrap sx={{ width: '100%' }} grow>
                <Tabs variant='pills' tabPadding={"xl"} active={activeTab} onTabChange={onTabChange} classNames={classes}>
                    {currentPdfs ?
                        currentPdfs.map((val) =>
                            <Tab key={val.id} title={val.name} label={<TabControlLabel text={val.name} onClose={() => { }} />}>
                                <Box sx={{ width: '100%', height: '100%', maxHeight: '80vh' }}>
                                    <PdfViewer {...val} />
                                </Box>
                            </Tab>
                        )
                        :
                        <Tab label="No PDFs open" className="!bg-transparent pointer-events-none">
                        </Tab>
                    }

                </Tabs>
            </Group>
        </Stack>
    );
}

export default PdfWindow;

interface TabControlLabelProps {
    text: string,
    onClose: () => void
}

const TabControlLabel = ({ onClose, text }: TabControlLabelProps) => {
    return (
        <Group align='center' sx={{ gap: '0.5rem', color: 'white', width: 'fit-content', maxWidth: '10rem' }} noWrap>
            <Title order={6} sx={{ maxWidth: '100%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}> {text} </Title>
            <ActionIcon component='div' size={'xs'} styles={{ root: { ':hover': { background: '#54446E !important', color: 'white' }, color: '#6F5C8E' } }}>
                <MdClose />
            </ActionIcon>
        </Group>
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
        <Button variant='filled' leftIcon={<MdFilePresent size={20} />} onClick={openFileDialog} sx={{ minHeight: 'fit-content', marginRight: 'auto' }}>
            Open File
        </Button>
    );
}