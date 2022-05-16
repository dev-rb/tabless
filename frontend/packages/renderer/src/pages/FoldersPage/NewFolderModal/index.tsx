import * as React from 'react';
import { useNewFolderMutation, useUpdateFolderNameMutation } from '@/redux/api/folderEndpoints';
import { IFolder } from '@/types';
import { Button, Group, LoadingOverlay, Modal, TextInput, UnstyledButton } from '@mantine/core';
import { nanoid } from 'nanoid';

type TypeOfModal = 'create' | 'rename';

interface Props {
    type: TypeOfModal,
    currentName?: string,
    folderId?: string,
    isOpen: boolean,
    closeModal: VoidFunction
}

const FolderModal = ({ isOpen, closeModal, type, currentName, folderId }: Props) => {

    const [newFolder, { isLoading }] = useNewFolderMutation();
    const [updateFolderName] = useUpdateFolderNameMutation();
    const [folderName, setFolderName] = React.useState(currentName || '');
    const [submit, setSubmit] = React.useState(false);
    const [folderNameError, setFolderNameError] = React.useState('');

    const createNewFolder = () => {
        if (folderName?.length === 0 || !folderName) {
            setFolderNameError('Name can not be empty');
            return;
        }
        setSubmit(true);
        setTimeout(() => {
            const folder: IFolder = { documents: [], id: nanoid(), name: folderName };
            newFolder(folder).then(() => {
                setSubmit(false);
                setFolderName('');
                closeModal();
            });
            // setSubmit(false);
        }, 1000)
    }

    const renameFolder = () => {
        if (!folderId) {
            return;
        }
        if (folderName?.length === 0 || !folderName) {
            setFolderNameError('Name can not be empty');
            return;
        }
        setSubmit(true);
        setTimeout(() => {
            updateFolderName({ id: folderId, newName: folderName }).then(() => {
                setSubmit(false);
                closeModal();
            });
            // setSubmit(false);
        }, 1000)
    }

    React.useEffect(() => {
        if (currentName) {
            setFolderName(currentName);
        }
    }, [currentName])


    return (
        <>
            <Modal
                styles={{ modal: { backgroundColor: '#1D1D20', color: 'white' }, close: { color: '#646470', ':hover': { backgroundColor: '#38383f' } } }}
                overlayOpacity={0.5}
                closeOnClickOutside={false}
                opened={isOpen}
                onClose={closeModal}
                centered
                title="Create a New Folder"
            >
                <LoadingOverlay visible={submit} />
                <TextInput
                    variant='filled'
                    styles={{ label: { color: 'white' }, filledVariant: { backgroundColor: '#1D1D20', borderColor: '#646470', color: 'white', ':focus': { borderColor: '#3071E8 !important' } } }}
                    label="Folder name"
                    value={folderName}
                    error={folderNameError}
                    required
                    onChange={(e) => setFolderName(e.target.value)}
                />
                <Group className="flex w-full items-center justify-end gap-4 mt-6" sx={{ marginTop: '1.5rem', width: '100%' }} align='center' position='right'>
                    <Button variant='outline' onClick={closeModal} color='red'> Cancel </Button>
                    <Button onClick={() => type === 'create' ? createNewFolder() : renameFolder()}> {type === 'create' ? 'Create' : 'Rename'} </Button>
                </Group>
            </Modal>
        </>
    );
}

export default FolderModal;