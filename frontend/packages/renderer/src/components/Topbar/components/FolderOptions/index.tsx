import { ActionIcon, Button, createStyles, Divider, Menu, MenuItem } from '@mantine/core';
import * as React from 'react';
import { MdDelete, MdMoreHoriz, MdStar, MdStarBorder } from 'react-icons/md';

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

    return (
        <div className="flex gap-2 items-center">
            <Button classNames={buttonClasses} size='sm' compact> New Folder </Button>
            <ActionIcon classNames={actionIconClasses}> <MdStarBorder size={22} /> </ActionIcon>
            <Menu classNames={menuClasses} control={<ActionIcon classNames={actionIconClasses}> <MdMoreHoriz size={22} /> </ActionIcon>}>
                <MenuItem icon={<MdStarBorder size={16} />}>
                    Add to Favorites
                </MenuItem>
                <Divider />
                <MenuItem icon={<MdDelete size={16} />} >
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}

export default FolderOptions;