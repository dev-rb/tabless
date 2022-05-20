import * as React from 'react';
import { IPdf } from '/@/types';
import { ActionIcon, Box, Button, createStyles, Group, Stack, Tab, Tabs, Title, Text, Sx, UnstyledButton } from '@mantine/core';
import { nanoid } from 'nanoid';
import { MdClose, MdFilePresent, MdAdd } from 'react-icons/md';
import PdfViewer from './PdfViewer';
import { IRootState } from '/@/redux/store';
import { useSelector } from 'react-redux';
import { useDeletePdfMutation, useNewPdfMutation, useUpdatePdfMutation } from '/@/redux/api/pdfEndpoints';
import { useParams } from 'react-router-dom';
import ResizeableSection from '/@/components/ResizableSection';

const useStyles = createStyles({
    root: { flex: 1, height: '100%' },
    tabsList: { gap: 0, borderBottom: '1px solid #343437' },
    tabControl: { ':hover:not(.mantine-Tabs-tabActive)': { borderRadius: 0, backgroundColor: '#3E315360 !important', color: '#A2A2A3' }, color: '#A2A2A3 !important' },
    tabActive: { borderRadius: 0, backgroundColor: '#3E3153 !important', color: 'white !important' },
    tabLabel: { height: '100%' },
    body: { height: '100%' }
})

interface PdfWindowProps {
    pdfs?: IPdf[]
}

const PdfWindow = ({ pdfs }: PdfWindowProps) => {

    const { classes } = useStyles();
    const { documentId } = useParams();

    const [currentPdfs, setCurrentPdfs] = React.useState<IPdf[] | undefined>(pdfs);
    const [activePdf, setActivePdf] = React.useState<IPdf | undefined>();
    const [activeTab, setActiveTab] = React.useState(0);
    const isPDFViewerOpen = useSelector((state: IRootState) => state.settings.isPDFViewerOpen);

    const [createNewPdf] = useNewPdfMutation();
    const [deletePdf] = useDeletePdfMutation();

    const onTabChange = (active: number) => {
        setActiveTab(active);

        if (currentPdfs) {
            setActivePdf(currentPdfs[active]);
        }
    }

    const openNewPdf = (newPdfLocation: string, newPdfName: string) => {
        const newPdf: IPdf = { id: nanoid(), location: newPdfLocation, name: newPdfName };

        if (documentId) {
            createNewPdf({ documentId, pdfInfo: newPdf });
        }

        setCurrentPdfs((prev) => [...prev || [], newPdf]);
        setActivePdf(newPdf);
        setActiveTab(currentPdfs ? currentPdfs.length : 0);
    }

    const closeTab = (pdfId: string) => {
        if (currentPdfs) {
            let copy = [...currentPdfs];
            copy = copy.filter((val) => val.id !== pdfId);
            setCurrentPdfs([...copy]);
            deletePdf(pdfId);
        }
    }

    const updatePdfInitialPage = (pdfId: string, newPage: number) => {
        if (currentPdfs) {
            let copy = [...currentPdfs];
            copy = copy.map((val) => {
                let valCopy = { ...val };
                if (valCopy.id === pdfId) {
                    valCopy.initialPage = newPage;
                }
                return valCopy;
            });

            setCurrentPdfs([...copy]);
        }
    }

    React.useEffect(() => {
        // console.log(`PDFs props: `, pdfs)

        if (pdfs) {
            setCurrentPdfs([...pdfs]);
        }
    }, [pdfs])

    return (
        <Stack sx={{ maxWidth: '56rem', width: '100%', height: '100%', paddingLeft: '0.5rem', paddingTop: '2rem', display: isPDFViewerOpen ? 'flex' : 'none' }}>
            {/* Tab System */}
            <Group noWrap sx={{ width: '100%', height: '100%' }} grow align={'start'}>
                <Tabs variant='pills' tabPadding={"xl"} active={activeTab} onTabChange={onTabChange} classNames={classes}>
                    {currentPdfs && currentPdfs.length ?
                        currentPdfs.map((val) =>
                            <Tab key={val.id} title={val.name} label={<TabControlLabel text={val.name} onClose={() => closeTab(val.id)} />}>
                                <Box sx={{ width: '100%', height: '100%', maxHeight: '80vh' }}>
                                    <PdfViewer {...val} updatePdfPage={updatePdfInitialPage} />
                                </Box>
                            </Tab>
                        )
                        :
                        <Tab label="No PDFs open">
                            <Group direction='column' align={'center'} position={'center'} sx={{ height: '100%', justifyContent: 'center' }}>
                                <Stack align={'center'} spacing={2} >
                                    <Title sx={{ color: 'white' }}> No PDF Open </Title>
                                    <Text sx={{ color: 'gray' }}> Open a pdf using the button below </Text>
                                    <OpenFile openPdf={openNewPdf} otherSx={{ marginTop: '2rem' }} />
                                </Stack>
                            </Group>
                        </Tab>
                    }
                    <OpenFile openPdf={openNewPdf} otherSx={{ padding: 0, width: 36, backgroundColor: '#2A2A2E', borderRadius: 0, marginLeft: '0.5rem', ':hover': { backgroundColor: '#3F3F46' } }} iconOnly />
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
            <ActionIcon component='div' size={'xs'} styles={{ root: { ':hover': { background: '#54446E !important', color: 'white' }, color: '#6F5C8E' } }} onClick={onClose}>
                <MdClose />
            </ActionIcon>
        </Group>
    );
}


interface CustomOpenProps {
    openPdf: (pdfFilePath: string, pdfFileName: string) => void,
    iconOnly?: boolean
    otherSx?: Sx
}

const OpenFile = ({ openPdf, otherSx, iconOnly }: CustomOpenProps) => {

    const openFileDialog = async () => {
        // dialog.showOpenDialogSync({ properties: ['openFile'] })
        const result: { path: string; name: string; }[] = await window.openFile.getFileOnSystem();
        console.log(result);

        if (result) {
            openPdf(result[0].path, result[0].name);
        }
    }

    return (
        <>
            {iconOnly ?
                <Button variant='filled' onClick={openFileDialog} sx={{ minHeight: 'fit-content', ...otherSx }}>
                    <MdAdd size={20} />
                </Button> :
                <Button variant='outline' leftIcon={<MdFilePresent size={20} />} onClick={openFileDialog} sx={{ minHeight: 'fit-content', ...otherSx }}>
                    Open a PDF
                </Button>}
        </>
    );
}