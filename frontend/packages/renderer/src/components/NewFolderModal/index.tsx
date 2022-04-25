import { useNewFolderMutation } from '@/redux/api/folderEndpoints';
import { IFolder } from '@/types';
import { Button, Group, LoadingOverlay, Modal, TextInput, UnstyledButton } from '@mantine/core';
import { nanoid } from 'nanoid';
import * as React from 'react';

interface Props {
    isOpen: boolean,
    closeModal: VoidFunction
}

const NewFolderModal = ({ isOpen, closeModal }: Props) => {

    const [newFolder, { isLoading }] = useNewFolderMutation();
    const [folderName, setFolderName] = React.useState('');
    const [submit, setSubmit] = React.useState(false);
    const [folderNameError, setFolderNameError] = React.useState('');

    const createNewFolder = () => {
        if (folderName.length === 0) {
            setFolderNameError('Name can not be empty');
            return;
        }
        setSubmit(true);
        setTimeout(() => {
            const folder: IFolder = { documents: [], id: nanoid(), name: folderName };
            newFolder(folder).then(() => {
                setSubmit(false);
                closeModal();
            });
            // setSubmit(false);
        }, 2000)
    }


    return (
        <div className="relative">
            <Modal classNames={{ modal: "bg-[#1D1D20] text-white", close: "text-[#646470] hover:bg-[#38383f]" }} closeOnClickOutside={false} opened={isOpen} onClose={closeModal} centered title="Create a New Folder">
                <LoadingOverlay visible={submit} />
                <TextInput classNames={{ label: "text-white", defaultVariant: "bg-[#38383f] border-[#646470] text-white focus-within:border-[#4485ff] focus:border-[#4485ff]" }} label="Folder name" error={folderNameError} required onChange={(e) => setFolderName(e.target.value)} />
                <div className="flex w-full items-center justify-end gap-4 mt-6">
                    <Button variant='light' className="rounded-md" classNames={{ light: "hover:bg-[#4486ff31]" }} onClick={closeModal}> Cancel </Button>
                    <UnstyledButton className="h-9 bg-[#3071E8] text-white py-1 px-[18px] rounded-md hover:bg-[#4485ff]" onClick={createNewFolder}> Create </UnstyledButton>
                </div>
            </Modal>
        </div>
    );
}

export default NewFolderModal;