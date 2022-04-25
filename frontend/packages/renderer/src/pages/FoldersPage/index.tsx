import NewFolderModal from '@/components/NewFolderModal';
import { useGetAllFoldersQuery, useNewFolderMutation } from '@/redux/api/folderEndpoints';
import { IFolder } from '@/types';
import { Loader, UnstyledButton } from '@mantine/core';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { MdArrowBack, MdCreateNewFolder, MdFolder } from 'react-icons/md';
import { Outlet, useNavigate } from 'react-router-dom';
import FolderContentPage from '../FolderContentPage';

const FoldersPage = () => {

    const [isFolderModalOpen, setIsFolderModalOpen] = React.useState(false);


    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const createNewFolder = () => {
        setIsFolderModalOpen(true);
    }

    return (
        <div className="w-full h-full flex flex-col">
            <NewFolderModal isOpen={isFolderModalOpen} closeModal={() => setIsFolderModalOpen(false)} />
            <div className="w-full h-16 flex items-center justify-between">
                <UnstyledButton className="text-[#646470] bg-[#38383f] p-2 rounded-md hover:bg-[#3071E8] hover:text-white" onClick={goBack}>
                    <MdArrowBack size={30} />
                </UnstyledButton>

                <UnstyledButton className="text-white bg-[#3071E8] py-2 px-4 rounded-base flex gap-4 items-center hover:bg-[#4485ff]" onClick={createNewFolder}>
                    <MdCreateNewFolder size={25} />
                    New Folder
                </UnstyledButton>
            </div>

            <div className="mt-6">
                <Outlet />
            </div>
        </div>
    );
}

const FoldersHome = () => {
    const { data, isLoading, isFetching } = useGetAllFoldersQuery();

    React.useEffect(() => {
        console.log("Folders data changed: ", data);
    }, [data])
    return (
        <div className="w-full h-full grid grid-cols-[repeat(auto-fill,20rem)] gap-8">
            {(isLoading || isFetching) ? <Loader /> : data && data.map((value) =>

                <FolderItem key={value.id} folderTitle={value.name} folderId={value.id} />
            )
            }
        </div>
    );

}

FoldersPage.Content = FolderContentPage;
FoldersPage.Home = FoldersHome;

export default FoldersPage;

interface FolderItemProps {
    folderTitle: string,
    folderId: string
}

const FolderItem = ({ folderTitle, folderId }: FolderItemProps) => {

    const navigate = useNavigate();

    const openFolder = () => {
        navigate(folderId);
    }

    return (
        <button
            className="w-full max-w-xs h-fit max-h-32 p-4 flex gap-4 text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]"
            onClick={openFolder}
        >
            <MdFolder />
            <h6> {folderTitle} </h6>
        </button>
    );
}