import * as React from 'react';
import { ITextDocumentTag } from "/@/types";
import { Button, Group, TextInput, UnstyledButton } from '@mantine/core';
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
            inputRef.current.size = 1;
        }
    }, [])

    return (
        <Group align='center' position='center' noWrap sx={{ height: '1.5rem', width: 'min-content', padding: '0 0.5rem', backgroundColor: '#424247', color: '#9E9E9E', gap: '0.75rem' }} >
            <TextInput ref={inputRef} placeholder='Untitled' value={name}
                type="text"
                styles={{ input: { color: 'white', background: 'none', border: 'none', padding: 0, textOverflow: 'ellipsis', wordWrap: 'break-word', width: 'fit-content' } }}
                autoFocus={title.length === 0} onChange={onTextChange} onBlur={handleBlur} />
            {/* <p> {tagName} </p> */}
            <UnstyledButton sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#6F6F71', ':hover': { color: 'red' } }} onClick={() => removeTag(id)}> <MdClose size={16} /> </UnstyledButton>

        </Group>
    );
}

export default DocumentTag;