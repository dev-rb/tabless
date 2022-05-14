import * as React from "react";
import { useGetAllDocumentsQuery, useNewDocumentMutation } from "@/redux/api/documentEndpoints";
import { IDocument, ITextDocument } from "@/types";
import { Button, Loader, Stack } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DocumentDisplayItem, DocumentItemDelete } from "@/components/DocumentDisplayItem";
import { useStyles } from "./styles";

const HomePage = () => {

    const { classes } = useStyles();

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
        <div className={classes.container}>
            <Stack justify={'center'} align={'center'} className={classes.inner}>
                {data?.length && !isLoading ?
                    <Stack spacing={'lg'} align={'start'}>
                        <h1 className={classes.title}> Recent Documents </h1>
                        {data.map((val) =>
                            <DocumentDisplayItem
                                key={val.id}
                                documentDetails={val}
                                onClick={() => openDocument(val.id)}
                                rightSection={<DocumentItemDelete documentId={val.id} />}
                            />
                        )}
                    </Stack>
                    :
                    isFetching ? <Loader /> :
                        <h1 className={classes.title}> You have no recent documents. </h1>
                }

                <Button
                    sx={{ width: '18rem' }}
                    leftIcon={<MdAdd size={20} />}
                    variant='filled'
                    size='md'
                    onClick={handleCreateNewDocument}
                >
                    Create New
                </Button>
            </Stack>
        </div>
    );
}

export default HomePage;