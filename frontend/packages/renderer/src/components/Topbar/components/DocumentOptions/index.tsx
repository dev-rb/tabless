import * as React from 'react';
import { ActionIcon, Button, createStyles, Divider, Menu, MenuItem } from '@mantine/core';
import { MdAdd, MdDelete, MdDriveFileMove, MdMoreHoriz, MdStar, MdStarBorder } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import FoldersModal from '../FoldersModal';
import { useModals } from '@mantine/modals';
import { useAddDocumentToFolderMutation } from '@/redux/api/folderEndpoints';

const useButtonStyles = createStyles({
    root: {
        color: '#ADAEB3',
        ':hover': {
            backgroundColor: '#303034'
        }
    }
});

const useActionIconStyles = createStyles({
    root: {
        color: '#ADAEB3',
        ':hover': {
            backgroundColor: '#303034'
        }
    }
});

const useMenuStyles = createStyles({
    body: {
        backgroundColor: '#303034',
        border: 'none',
    },
    itemInner: {
        color: '#ADAEB3',
    },
    item: {

        backgroundColor: 'transparent',
        ':hover': {
            backgroundColor: '#4A4A4D',
            ':last-child': {
                background: '#E8303066 !important',
                color: 'white !important'
            },
        }
    }
});

const DocumentOptions = () => {

    const { classes: buttonClasses } = useButtonStyles();
    const { classes: actionIconClasses } = useActionIconStyles();
    const { classes: menuClasses } = useMenuStyles();

    const [isFoldersModalOpen, setIsFoldersModalOpen] = React.useState(false);
    const [selectedFolder, setSelectedFolder] = React.useState<string | undefined>(undefined);
    const [addToFolder] = useAddDocumentToFolderMutation();

    const { documentId } = useParams();

    const modals = useModals();

    const selectFolder = (folderId: string) => {
        setSelectedFolder(folderId);
    }

    const closeModal = () => {
        setIsFoldersModalOpen(false);
    }

    const openFolderModal = () => {
        setIsFoldersModalOpen(true);
    }

    // const openFoldersModal = React.useCallback(() => modals.openConfirmModal({
    //     title: "Add to Folder",
    //     centered: true,
    //     children: <FoldersModal setSelectedFolder={selectFolder} selectedFolderId={selectedFolder} />,
    //     labels: { confirm: 'Add to Folder', cancel: 'Cancel' },
    //     confirmProps: { color: 'blue' },
    //     styles: {
    //         'modal': { background: '#1D1D20', width: '100%', maxWidth: '65vw', height: '55vh' },
    //         'title': { color: 'white', fontSize: '1.5rem' },
    //         'body': { height: 'calc(90% - 20px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    //         'inner': { height: '100%' }
    //     },
    //     onCancel: () => console.log("Cancel"),
    //     onConfirm: () => console.log("Confirm")
    // }), [selectFolder]);

    return (
        <div className="flex gap-2 items-center">
            <Button classNames={buttonClasses} size='sm' compact> Export </Button>
            <Button classNames={buttonClasses} size='sm' compact> Open PDF Viewer </Button>
            <ActionIcon classNames={actionIconClasses}> <MdStarBorder size={22} /> </ActionIcon>
            <Menu classNames={menuClasses} control={<ActionIcon classNames={actionIconClasses}> <MdMoreHoriz size={22} /> </ActionIcon>} size={'md'}>
                <MenuItem icon={<MdAdd size={16} />} onClick={openFolderModal}>
                    Add to Folder
                </MenuItem>
                <MenuItem icon={<MdStarBorder size={16} />}>
                    Add to Favorites
                </MenuItem>
                <Divider />
                <MenuItem icon={<MdDriveFileMove size={16} />}>
                    Move To
                </MenuItem>
                <MenuItem icon={<MdDelete size={16} />} >
                    Delete
                </MenuItem>
            </Menu>
            <FoldersModal setSelectedFolder={selectFolder} selectedFolderId={selectedFolder} isModalOpen={isFoldersModalOpen} closeModal={closeModal} onModalClose={closeModal} />
        </div>
    );
}

export default DocumentOptions;