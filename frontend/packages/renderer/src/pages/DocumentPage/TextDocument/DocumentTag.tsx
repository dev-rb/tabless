import * as React from 'react';
import { ITextDocumentTag } from "@/types";
import { TextInput } from '@mantine/core';
import { MdClose } from 'react-icons/md';

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

export default DocumentTag;