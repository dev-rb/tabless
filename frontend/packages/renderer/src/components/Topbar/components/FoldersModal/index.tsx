import * as React from 'react';
import { useAddDocumentToFolderMutation, useGetAllFoldersQuery } from '@/redux/api/folderEndpoints';
import { Button, Grid, Group, Menu, MenuItem, Modal, SimpleGrid } from '@mantine/core';
import { MdFolder, MdShortText, MdDelete } from 'react-icons/md';

interface FoldersModalProps {
    isModalOpen: boolean,
    onModalClose: () => void,
    closeModal: () => void,
    setSelectedFolder: (folderId: string) => void
    selectedFolderId: string | undefined
}

const FoldersModal = ({ selectedFolderId, setSelectedFolder, closeModal, isModalOpen, onModalClose }: FoldersModalProps) => {

    const { data, isLoading } = useGetAllFoldersQuery();

    React.useEffect(() => {
        console.log(selectedFolderId)
    }, [selectedFolderId])


    return (
        <Modal
            title="Add to folder"
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
                            className={`w-full h-fit max-h-24 p-4 flex gap-4 cursor-pointer text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8] ${selectedFolderId === folderInfo.id && '!border-[#3071E8]'}`}
                        >
                            <MdFolder />
                            <div className="w-full flex justify-between items-center">
                                <h6> {folderInfo.name.toString()} </h6>
                            </div>
                        </div>
                    </Grid.Col>
                )}
                <Grid.Col span={1}>
                    <div
                        className="w-full h-fit max-h-24 p-4 flex gap-4 cursor-pointer text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]"
                    >
                        <MdFolder />
                        <div className="w-full flex justify-between items-center">
                            <h6> Grid Test Item </h6>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col span={1}>
                    <div
                        className="w-full h-fit max-h-24 p-4 flex gap-4 cursor-pointer text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]"
                    >
                        <MdFolder />
                        <div className="w-full flex justify-between items-center">
                            <h6> Grid Test Item </h6>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col span={1}>
                    <div
                        className="w-full h-fit max-h-24 p-4 flex gap-4 cursor-pointer text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]"
                    >
                        <MdFolder />
                        <div className="w-full flex justify-between items-center">
                            <h6> Grid Test Item </h6>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col span={1}>
                    <div
                        className="w-full h-fit max-h-24 p-4 flex gap-4 cursor-pointer text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]"
                    >
                        <MdFolder />
                        <div className="w-full flex justify-between items-center">
                            <h6> Grid Test Item </h6>
                        </div>
                    </div>
                </Grid.Col>

            </Grid>
            <Group align={'center'} className="ml-auto">
                <Button> Cancel </Button>
                <Button> Add to Folder </Button>
            </Group>
        </Modal>
    );
}

export default FoldersModal;