import * as React from 'react';
import SearchResults from '@/pages/DocumentPage/SearchResults';
import { useParams } from 'react-router-dom';
import { useGetDocumentQuery } from '@/redux/api/documentEndpoints';
import { Box, Group, LoadingOverlay } from '@mantine/core';
import { useGenerateSearchResults } from '@/hooks/useGenerateSearchResults';
import PdfWindow from '@/pages/DocumentPage/PdfWindow';
import { TextDocument } from './TextDocument';
import { IRootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useGetAllPdfsForDocumentQuery } from '@/redux/api/pdfEndpoints';


const DocumentPage = () => {

    const { documentId } = useParams();

    const { data, isFetching, isError } = useGetDocumentQuery(documentId!);

    const [documentText, setDocumentText] = React.useState('');

    const { results, isLoading, error } = useGenerateSearchResults(documentText);


    const updateText = (newVal: string) => {
        setDocumentText(newVal);
    }

    return (
        <Group dir='horizontal' sx={{ gap: '1rem', height: '100%', position: 'relative' }} noWrap>
            {
                data && !isFetching ? <TextDocument updateText={updateText} {...data} />
                    :
                    <Box sx={{ maxWidth: '48rem', width: '100%', height: '100%', position: 'relative' }}>
                        <LoadingOverlay visible={isFetching || !data} overlayColor={'#28282B'} overlayOpacity={0.8} />
                    </Box>
            }
            <PdfWindow pdfs={data?.pdfs} />

            <SearchResults searchResults={results} isLoading={isLoading} />

        </Group>
    );
}

export default DocumentPage;