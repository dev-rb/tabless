import * as React from 'react';
import { ActionIcon, Button, createStyles, Divider, Group, Menu, MenuItem } from '@mantine/core';
import { MdAdd, MdDelete, MdDriveFileMove, MdMoreHoriz, MdStar, MdStarBorder } from 'react-icons/md';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAddDocumentToFolderMutation } from '@/redux/api/folderEndpoints';
import FoldersModal from './FoldersModal';
import { useDeleteDocumentMutation, useFavoriteDocumentMutation, useGetDocumentQuery, useUnFavoriteDocumentMutation } from '@/redux/api/documentEndpoints';

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

    const { documentId } = useParams();

    const [isFoldersModalOpen, setIsFoldersModalOpen] = React.useState(false);
    const [selectedFolder, setSelectedFolder] = React.useState<string | undefined>(undefined);

    const [addToFolder] = useAddDocumentToFolderMutation();
    const [deleteThisDocument] = useDeleteDocumentMutation();
    const [favoriteDocumentMutation] = useFavoriteDocumentMutation();
    const [unFavoriteDocumentMutation] = useUnFavoriteDocumentMutation();

    const { data: documentData } = useGetDocumentQuery(documentId!);

    const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

    const navigate = useNavigate();

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

    const deleteDocument = () => {
        deleteThisDocument(documentId!);
        setTimeout(() => {
            navigate(-1);
        }, 150)
    }

    const toggleFavorite = () => {
        if (isFavorite) {
            unFavoriteDocumentMutation(documentId!);
            setIsFavorite(false);
        } else {
            favoriteDocumentMutation(documentId!);
            setIsFavorite(true);
        }
    }

    React.useEffect(() => {
        console.log(documentData)
        if (documentData) {
            setIsFavorite(documentData.favorite);
        }
    }, [documentData])

    return (
        <Group noWrap align='center' sx={{ gap: '0.5rem' }}>
            {/* <Button classNames={buttonClasses} size='sm' variant="subtle" compact> Export </Button> */}
            <Button classNames={buttonClasses} size='sm' variant="subtle" compact> Open PDF Viewer </Button>
            <ActionIcon classNames={actionIconClasses} onClick={toggleFavorite}> {isFavorite ? <MdStar size={16} color="gold" /> : <MdStarBorder size={16} />} </ActionIcon>
            <Menu classNames={menuClasses} control={<ActionIcon classNames={actionIconClasses}> <MdMoreHoriz size={22} /> </ActionIcon>} size={'md'}>
                <MenuItem icon={<MdAdd size={16} />} onClick={openFolderModal}>
                    Add to Folder
                </MenuItem>
                <MenuItem icon={isFavorite ? <MdStar size={16} color="gold" /> : <MdStarBorder size={16} />} onClick={toggleFavorite}>
                    Add to Favorites
                </MenuItem>
                <Divider />
                {/* <MenuItem icon={<MdDriveFileMove size={16} />}>
                    Move To
                </MenuItem> */}
                <MenuItem icon={<MdDelete size={16} />} onClick={deleteDocument}>
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
        </Group>
    );
}

export default DocumentOptions;