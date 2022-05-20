import * as React from 'react';
import { ActionIcon, Button, createStyles, Divider, Group, Menu, MenuItem } from '@mantine/core';
import { MdDelete, MdMoreHoriz, MdStar, MdStarBorder } from 'react-icons/md';
import NewFolderModal from '/@/pages/FoldersPage/NewFolderModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteFolderMutation, useFavoriteFolderMutation, useGetFolderQuery, useUnFavoriteFolderMutation } from '/@/redux/api/folderEndpoints';

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

const FolderOptions = () => {

    const { classes: buttonClasses } = useButtonStyles();
    const { classes: actionIconClasses } = useActionIconStyles();
    const { classes: menuClasses } = useMenuStyles();

    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

    const { folderId } = useParams();
    const navigate = useNavigate();

    const [favoriteFolderMutation] = useFavoriteFolderMutation();
    const [unFavoriteFolderMutation] = useUnFavoriteFolderMutation();
    const [deleteFolderMutation] = useDeleteFolderMutation();

    const { data: folderData } = useGetFolderQuery(folderId!);

    const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

    const openFolderModal = () => {
        setIsCreateModalOpen(true);
    }

    const toggleFavorite = () => {
        if (isFavorite) {
            unFavoriteFolderMutation(folderId!);
            setIsFavorite(false);
        } else {
            favoriteFolderMutation(folderId!);
            setIsFavorite(true);
        }
    }

    const deleteFolder = () => {
        deleteFolderMutation(folderId!);

        setTimeout(() => {
            navigate(-1);
        }, 150)
    }

    React.useEffect(() => {
        if (folderData) {
            setIsFavorite(folderData.favorite);
        }
    }, [folderData])

    return (
        <Group noWrap align='center' sx={{ gap: '0.5rem' }}>
            <NewFolderModal isOpen={isCreateModalOpen} closeModal={() => setIsCreateModalOpen(false)} type='create' />
            <Button classNames={buttonClasses} variant="subtle" size='sm' compact onClick={openFolderModal}> New Folder </Button>
            {folderId &&
                <>
                    <ActionIcon classNames={actionIconClasses} onClick={toggleFavorite}>
                        {isFavorite ? <MdStar size={16} color="gold" /> : <MdStarBorder size={16} />}
                    </ActionIcon>
                    <Menu classNames={menuClasses} control={<ActionIcon classNames={actionIconClasses}> <MdMoreHoriz size={22} /> </ActionIcon>}>
                        <MenuItem icon={isFavorite ? <MdStar size={16} color="gold" /> : <MdStarBorder size={16} />} onClick={toggleFavorite}>
                            Add to Favorites
                        </MenuItem>
                        <Divider />
                        <MenuItem icon={<MdDelete size={16} />} onClick={deleteFolder}>
                            Delete
                        </MenuItem>
                    </Menu>
                </>
            }

        </Group>
    );
}

export default FolderOptions;