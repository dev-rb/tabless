import { nanoid } from 'nanoid';
import * as React from 'react';
import TextDocument from '@/components/TextDocument';
import SearchResults from '@/components/SearchResults';
import PdfViewer from '@/components/PdfViewer';
import { useParams } from 'react-router-dom';
import { useGetDocumentQuery } from '@/redux/api/documentEndpoints';
import { LoadingOverlay } from '@mantine/core';

const DocumentPage = () => {

    const { documentId } = useParams();

    const { data, isFetching, isError } = useGetDocumentQuery(documentId!);

    return (
        <div className="flex flex-row gap-4 h-full pl-10">
            {
                data && !isFetching ? <TextDocument {...data} />
                    :
                    <div className="max-w-3xl w-full h-full relative">
                        <LoadingOverlay visible={isFetching || !data} overlayColor={'#28282B'} overlayOpacity={0.8} />
                    </div>
            }
            <PdfViewer />
            <SearchResults />

        </div>
    );
}

export default DocumentPage;