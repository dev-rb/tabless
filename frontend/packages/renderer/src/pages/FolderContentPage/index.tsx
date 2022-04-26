import { useGetFolderQuery } from '@/redux/api/folderEndpoints';
import * as React from 'react';
import { HiDocument } from 'react-icons/hi';
import { useParams } from 'react-router-dom';

const FolderContentPage = () => {

    const { folderId } = useParams();
    // const { data, isLoading, isFetching } = useGetFolderQuery(folderId!);

    return (
        <div className="w-full h-full">
            {/* {data && data.documents.map((val) =>
                <button className="w-full max-w-sm h-fit max-h-32 p-4 flex gap-4 text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]">
                    <HiDocument />
                    <h6> {val.title} </h6>
                </button>
            )
            } */}
            <button className="w-full max-w-sm h-fit max-h-32 p-4 flex gap-4 text-[#6A6A6A] text-lg items-center rounded-sm border-[1px] border-[#44444A] hover:text-white hover:border-[#3071E8]">
                <HiDocument />
                <h6> Document Title for folder: {folderId} </h6>
            </button>
        </div>
    );
}

export default FolderContentPage;