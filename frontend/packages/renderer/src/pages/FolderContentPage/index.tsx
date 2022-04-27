import { useGetAllDocumentsQuery } from '@/redux/api/documentEndpoints';
import { useGetFolderQuery } from '@/redux/api/folderEndpoints';
import { ITextDocument } from '@/types';
import { Loader, Menu, MenuItem } from '@mantine/core';
import * as React from 'react';
import { HiDocument } from 'react-icons/hi';
import { MdShortText, MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

const FolderContentPage = () => {

    const { folderId } = useParams();
    const { data: folderData, isLoading, isFetching } = useGetFolderQuery(folderId!);
    const { documents } = useGetAllDocumentsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            documents: data?.filter((val) => folderData?.documents.includes(val))
        })
    });

    return (
        <div className="w-full h-full">
            {/* {data && data.documents.map((val) =>
                <button className="w-full max-w-sm h-fit max-h-32 p-4 flex gap-4 text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]">
                    <HiDocument />
                    <h6> {val.title} </h6>
                </button>
            )
            } */}
            <div className="w-full h-full grid grid-cols-[repeat(auto-fill,20rem)] gap-8">
                {(isLoading || isFetching) ? <Loader /> : documents && documents.map((value) =>

                    <DocumentItem key={value.id} documentInfo={value} />
                )
                }
            </div>
        </div>
    );
}

export default FolderContentPage;

interface DocumentItemProps {
    documentInfo: ITextDocument
}

const DocumentItem = ({ documentInfo }: DocumentItemProps) => {


    const navigate = useNavigate();

    const openFolder = () => {
        navigate(`documents/${documentInfo.id}`);
    }

    return (
        <div
            className="w-full max-w-xs h-fit max-h-32 p-4 flex gap-4 cursor-pointer text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]"
            onClick={openFolder}
        >
            <HiDocument />
            <div className="w-full flex justify-between items-center">
                <h6> {documentInfo.title} </h6>
                <Menu
                    onClick={(e) => e.stopPropagation()}
                    styles={{ body: { backgroundColor: '#34343A', border: 'none' }, itemLabel: { color: 'white' }, item: { ':hover': { background: '#45454D' } } }}
                >
                    <MenuItem icon={<MdShortText color="white" size={20} />}> Rename Folder </MenuItem>
                    <MenuItem icon={<MdDelete color="#F64646" size={20} />} > Delete Folder </MenuItem>
                </Menu>
            </div>
        </div>
    );
}