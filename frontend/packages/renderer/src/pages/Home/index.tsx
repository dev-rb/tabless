import * as React from "react";
import { useGetAllDocumentsQuery, useNewDocumentMutation } from "@/redux/api/documentEndpoints";
import { IDocument, ITextDocument } from "@/types";
import { Loader } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/PrimaryButton";
import { DocumentDisplayItem, DocumentItemDelete } from "@/components/DocumentDisplayItem";

const HomePage = () => {

    const [createNewDocument] = useNewDocumentMutation();
    const { data, isLoading, isFetching } = useGetAllDocumentsQuery();

    const navigate = useNavigate();

    const handleCreateNewDocument = () => {
        const newDocument: Pick<ITextDocument, 'author' | 'title'> = { author: 'Rahul Batra', title: 'Untitled' };
        createNewDocument(newDocument).unwrap().then((val: IDocument) => {
            // console.log("Response from create: ", val);
            navigate(`/document/${val.id}`);
        });
    }

    const openDocument = (documentId: string) => {
        navigate(`/document/${documentId}`);
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex flex-col justify-center items-center border-dashed border-2 border-[#707070] p-20 gap-16">
                {data?.length && !isLoading ?
                    <div className="flex flex-col gap-4 items-start w-full">
                        <h1 className="text-[#9D9D9D] text-3xl font-medium"> Recent Documents </h1>
                        {data.map((val) =>
                            <DocumentDisplayItem
                                key={val.id}
                                documentDetails={val}
                                onClick={() => openDocument(val.id)}
                                rightSection={<DocumentItemDelete documentId={val.id} />}
                            />
                        )}
                    </div>
                    :
                    isFetching ? <Loader /> :
                        <h1 className="text-[#9D9D9D] text-3xl font-medium"> You have no recent documents. </h1>
                }

                <PrimaryButton
                    leftIcon={<MdAdd size={20} />}
                    variant='filled'
                    size='md'
                    onClick={handleCreateNewDocument}
                >
                    Create New
                </PrimaryButton>
            </div>
        </div>
    );
}

export default HomePage;