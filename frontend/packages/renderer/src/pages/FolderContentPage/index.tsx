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
    const { documents: folderData } = useGetFolderQuery(folderId!, {
        selectFromResult: ({ data }) => { console.log(data); return ({ documents: data?.documents }); }
    });

    React.useEffect(() => {
        if (folderData) {
            console.log(folderData)
        }
    }, [folderData])

    return (
        <div className="w-full h-full grid grid-cols-[repeat(auto-fill,20rem)] gap-8">
            {/* {(data && data.documents) && Array.from(data.documents).map((val) => <DocumentItem key={val.id} documentInfo={val} />)} */}
            {(folderData) ?
                folderData.map((value) =>
                    <DocumentItem key={value.id} documentInfo={value} />
                )
                : <Loader />
            }
        </div>
    );
}

export default FolderContentPage;

interface DocumentItemProps {
    documentInfo: ITextDocument
}

export const DocumentItem = ({ documentInfo }: DocumentItemProps) => {


    const navigate = useNavigate();

    const openFolder = () => {
        navigate(`documents/${documentInfo.id}`);
    }

    React.useEffect(() => {
        console.log(documentInfo)
    }, [])

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