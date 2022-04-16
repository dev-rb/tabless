import { nanoid } from 'nanoid';
import * as React from 'react';
import TextDocument from '@/components/TextDocument';
import SearchResults from '@/components/SearchResults';
import PdfViewer from '@/components/PdfViewer';
import { useParams } from 'react-router-dom';
import { useGetDocumentQuery } from '@/redux/api/documentEndpoints';
import { LoadingOverlay } from '@mantine/core';
import { useGenerateSearchResults } from '@/hooks/useGenerateSearchResults';

const DocumentPage = () => {

    const { documentId } = useParams();

    const { data, isFetching, isError } = useGetDocumentQuery(documentId!);

    const [documentText, setDocumentText] = React.useState('');

    const { results, isLoading, error } = useGenerateSearchResults(documentText);

    const updateText = (newVal: string) => {
        setDocumentText(newVal);
    }

    return (
        <div className="flex flex-row gap-4 h-full pl-10">
            {
                data && !isFetching ? <TextDocument updateText={updateText} {...data} />
                    :
                    <div className="max-w-3xl w-full h-full relative">
                        <LoadingOverlay visible={isFetching || !data} overlayColor={'#28282B'} overlayOpacity={0.8} />
                    </div>
            }
            <PdfViewer />
            <SearchResults searchResults={results} isLoading={isLoading} />

        </div>
    );
}

export default DocumentPage;