import * as React from 'react';
import { useGetAllFoldersQuery } from "@/redux/api/folderEndpoints";
import { Loader, Drawer, Divider } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { DocumentDisplayItem, DocumentItemMenu } from '@/components/DocumentDisplayItem';
import FolderDisplayItem from '@/components/FolderDisplayItem';

const FoldersHome = () => {

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const { data, isLoading, isFetching } = useGetAllFoldersQuery();

    const [selectedFolder, setSelectedFolder] = React.useState('');

    const documentsInFolder = data?.find((val) => val.id === selectedFolder)?.documents;
    const selectedFolderName = data?.find((val) => val.id === selectedFolder)?.name;

    const navigate = useNavigate();

    const openDocument = (documentId: string) => {
        navigate(`documents/${documentId}`);
    }

    const openDrawer = (folderId: string) => {
        setIsDrawerOpen(true);
        setSelectedFolder(folderId);
    }

    return (
        <>
            <div className="w-full h-full grid grid-cols-[repeat(auto-fill,20rem)] gap-8 relative">

                {(isLoading || isFetching) ? <Loader /> : data && data.map((value) =>

                    <FolderDisplayItem key={value.id} folderInfo={value} openDrawer={() => openDrawer(value.id)} />
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
                    <h1 className="text-white text-2xl"> {selectedFolderName} </h1>
                    <Divider className="mt-2" />
                    <div className="mt-8 flex flex-col">
                        {documentsInFolder
                            ?
                            documentsInFolder.map((val) =>
                                <DocumentDisplayItem key={val.id} documentDetails={val} rightSection={<DocumentItemMenu />} onClick={() => openDocument(val.id)} />)
                            : <h1 className="text-[#6A6A6A] text-2xl"> No documents </h1>}
                    </div>
                </Drawer>
            </div>
        </>
    );

}

export default FoldersHome;
