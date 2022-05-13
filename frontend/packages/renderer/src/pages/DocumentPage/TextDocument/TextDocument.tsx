import * as React from 'react';
import { Loader, TextInput } from '@mantine/core';
import { MdAdd, MdPerson, MdTag } from 'react-icons/md';
import { nanoid } from 'nanoid';
import { IDocument, ITextDocumentTag } from '@/types';
import { useDocAutoSave } from '@/hooks/useDocAutoSave';
import { useUpdateDocumentMutation } from '@/redux/api/documentEndpoints';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import ResizeableSection from '../../../components/ResizableSection';
import TextEditor from './TextEditor';
import DocumentTag from './DocumentTag';

interface AdditionalProps {
    updateText: (val: string) => void
}

type IDocumentProps = IDocument & AdditionalProps;

const TextDocument = ({ updateText, ...doc }: IDocumentProps) => {

    const { title, author, createdAt, id, tags, text } = doc;

    const [docTitle, setDocTitle] = React.useState<string>(title);
    const [docTags, setDocTags] = React.useState<ITextDocumentTag[]>(tags);

    const [updateDocumentMutation, { isLoading, status }] = useUpdateDocumentMutation();

    const updateDocument = (fieldToUpdate: string, newValue: string) => {
        console.log("Update called!")
        updateDocumentMutation({ ...doc, [fieldToUpdate]: newValue })
    }

    const { onInputChange } = useDocAutoSave({ updateDocument });

    const updateTextFromEditor = (val: string) => {
        updateText(val);
        onInputChange(val, 'text');
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
            <div className="max-w-3xl w-full h-full flex flex-col justify-start  pt-8">
                <div className="flex flex-col gap-4 relative">
                    {isLoading && (status === QueryStatus.pending) &&
                        <div className="text-blue-600 absolute -top-8 left-0 flex flex-row gap-2">
                            <Loader size='sm' />
                            <p> Autosaving... </p>
                        </div>
                    }
                    <TextInput placeholder='Untitled' value={docTitle}
                        type="text"
                        styles={{ input: { color: 'white', background: 'none', border: 'none', fontSize: '1.875rem', fontWeight: 600, padding: 0, textOverflow: 'ellipsis', wordWrap: 'break-word' } }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setDocTitle(e.target.value); onInputChange(e.target.value, 'title'); }} />

                    {/* <h1 className="text-white font-semibold text-3xl"> {title} </h1> */}

                    <div className="flex flex-row gap-2 items-center text-paragraph">
                        <MdPerson color="#696C74" />
                        <p > {author} </p>
                    </div>
                    <div className="flex flex-row gap-2 items-center text-paragraph h-6 flex-1">
                        <MdTag color="#696C74" className="self-start" />
                        <div className="flex flex-1 gap-2 flex-wrap items-center">
                            {docTags.map((val) => <DocumentTag key={val.id} tagValues={val} removeTag={removeTag} changeTagName={changeTagName} />)}
                            <button className="w-6 h-6 flex items-center justify-center text-[#AEAEAE] bg-documentTagAddBg hover:bg-white hover:text-black" onClick={() => addNewTag()}>
                                <MdAdd />
                            </button>
                        </div>

                    </div>
                </div>
                <TextEditor updateText={updateTextFromEditor} text={text} />
            </div>
        </ResizeableSection>
    );
}

export default TextDocument;
