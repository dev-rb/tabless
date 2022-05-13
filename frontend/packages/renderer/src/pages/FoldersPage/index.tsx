import * as React from 'react';
import NewFolderModal from '@/pages/FoldersPage/NewFolderModal';
import { IFolder } from '@/types';
import { UnstyledButton } from '@mantine/core';
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
        <div className="w-full h-full flex flex-col">
            <NewFolderModal isOpen={isCreateModalOpen} closeModal={() => setIsCreateModalOpen(false)} type='create' />
            <NewFolderModal isOpen={isRenameModalOpen} closeModal={() => setIsRenameModalOpen(false)} currentName={focusedFolder?.name} folderId={focusedFolder?.id} type={'rename'} />
            <div className="w-full h-16 flex items-center justify-between">
                <UnstyledButton className="text-[#646470] bg-[#38383f] p-2 rounded-md hover:bg-[#3071E8] hover:text-white" onClick={goBack}>
                    <MdArrowBack size={30} />
                </UnstyledButton>

                <UnstyledButton className="text-white bg-[#3071E8] py-2 px-4 rounded-base flex gap-4 items-center hover:bg-[#4485ff]" onClick={openFolderModal}>
                    <MdCreateNewFolder size={25} />
                    New Folder
                </UnstyledButton>
            </div>

            <div className="mt-6 relative">
                <Outlet context={{ renameFolder }} />
            </div>
        </div>
    );
}

FoldersPage.Content = FolderContentPage;
FoldersPage.Home = FoldersHome;

export default FoldersPage;