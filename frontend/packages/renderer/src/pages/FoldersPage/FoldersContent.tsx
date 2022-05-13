import * as React from 'react';
import { useGetFolderQuery } from '@/redux/api/folderEndpoints';
import { ITextDocument } from '@/types';
import { Loader, Menu, MenuItem } from '@mantine/core';
import { HiDocument } from 'react-icons/hi';
import { MdShortText, MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentDisplayItem, DocumentItemMenu } from '@/components/DocumentDisplayItem';

const FolderContentPage = () => {

    const { folderId } = useParams();
    const { documents: folderData } = useGetFolderQuery(folderId!, {
        selectFromResult: ({ data }) => { console.log(data); return ({ documents: data?.documents }); }
    });

    const navigate = useNavigate();

    const openDocument = (documentId: string) => {
        navigate(`documents/${documentId}`);
    }


    React.useEffect(() => {
        if (folderData) {
            console.log(folderData)
        }
    }, [folderData])

    return (
        <div className="w-full h-full grid grid-cols-[repeat(auto-fill,20rem)] gap-8">
            {/* {(data && data.documents) && Array.from(data.documents).map((val) => <DocumentItem key={val.id} documentInfo={val} />)} */}
            {(folderData) ?
                folderData.map((value) =>
                    <DocumentDisplayItem
                        key={value.id}
                        documentDetails={value}
                        rightSection={<DocumentItemMenu />}
                        onClick={() => openDocument(value.id)}
                    />
                )
                : <Loader />
            }
        </div>
    );
}

export default FolderContentPage;