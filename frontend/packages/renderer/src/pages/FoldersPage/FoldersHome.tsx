import * as React from 'react';
import { useGetAllFoldersQuery } from "/@/redux/api/folderEndpoints";
import { Loader, Drawer, Divider, Grid, Group, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { DocumentDisplayItem, DocumentItemMenu } from '/@/components/DocumentDisplayItem';
import FolderDisplayItem from '/@/components/FolderDisplayItem';
import { IDocument, ITextDocument } from '/@/types';

const FoldersHome = () => {

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const { data, isLoading, isFetching } = useGetAllFoldersQuery();

    const [selectedFolder, setSelectedFolder] = React.useState('');

    const documentsInFolder = data?.find((val) => val.id === selectedFolder)?.documents;
    const selectedFolderName = data?.find((val) => val.id === selectedFolder)?.name;

    const navigate = useNavigate();

    const openDocument = (documentId: string) => {
        navigate(`/document/${documentId}`);
    }

    const openDrawer = (folderId: string) => {
        setIsDrawerOpen(true);
        setSelectedFolder(folderId);
    }

    return (
        <>
            <Grid gutter={32} columns={4} sx={{ width: '100%', height: '100%', position: 'relative' }} className="w-full h-full grid grid-cols-[repeat(auto-fill,20rem)] gap-8 relative">

                {(isLoading || isFetching) ? <Loader /> : data && data.map((value) =>

                    <Grid.Col key={value.id} span={1}>
                        <FolderDisplayItem folderInfo={value} openDrawer={() => openDrawer(value.id)} closeDrawer={() => { setIsDrawerOpen(false); setSelectedFolder(''); }} />
                    </Grid.Col>
                )
                }
                <Drawer
                    styles={{
                        drawer: {
                            marginTop: '2rem',
                            background: '#1D1D20',
                            borderLeft: '1px solid #A2A2A3',
                            padding: '4rem 1rem 2rem 1rem !important',
                        }
                    }}
                    position='right'
                    size={'md'}
                    withCloseButton
                    withinPortal={false}
                    withOverlay={false}
                    opened={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                >
                    <Title order={1} sx={{ color: 'white' }}> {selectedFolderName} </Title>
                    <Divider sx={{ marginTop: '0.5rem' }} />
                    <Group direction='column' sx={{ marginTop: '2rem' }} className="mt-8 flex flex-col">
                        {documentsInFolder?.length
                            ?
                            documentsInFolder.map((val: IDocument | ITextDocument) =>
                                <DocumentDisplayItem key={val.id} documentDetails={val} onClick={() => openDocument(val.id)} />)
                            : <Title order={4} sx={{ color: '#6A6A6A' }}> No documents </Title>}
                    </Group>
                </Drawer>
            </Grid>
        </>
    );

}

export default FoldersHome;
