import * as React from 'react';
import { useDeleteDocumentMutation } from '@/redux/api/documentEndpoints';
import { IDocument, ITextDocument } from '@/types';
import { Box, Button, Menu, BoxProps, Text } from '@mantine/core';
import { HiDocument } from 'react-icons/hi';
import { MdShortText, MdDelete } from 'react-icons/md';

interface DocumentDisplayItemProps extends BoxProps<'div'> {
    documentDetails: IDocument | ITextDocument
    rightSection?: React.ReactNode,
}

export const DocumentDisplayItem = ({ rightSection, onClick, documentDetails, ...rest }: DocumentDisplayItemProps) => {

    const { title, id } = documentDetails;

    return (
        <Box
            component='div'
            sx={(theme) => ({
                width: '100%',
                maxWidth: '20rem',
                height: 'fit-content',
                maxHeight: '8rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.125rem',
                border: '1px solid #44444A',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                cursor: 'pointer',
                color: '#6A6A6A',
                fontSize: '1.125rem',
                lineHeight: '1.75rem',
                ':hover': {
                    color: 'white',
                    borderColor: '#3071E8'
                }
            })}
            onClick={onClick}
            {...rest}
        >
            <HiDocument size={30} />
            <Box
                component='div'
                sx={(theme) => ({
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                })}
            >
                <Text size='lg'> {title} </Text>
                {rightSection}
            </Box>
        </Box>
    );
}


export const DocumentItemMenu = () => {
    return (
        <Menu
            onClick={(e) => e.stopPropagation()}
            styles={{ body: { backgroundColor: '#34343A', border: 'none' }, itemLabel: { color: 'white' }, item: { ':hover': { background: '#45454D' } } }}
        >
            <Menu.Item icon={<MdShortText color="white" size={20} />}> Rename Document </Menu.Item>
            <Menu.Item icon={<MdDelete color="#F64646" size={20} />} > Delete Document </Menu.Item>
        </Menu>
    );
}

interface DocumentItemDeleteProps {
    documentId: string
}

export const DocumentItemDelete = ({ documentId }: DocumentItemDeleteProps) => {
    const [deleteDocumentWithId] = useDeleteDocumentMutation();

    const deleteDocument = () => {
        deleteDocumentWithId(documentId);
    }

    return (
        <Button
            variant="subtle"
            sx={(theme) => ({
                color: '#707070',
                fontSize: '1.25rem',
                lineHeight: '1.75rem',
                padding: '0.25rem',

                ':hover': {
                    color: 'white',
                    backgroundColor: 'rgb(220 38 38)'
                }
            })}
            onClick={deleteDocument}
        >
            <MdDelete />
        </Button>
    );
}