import * as React from 'react';
import { ActionIcon, Button, createStyles, Divider, Menu, MenuItem } from '@mantine/core';
import { MdAdd, MdDelete, MdDriveFileMove, MdMoreHoriz, MdStarBorder } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import FoldersModal from '../FoldersModal';
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
            backgroundColor: '#4A4A4D !important',
            ':last-child': {
                backgroundColor: '#E8303066 !important',
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

    const selectFolder = (folderId: string) => {
        if (folderId === selectedFolder) {
            setSelectedFolder(undefined);
        } else {
            setSelectedFolder(folderId);
        }
    }

    const closeModal = () => {
        setIsFoldersModalOpen(false);
    }

    const openFolderModal = () => {
        setIsFoldersModalOpen(true);
    }

    const submitUpdate = () => {
        if (selectedFolder) {
            console.log(documentId);
            addToFolder({ id: selectedFolder, documentId: documentId! }).then(() => console.log("Called"));
        }
    }

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
            <FoldersModal
                setSelectedFolder={selectFolder}
                selectedFolderId={selectedFolder}
                isModalOpen={isFoldersModalOpen}
                closeModal={closeModal}
                onModalClose={closeModal}
                submitUpdate={submitUpdate}
            />
        </div>
    );
}

export default DocumentOptions;