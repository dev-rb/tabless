import { Input, Loader, MANTINE_SIZES, TextInput } from '@mantine/core';
import * as React from 'react';
import { MdAdd, MdClose, MdPerson, MdTag } from 'react-icons/md';
import TextEditor from '../TextEditor';
import { nanoid } from 'nanoid';
import { ITextDocument, ITextDocumentTag } from '@/types';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useUpdateDocumentMutation } from '@/redux/api/documentEndpoints';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';

const TextDocument = ({ title, author, tags, text, dateCreated, id }: ITextDocument) => {

    const [docTitle, setDocTitle] = React.useState<string>(title);
    const [docTags, setDocTags] = React.useState<ITextDocumentTag[]>(tags);

    const [updateDocumentMutation, { isLoading, status }] = useUpdateDocumentMutation();

    const updateDocument = () => {
        console.log("Update called!")
        updateDocumentMutation({ title: docTitle, author, tags, text, dateCreated, id })
    }

    const { onInputChange } = useAutoSave({ callback: updateDocument });

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
        <div className="max-w-3xl w-full h-full flex flex-col justify-start">
            <div className="flex flex-col gap-4 relative">
                {isLoading && (status === QueryStatus.pending) &&
                    <div className="text-blue-600 absolute -top-8 left-0 flex flex-row gap-2">
                        <Loader size='sm' />
                        <p> Autosaving... </p>
                    </div>
                }
                <TextInput placeholder='Untitled' value={docTitle}
                    type="text"
                    styles={{ input: { color: 'white', background: 'none', border: 'none', fontSize: '1.875rem', fontWeight: '600', padding: 0, textOverflow: 'ellipsis', wordWrap: 'break-word' } }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setDocTitle(e.target.value); onInputChange(e.target.value); }} />

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
            <TextEditor />
        </div>
    );
}

export default TextDocument;

interface DocumentTagProps {
    tagValues: ITextDocumentTag,
    removeTag: (tagId: string) => void,
    changeTagName: (tagId: string, newText: string) => void
}

const DocumentTag = ({ tagValues, removeTag, changeTagName }: DocumentTagProps) => {

    const { id, title } = tagValues;

    const [name, setName] = React.useState(title);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleBlur = () => {
        if (name.length === 0) {
            removeTag(id);
        }

        return;
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (inputRef.current) {
            inputRef.current.size = e.target.value.length === 0 ? 1 : e.target.value.length + 1;
        }
    }

    React.useEffect(() => {
        changeTagName(id, name);
    }, [name])

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.size = 6;
        }
    }, [])

    return (
        <div className="flex w-min h-6 px-2 bg-documentTagBg items-center justify-center text-documentTagText text-sm gap-3">
            <TextInput ref={inputRef} placeholder='Untitled' value={name}
                type="text"
                styles={{ input: { color: 'white', background: 'none', border: 'none', padding: 0, textOverflow: 'ellipsis', wordWrap: 'break-word', width: 'fit-content' } }}
                autoFocus={title.length === 0} onChange={onTextChange} onBlur={handleBlur} />
            {/* <p> {tagName} </p> */}
            <button className="text-[#6F6F71] hover:text-red-600" onClick={() => removeTag(id)}> <MdClose size={16} /> </button>

        </div>
    );
}