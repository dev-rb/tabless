import { useDeleteDocumentMutation, useGetAllDocumentsQuery, useNewDocumentMutation } from "@/redux/api/documentEndpoints";
import { IDocument, ITextDocument } from "@/types";
import { Button, Loader } from "@mantine/core";
import { getAuth } from "firebase/auth";
import { nanoid } from "nanoid";
import React from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { HiDocument } from 'react-icons/hi';

const auth = getAuth();

const HomePage = () => {

    const [createNewDocument] = useNewDocumentMutation();
    const [deleteDocumentWithId] = useDeleteDocumentMutation();
    const { data, isLoading, isFetching } = useGetAllDocumentsQuery();

    const navigate = useNavigate();
    const location = useLocation();

    const handleCreateNewDocument = () => {
        const newDocument: Pick<ITextDocument, 'author' | 'title'> = { author: 'Rahul Batra', title: 'Untitled' };
        createNewDocument(newDocument).unwrap().then((val: IDocument) => {
            // console.log("Response from create: ", val);
            navigate(`/document/${val.id}`, { replace: true, state: location.search });
        });
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
                                documentId={val.id}
                                deleteDocument={() => deleteDocument(val.id)}
                                documentName={val.title}
                            />
                        )}
                    </div>
                    :
                    isFetching ? <Loader /> :
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
    documentId: string,
    documentName: string
    deleteDocument: () => void
}

const RecentDocument = ({ documentId, documentName, deleteDocument }: Props) => {
    const location = useLocation();
    return (
        <div className="flex flex-row justify-between w-full">
            <Link className="flex gap-2 items-center text-xl px-0 text-[#707070] hover:text-white" to={`/document/${documentId}`} replace state={location.search} > <HiDocument /> {documentName} </Link>
            <Button variant="filled" onClick={deleteDocument} className="text-[#707070] hover:bg-red-600 hover:text-white text-xl p-1"> <MdDelete /> </Button>
        </div>
    );
}

export default HomePage;