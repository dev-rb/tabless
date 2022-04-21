import { Button } from '@mantine/core';
import * as React from 'react';
import { MdArrowBack, MdFolder } from 'react-icons/md';
import { Outlet, useNavigate } from 'react-router-dom';
import FolderContentPage from '../FolderContentPage';

const FoldersPage = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-16 flex items-center">
                <Button variant='filled' onClick={goBack}>
                    <MdArrowBack size={30} />
                </Button>
            </div>

            <Outlet />
        </div>
    );
}

const FoldersHome = () => {
    return (
        <div className="w-full h-full grid grid-cols-5">
            <FolderItem />
        </div>
    );

}

FoldersPage.Content = FolderContentPage;
FoldersPage.Home = FoldersHome;

export default FoldersPage;

const FolderItem = () => {

    const navigate = useNavigate();

    const openFolder = () => {
        navigate('123');
    }

    return (
        <button
            className="w-full max-w-sm h-fit max-h-32 p-4 flex gap-4 text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]"
            onClick={openFolder}
        >
            <MdFolder />
            <h6> Folder Title </h6>
        </button>
    );
}