import * as React from 'react';
import { useGetAllFoldersQuery } from '/@/redux/api/folderEndpoints';
import { Button, Grid, Group, Modal, Popover, Text, Title } from '@mantine/core';
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
                        <Group
                            onClick={() => setSelectedFolder(folderInfo.id)}
                            align={'center'}
                            noWrap
                            sx={(theme) => ({
                                width: '100%',
                                height: 'fit-content',
                                maxHeight: '6rem',
                                padding: '1rem',
                                cursor: 'pointer',
                                color: `${selectedFolderId === folderInfo.id ? 'white' : '#6A6A6A'}`,
                                fontSize: '1.125rem',
                                lineHeight: '1.75rem',
                                borderRadius: 2,
                                border: '1px solid #44444A',
                                borderColor: `${selectedFolderId === folderInfo.id ? theme.colors.blue[4] : '#44444A'}`,
                                ':hover': {
                                    borderColor: theme.colors.blue[4],
                                    color: 'white'
                                }
                            })}
                        >
                            <MdFolder />
                            <Group align={'center'} position={'apart'} noWrap sx={{ width: '100%' }}>
                                <Text> {folderInfo.name.toString()} </Text>
                            </Group>
                        </Group>
                    </Grid.Col>
                )}
            </Grid>
            <Group align={'end'} noWrap position='apart'>
                <Group direction='row' align={'center'} spacing={'sm'}>
                    <Title order={2} sx={{ color: '#6A6A6A' }}> Selected Folder: </Title>
                    <Text size={'md'}> {selectedFolder?.name} </Text>
                </Group>
                <Group align='center' className="ml-auto">
                    <Button variant='outline' color="red" onClick={handleCancel}> Cancel </Button>
                    <Popover
                        opened={isNoneSelected}
                        onClose={() => setIsNoneSelected(false)}
                        position='bottom'
                        withArrow
                        target={<Button variant='filled' onClick={submitDocumentToFolder}> Add to Folder </Button>}
                        styles={{ 'popover': { background: '#34343A !important' }, 'body': { border: 'none' }, 'arrow': { background: '#34343A', border: 'none' } }}
                    >
                        <Group align='center' noWrap>
                            <IoMdAlert color='white' size={20} />
                            <Title order={4} sx={{ color: 'white' }}> Please select a folder </Title>
                        </Group>
                    </Popover>
                </Group>
            </Group>
        </Modal>
    );
}

export default FoldersModal;