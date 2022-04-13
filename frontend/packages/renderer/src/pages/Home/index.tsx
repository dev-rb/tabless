import { useDeleteDocumentMutation, useGetAllDocumentsQuery, useNewDocumentMutation } from "@/redux/api/documentEndpoints";
import { ITextDocument } from "@/types";
import { Button } from "@mantine/core";
import { getAuth } from "firebase/auth";
import { nanoid } from "nanoid";
import React from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { HiDocument } from 'react-icons/hi';

const auth = getAuth();

const HomePage = () => {

    const [createNewDocument] = useNewDocumentMutation();
    const [deleteDocumentWithId] = useDeleteDocumentMutation();
    const { data, isLoading, isFetching } = useGetAllDocumentsQuery();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleCreateNewDocument = () => {
        const newDocument: ITextDocument = { id: nanoid(), author: 'Rahul Batra', title: 'Untitled', tags: [], dateCreated: 'Today' };
        createNewDocument(newDocument);
        navigate(`/document/${newDocument.id}`, { replace: true, state: location.search });
    }

    const openDocument = (id: string) => {
        navigate(`/document/${id}`, { replace: true, state: location.search });
    }

    const deleteDocument = (id: string) => {
        deleteDocumentWithId(id);
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex flex-col justify-center items-center border-dashed border-2 border-[#707070] p-20 gap-16">
                {data?.length && !isLoading ?
                    <div className="flex flex-col gap-4 items-start w-full">
                        <h1 className="text-[#9D9D9D] text-3xl font-medium"> Recent Documents </h1>
                        {data.map((val) =>
                            <RecentDocument
                                key={val.id}
                                openDocument={() => openDocument(val.id)}
                                deleteDocument={() => deleteDocument(val.id)}
                                documentName={val.title}
                            />
                        )}
                    </div>
                    :
                    <h1 className="text-[#9D9D9D] text-3xl font-medium"> You have no recent documents. </h1>
                }

                <Button
                    className="bg-[#3071E8] w-72 hover:bg-[#457fec]"
                    leftIcon={<MdAdd size={20} />}
                    variant='filled'
                    size='md'
                    onClick={handleCreateNewDocument}
                >
                    Create New
                </Button>
            </div>
        </div>
    );
}

interface Props {
    documentName: string
    openDocument: () => void,
    deleteDocument: () => void
}

const RecentDocument = ({ openDocument, documentName, deleteDocument }: Props) => {
    return (
        <div className="flex flex-row justify-between w-full">
            <Button variant="filled" onClick={openDocument} leftIcon={<HiDocument color="white" />} className="text-xl"> {documentName} </Button>
            <Button variant="filled" onClick={deleteDocument} className="text-[#707070] hover:bg-red-600 hover:text-white text-xl p-1"> <MdDelete /> </Button>
        </div>
    );
}

export default HomePage;