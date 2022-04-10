import { nanoid } from 'nanoid';
import * as React from 'react';
import TextDocument from '@/components/TextDocument';
import SearchResults from '@/components/SearchResults';

const DocumentPage = () => {
    return (
        <div>
            <TextDocument title={'Class Project 499 Capstone'} author={'Rahul Batra'} tags={[{ id: nanoid(), tagName: 'Research' }]} text={''} />
            <SearchResults />

        </div>
    );
}

export default DocumentPage;