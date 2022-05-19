import * as React from 'react';
import { Group, Loader, Stack, Text, TextInput, UnstyledButton } from '@mantine/core';
import { MdAdd, MdPerson, MdTag } from 'react-icons/md';
import { nanoid } from 'nanoid';
import { IDocument, ITextDocumentTag } from '@/types';
import { useDocAutoSave, InputTypes } from '@/hooks/useDocAutoSave';
import { useUpdateDocumentMutation } from '@/redux/api/documentEndpoints';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import ResizeableSection from '../../../components/ResizableSection';
import DocumentTag from './DocumentTag';
import { TextEditor } from './TextEditor';

interface AdditionalProps {
    updateText: (val: string) => void
}

type IDocumentProps = IDocument & AdditionalProps;

export const TextDocument = ({ updateText, ...doc }: IDocumentProps) => {

    const { title, author, createdAt, id, tags, text } = doc;

    const [docTitle, setDocTitle] = React.useState<string>(title);
    const [docTags, setDocTags] = React.useState<ITextDocumentTag[]>(tags);

    const [updateDocumentMutation, { isLoading, status }] = useUpdateDocumentMutation();

    const updateDocument = (fieldToUpdate: InputTypes, newValue: string) => {
        updateDocumentMutation({ ...doc, [fieldToUpdate]: newValue })
    }

    const { onInputChange } = useDocAutoSave({ updateDocument });

    const updateTextFromEditor = (val: string) => {
        updateText(val);
        onInputChange(val, 'text');
    }

    const updateTitle = (val: string) => {
        setDocTitle(val);
        onInputChange(val, 'title');
    }

    const addNewTag = (newTagName: string = '') => {
        const newTag: ITextDocumentTag = { id: nanoid(), title: newTagName };
        setDocTags((prev) => [...prev, newTag]);
    }

    const removeTag = (tagId: string) => {
        const copyOfTags = [...docTags];
        const newTags = copyOfTags.filter((val) => val.id !== tagId);

        setDocTags(newTags);
    }

    const changeTagName = (tagId: string, newTagName: string) => {
        const copyOfTags = [...docTags];
        copyOfTags.forEach((val) => {
            if (val.id === tagId) {
                val.title = newTagName;
            }
        })

        setDocTags([...copyOfTags]);
    }

    return (
        <ResizeableSection maxWidth={'768px'} minWidth={'384px'}>
            <Stack justify={'start'} sx={{ maxWidth: '48rem', width: '100%', height: '100%', paddingTop: '2rem' }}>
                <Stack sx={{ position: 'relative' }}>
                    {isLoading && (status === QueryStatus.pending) &&
                        <div className="text-blue-600 absolute -top-8 left-0 flex flex-row gap-2">
                            <Loader size='sm' />
                            <p> Autosaving... </p>
                        </div>
                    }
                    <TextInput placeholder='Untitled' value={docTitle}
                        type="text"
                        styles={{ input: { color: 'white', background: 'none', border: 'none', fontSize: '1.875rem', fontWeight: 600, padding: 0, textOverflow: 'ellipsis', wordWrap: 'break-word' } }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { updateTitle(e.target.value); }} />

                    {/* <h1 className="text-white font-semibold text-3xl"> {title} </h1> */}

                    <Group sx={{ gap: '0.5rem' }} align={'center'}>
                        <MdPerson color="#696C74" />
                        <Text sx={{ color: '#696C74' }}> {author} </Text>
                    </Group>
                    <Group sx={{ gap: '0.5rem', height: '1.5rem', flex: 1 }} align={'center'}>
                        <MdTag color="#696C74" style={{ alignSelf: 'flex-start' }} />
                        <Group className="flex flex-1 gap-2 flex-wrap items-center">
                            {docTags.map((val) => <DocumentTag key={val.id} tagValues={val} removeTag={removeTag} changeTagName={changeTagName} />)}
                            <UnstyledButton
                                sx={{ width: '1.5rem', height: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#AEAEAE', backgroundColor: '#2A2A2E', ':hover': { backgroundColor: 'white', color: 'black' } }}
                                onClick={() => addNewTag()}>
                                <MdAdd />
                            </UnstyledButton>
                        </Group>

                    </Group>
                </Stack>
                <TextEditor updateText={updateTextFromEditor} text={text} />
            </Stack>
        </ResizeableSection>
    );
}