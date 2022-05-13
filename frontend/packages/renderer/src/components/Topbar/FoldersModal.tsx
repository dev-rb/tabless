import * as React from 'react';
import { useGetAllFoldersQuery } from '@/redux/api/folderEndpoints';
import { Button, Grid, Group, Modal, Popover } from '@mantine/core';
import { MdFolder } from 'react-icons/md';
import { IoMdAlert } from 'react-icons/io';

interface FoldersModalProps {
    isModalOpen: boolean,
    onModalClose: () => void,
    closeModal: () => void,
    setSelectedFolder: (folderId: string) => void
    selectedFolderId: string | undefined,
    submitUpdate: () => void
}

const FoldersModal = ({ selectedFolderId, setSelectedFolder, closeModal, isModalOpen, onModalClose, submitUpdate }: FoldersModalProps) => {

    const [isNoneSelected, setIsNoneSelected] = React.useState(false);

    const { data, isLoading } = useGetAllFoldersQuery();

    const selectedFolder = data?.find((val) => val.id === selectedFolderId);

    const submitDocumentToFolder = () => {
        if (!selectedFolderId) {
            setIsNoneSelected(true);
            return;
        }

        submitUpdate();
        closeModal();
    }

    const handleCancel = () => {
        closeModal();
    }


    return (
        <Modal
            title="Add to folder"
            withCloseButton={false}
            opened={isModalOpen}
            onClose={onModalClose}
            centered={true}
            styles={
                {
                    'modal': { background: '#1D1D20', width: '100%', maxWidth: '65vw', height: '55vh' },
                    'title': { color: 'white', fontSize: '1.5rem' },
                    'body': { height: 'calc(90% - 20px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
                    'inner': { height: '100%' }
                }
            }
        >
            <Grid columns={4}>
                {data && data?.map((folderInfo) =>
                    <Grid.Col key={folderInfo.id} span={1}>
                        <div
                            onClick={() => setSelectedFolder(folderInfo.id)}
                            className={`w-full h-fit max-h-24 p-4 flex gap-4 cursor-pointer text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8] ${selectedFolderId === folderInfo.id && '!border-[#3071E8] !text-white'}`}
                        >
                            <MdFolder />
                            <div className="w-full flex justify-between items-center">
                                <h6> {folderInfo.name.toString()} </h6>
                            </div>
                        </div>
                    </Grid.Col>
                )}
            </Grid>
            <Group align={'end'}>
                <Group direction='row' align={'center'} spacing={'sm'}>
                    <h1 className="text-[#6A6A6A] font-semibold text-xl"> Selected Folder: </h1>
                    <h4 className="text-white font-normal text-lg"> {selectedFolder?.name} </h4>
                </Group>
                <Group align='center' className="ml-auto">
                    <Button variant='outline' color="red" onClick={handleCancel}> Cancel </Button>
                    <Popover
                        opened={isNoneSelected}
                        onClose={() => setIsNoneSelected(false)}
                        position='bottom'
                        withArrow
                        target={<Button variant='filled' onClick={submitDocumentToFolder} styles={{ 'filled': { backgroundColor: '#3071E8 !important', ':hover': { backgroundColor: '#2A61C7 !important' } } }}> Add to Folder </Button>}
                        styles={{ 'popover': { background: '#34343A !important' }, 'body': { border: 'none' }, 'arrow': { background: '#34343A', border: 'none' } }}
                    >
                        <div className="flex items-center gap-4">
                            <IoMdAlert color='white' size={20} />
                            <h1 className="text-white text-lg"> Please select a folder </h1>
                        </div>
                    </Popover>
                </Group>
            </Group>
        </Modal>
    );
}

export default FoldersModal;