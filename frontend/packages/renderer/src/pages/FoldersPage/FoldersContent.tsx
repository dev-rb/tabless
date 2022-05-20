import * as React from 'react';
import { useGetFolderQuery } from '/@/redux/api/folderEndpoints';
import { Grid, Loader } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentDisplayItem } from '/@/components/DocumentDisplayItem';
import { IDocument, ITextDocument } from '/@/types';

const FolderContentPage = () => {

    const { folderId } = useParams();

    if (!folderId) {
        return;
    }

    const { documents: folderData } = useGetFolderQuery(folderId!, {
        refetchOnMountOrArgChange: true,
        selectFromResult: ({ data }) => { console.log(data); return ({ documents: data?.documents }); }
    });

    const navigate = useNavigate();

    const openDocument = (documentId: string) => {
        navigate(`/document/${documentId}`);
    }


    React.useEffect(() => {
        if (folderData) {
            console.log(folderData)
        }
    }, [folderData])

    return (
        <Grid gutter={32} columns={4} sx={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* {(data && data.documents) && Array.from(data.documents).map((val) => <DocumentItem key={val.id} documentInfo={val} />)} */}
            {(folderData) ?
                folderData.map((value: IDocument | ITextDocument) =>
                    <Grid.Col key={value.id} span={1}>
                        <DocumentDisplayItem
                            documentDetails={value}
                            onClick={() => openDocument(value.id)}
                        />
                    </Grid.Col>

                )
                : <Loader />
            }
        </Grid>
    );
}

export default FolderContentPage;