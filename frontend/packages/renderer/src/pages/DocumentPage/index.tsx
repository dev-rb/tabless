import { nanoid } from 'nanoid';
import * as React from 'react';
import TextDocument from '@components/TextDocument';

const DocumentPage = () => {
    return (
        <div>
            <TextDocument title={'Class Project 499 Capstone'} author={'Rahul Batra'} tags={[{ id: nanoid(), tagName: 'Research' }]} text={''} />

        </div>
    );
}

export default DocumentPage;