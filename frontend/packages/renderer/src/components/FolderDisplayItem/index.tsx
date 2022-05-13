import * as React from 'react';
import { useDeleteFolderMutation } from "@/redux/api/folderEndpoints";
import { IFolder } from "@/types";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MdFolder, MdShortText, MdDelete } from 'react-icons/md';
import { Menu } from '@mantine/core';

interface FolderDisplayItemProps {
    folderInfo: IFolder,
    openDrawer: () => void
}

interface IOutletContext {
    renameFolder: (folder: IFolder) => void,
}

const FolderDisplayItem = ({ folderInfo, openDrawer }: FolderDisplayItemProps) => {


    const navigate = useNavigate();
    const [deleteFolderMutation] = useDeleteFolderMutation();
    const { renameFolder } = useOutletContext<IOutletContext>();

    const deleteFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (folderInfo.id) {
            deleteFolderMutation(folderInfo.id);
        }
    }

    const openFolderDetails = () => {
        openDrawer();
        // navigate(folderInfo.id);
    }

    const openFolder = () => {
        navigate(folderInfo.id);
    }

    return (
        <div
            className="w-full max-w-xs h-fit max-h-32 p-4 flex gap-4 cursor-pointer text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]"
            onClick={openFolderDetails}
            onDoubleClick={openFolder}
        >
            <MdFolder />
            <div className="w-full flex justify-between items-center">
                <h6> {folderInfo.name.toString()} </h6>
                <Menu
                    onClick={(e) => e.stopPropagation()}
                    styles={{ body: { backgroundColor: '#34343A', border: 'none' }, itemLabel: { color: 'white' }, item: { ':hover': { background: '#45454D' } } }}
                >
                    <Menu.Item icon={<MdShortText color="white" size={20} />} onClick={() => renameFolder(folderInfo)}> Rename Folder </Menu.Item>
                    <Menu.Item icon={<MdDelete color="#F64646" size={20} />} onClick={deleteFolder}> Delete Folder </Menu.Item>
                </Menu>
            </div>
        </div>
    );
}

export default FolderDisplayItem;

export const FolderItemMenu = () => {
    return (
        <Menu
            onClick={(e) => e.stopPropagation()}
            styles={{ body: { backgroundColor: '#34343A', border: 'none' }, itemLabel: { color: 'white' }, item: { ':hover': { background: '#45454D' } } }}
        >
            <Menu.Item icon={<MdShortText color="white" size={20} />}> Rename Document </Menu.Item>
            <Menu.Item icon={<MdDelete color="#F64646" size={20} />} > Delete Document </Menu.Item>
        </Menu>
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