import * as React from 'react';
import NewFolderModal from '@/pages/FoldersPage/NewFolderModal';
import { IFolder } from '@/types';
import { Box, Button, Group, UnstyledButton } from '@mantine/core';
import { MdArrowBack, MdCreateNewFolder } from 'react-icons/md';
import { Outlet, useNavigate } from 'react-router-dom';
import FoldersHome from './FoldersHome';
import FolderContentPage from './FoldersContent';

const FoldersPage = () => {

    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
    const [focusedFolder, setFocusedFolder] = React.useState<IFolder | null>(null);


    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const openFolderModal = () => {
        setIsCreateModalOpen(true);
    }

    const renameFolder = (folder: IFolder) => {
        setFocusedFolder(folder);
        setIsRenameModalOpen(true);
    }

    return (
        <Group direction='column' noWrap sx={{ width: '100%', height: '100%' }}>
            <NewFolderModal isOpen={isCreateModalOpen} closeModal={() => setIsCreateModalOpen(false)} type='create' />
            <NewFolderModal isOpen={isRenameModalOpen} closeModal={() => setIsRenameModalOpen(false)} currentName={focusedFolder?.name} folderId={focusedFolder?.id} type={'rename'} />
            <Group position='apart' align={'center'} sx={{ width: '100%', height: '4rem' }}>
                <UnstyledButton sx={{ backgroundColor: '#38383f', color: '#646470', padding: '0.5rem', borderRadius: '0.375rem', ':hover': { backgroundColor: '#3071E8', color: 'white' } }} onClick={goBack}>
                    <MdArrowBack size={30} />
                </UnstyledButton>

                <Button variant='filled' leftIcon={<MdCreateNewFolder size={25} />} onClick={openFolderModal}>
                    New Folder
                </Button>
            </Group>

            <Box sx={{ marginTop: '1.5rem', position: 'relative', width: '100%', height: '100%' }}>
                <Outlet context={{ renameFolder }} />
            </Box>
        </Group>
    );
}

FoldersPage.Content = FolderContentPage;
FoldersPage.Home = FoldersHome;

export default FoldersPage;