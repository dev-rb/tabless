import { useNewFolderMutation, useUpdateFolderNameMutation } from '@/redux/api/folderEndpoints';
import { IFolder } from '@/types';
import { Button, Group, LoadingOverlay, Modal, TextInput, UnstyledButton } from '@mantine/core';
import { nanoid } from 'nanoid';
import * as React from 'react';

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
        <div className="relative">
            <Modal classNames={{ modal: "bg-[#1D1D20] text-white", close: "text-[#646470] hover:bg-[#38383f]" }} closeOnClickOutside={false} opened={isOpen} onClose={closeModal} centered title="Create a New Folder">
                <LoadingOverlay visible={submit} />
                <TextInput classNames={{ label: "text-white", defaultVariant: "bg-[#38383f] border-[#646470] text-white focus-within:border-[#4485ff] focus:border-[#4485ff]" }} label="Folder name" value={folderName} error={folderNameError} required onChange={(e) => setFolderName(e.target.value)} />
                <div className="flex w-full items-center justify-end gap-4 mt-6">
                    <Button variant='light' className="rounded-md" classNames={{ light: "hover:bg-[#4486ff31]" }} onClick={closeModal}> Cancel </Button>
                    <UnstyledButton className="h-9 bg-[#3071E8] text-white py-1 px-[18px] rounded-md hover:bg-[#4485ff]" onClick={() => type === 'create' ? createNewFolder() : renameFolder()}> {type === 'create' ? 'Create' : 'Rename'} </UnstyledButton>
                </div>
            </Modal>
        </div>
    );
}

export default FolderModal;