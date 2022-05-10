import NewFolderModal from '@/components/NewFolderModal';
import { useDeleteFolderMutation, useGetAllFoldersQuery, useNewFolderMutation } from '@/redux/api/folderEndpoints';
import { IFolder } from '@/types';
import { Drawer, Loader, Menu, MenuItem, UnstyledButton } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { MdArrowBack, MdCreateNewFolder, MdDelete, MdFolder, MdShortText } from 'react-icons/md';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import FolderContentPage from '../FolderContentPage';

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

interface IOutletContext {
    renameFolder: (folder: IFolder) => void
}

const FoldersHome = () => {

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const { data, isLoading, isFetching } = useGetAllFoldersQuery();

    const openDrawer = () => {
        setIsDrawerOpen((prev) => !prev);
    }

    return (
        <>
            <div className="w-full h-full grid grid-cols-[repeat(auto-fill,20rem)] gap-8 relative">

                {(isLoading || isFetching) ? <Loader /> : data && data.map((value) =>

                    <FolderItem key={value.id} folderInfo={value} openDrawer={openDrawer} />
                )
                }
                <Drawer
                    position='right'
                    size={'md'}
                    withinPortal={false}
                    withOverlay={false}
                    opened={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                >
                    <h1> Documents </h1>
                </Drawer>
            </div>
        </>
    );

}

FoldersPage.Content = FolderContentPage;
FoldersPage.Home = FoldersHome;

export default FoldersPage;

interface FolderItemProps {
    folderInfo: IFolder,
    openDrawer: () => void
}

const FolderItem = ({ folderInfo, openDrawer }: FolderItemProps) => {


    const navigate = useNavigate();
    const [deleteFolderMutation] = useDeleteFolderMutation();
    const { renameFolder } = useOutletContext<IOutletContext>();

    const deleteFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (folderInfo.id) {
            deleteFolderMutation(folderInfo.id);
        }
    }

    const openFolder = () => {
        openDrawer();
        // navigate(folderInfo.id);
    }

    return (
        <div
            className="w-full max-w-xs h-fit max-h-32 p-4 flex gap-4 cursor-pointer text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]"
            onClick={openFolder}
        >
            <MdFolder />
            <div className="w-full flex justify-between items-center">
                <h6> {folderInfo.name.toString()} </h6>
                <Menu
                    onClick={(e) => e.stopPropagation()}
                    styles={{ body: { backgroundColor: '#34343A', border: 'none' }, itemLabel: { color: 'white' }, item: { ':hover': { background: '#45454D' } } }}
                >
                    <MenuItem icon={<MdShortText color="white" size={20} />} onClick={() => renameFolder(folderInfo)}> Rename Folder </MenuItem>
                    <MenuItem icon={<MdDelete color="#F64646" size={20} />} onClick={deleteFolder}> Delete Folder </MenuItem>
                </Menu>
            </div>
        </div>
    );
}

{/* 

CONTEXT MENU

<Menu
opened={contextCoords !== null}
ref={ref}
control={<div style={{ display: 'none' }}> </div>}
withinPortal={false}
styles={{ body: { backgroundColor: '#34343A', border: 'none' }, itemLabel: { color: 'white' }, item: { ':hover': { background: '#45454D' } } }}
style={{ position: 'fixed', top: contextCoords?.y + 'px', left: contextCoords?.x + 'px' }}>
<MenuItem icon={<MdShortText color="white" size={20} />} onClick={renameFolder}> Rename Folder </MenuItem>
<MenuItem icon={<MdDelete color="#F64646" size={20} />} onClick={deleteFolder}> Delete Folder </MenuItem>
</Menu> */}