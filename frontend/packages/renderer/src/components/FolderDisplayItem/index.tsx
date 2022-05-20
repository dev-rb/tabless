import * as React from 'react';
import { useDeleteFolderMutation } from "/@/redux/api/folderEndpoints";
import { IFolder } from "/@/types";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MdFolder, MdShortText, MdDelete } from 'react-icons/md';
import { Box, BoxProps, Group, Menu, Text } from '@mantine/core';

interface FolderDisplayItemProps extends BoxProps<"div"> {
    folderInfo: IFolder,
    openDrawer: () => void,
    closeDrawer: () => void
}

interface IOutletContext {
    renameFolder: (folder: IFolder) => void,
}

const FolderDisplayItem = ({ folderInfo, openDrawer, closeDrawer, ...rest }: FolderDisplayItemProps) => {


    const navigate = useNavigate();
    const [deleteFolderMutation] = useDeleteFolderMutation();
    const { renameFolder } = useOutletContext<IOutletContext>();

    const deleteFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (folderInfo.id) {
            setTimeout(() => {
                deleteFolderMutation(folderInfo.id);
            }, 100)
        }
    }

    const openFolderDetails = () => {
        openDrawer();
        // navigate(folderInfo.id);
    }

    const openFolder = () => {
        closeDrawer();
        setTimeout(() => {
            navigate(folderInfo.id);
        }, 150)
    }

    return (
        <Box
            component='div'
            sx={(theme) => ({
                width: '100%',
                maxWidth: '20rem',
                height: 'fit-content',
                maxHeight: '8rem',
                padding: '1rem',
                borderRadius: '0.125rem',
                border: '1px solid #44444A',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                cursor: 'pointer',
                color: '#6A6A6A',
                fontSize: '1.125rem',
                lineHeight: '1.75rem',
                ':hover': {
                    color: 'white',
                    borderColor: '#3071E8'
                }
            })}
            onClick={openFolderDetails}
            onDoubleClick={openFolder}
            {...rest}
        >
            <MdFolder />
            <Group position='apart' align={'center'} sx={{ width: '100%' }} noWrap>
                <Text size='lg'> {folderInfo.name.toString()} </Text>
                <Menu
                    onClick={(e) => e.stopPropagation()}
                    styles={{ body: { backgroundColor: '#34343A', border: 'none' }, itemLabel: { color: 'white' }, item: { ':hover': { background: '#45454D' } } }}
                >
                    <Menu.Item icon={<MdShortText color="white" size={20} />} onClick={() => renameFolder(folderInfo)}> Rename Folder </Menu.Item>
                    <Menu.Item icon={<MdDelete color="#F64646" size={20} />} onClick={deleteFolder}> Delete Folder </Menu.Item>
                </Menu>
            </Group>
        </Box>
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