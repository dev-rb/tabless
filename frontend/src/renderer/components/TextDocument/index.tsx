import * as React from 'react';
import {MdPerson, MdTag} from 'react-icons/md';
import TextEditor from '../TextEditor';

interface IDoc {
    title: string,
    author: string,
    tags: string[],
    dateCreated?: string
    text: string
}

const TextDocument = ({ title, author, tags, text, dateCreated }: IDoc) => {
    return (
        <div className="max-w-3xl w-full h-full flex flex-col justify-start">
            <div className="flex flex-col gap-4">
                <h1 className="text-white font-semibold text-3xl"> {title} </h1>
                <div className="flex flex-row gap-2 items-center text-paragraph">
                    <MdPerson color="#696C74"/>
                    <p > {author} </p>
                </div>
                <div className="flex flex-row gap-2 items-center text-paragraph">
                    <MdTag color="#696C74"/>
                    <p> {tags} </p>
                </div>
            </div>
            <TextEditor />
        </div>
    );
}

export default TextDocument;