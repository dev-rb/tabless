import * as React from 'react';
import { useGetAllDocumentsQuery } from "@/redux/api/documentEndpoints";
import { signOutLocal } from "@/redux/slices/authSlice";
import { Avatar, Loader, Accordion, AccordionItem, Menu, MenuItem, createStyles, UnstyledButton, Group, Text } from "@mantine/core";
import { getAuth, signOut } from "firebase/auth";
import { HiDocument } from "react-icons/hi";
import { MdFolder, MdPerson, MdLogout, MdHome, MdChevronRight } from "react-icons/md";
import { FaCaretUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllFoldersQuery } from '@/redux/api/folderEndpoints';

interface AccordionFolderDetails {
    folderName: string
}

const AccordionLabel = ({ folderName }: AccordionFolderDetails) => {
    return (
        <div className="flex flex-row gap-2 items-center text-md font-normal ">
            <MdFolder size={24} />
            <h6 className="text-ellipsis overflow-hidden whitespace-nowrap"> {folderName} </h6>
        </div>
    );
}

interface DrawerDocumentProps {
    documentName: string,
    documentId: string
}

const DrawerDocument = ({ documentName, documentId }: DrawerDocumentProps) => {
    return (
        <Link title={documentName} className="flex flex-row gap-2 items-center text-md font-normal text-[#797E8A] hover:bg-gray-600 hover:text-white p-1 rounded-sm" to={`/document/${documentId}`}>
            <HiDocument size={25} />
            <h6 className="text-ellipsis overflow-hidden whitespace-nowrap"> {documentName} </h6>
        </Link>
    );
}

const useStyles = createStyles({
    arrow: {
        color: 'white'
    }
})

export const DrawerContent = () => {

    const { data, isLoading } = useGetAllDocumentsQuery();
    const { data: foldersData } = useGetAllFoldersQuery();

    const { classes } = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth();

    const signUserOut = () => {
        signOut(auth).then(() => {
            setTimeout(() => {
                dispatch(signOutLocal());
            }, 500)
        });
    }

    React.useEffect(() => {
        console.log(foldersData)
    }, [foldersData])

    return (
        <div className="flex flex-col gap-4">
            <Menu
                closeOnItemClick
                control={<UserButton documentCount={data ? data.length : 0} userName='Rahul' userImage='' />}
            >
                <MenuItem icon={<MdLogout />} onClick={signUserOut}> Sign out </MenuItem>
            </Menu>
            <Link className="flex gap-2 items-center text-lg p-1 text-[#797E8A] hover:text-white hover:bg-gray-600 rounded-sm" to={'/'} > <MdHome /> Home </Link>
            <Link className="flex gap-2 items-center text-lg p-1 text-[#797E8A] hover:text-white hover:bg-gray-600 rounded-sm" to={'/folders'} > <MdFolder /> Folders </Link>
            {/* <Button variant='filled' size='lg' onClick={() => navigate('/')} leftIcon={<MdHome color="white" />}> Home </Button> */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col text-[#797E8A] gap-2">
                    <h1 className="uppercase text-sm font-bold"> Recent </h1>
                    <div className="flex flex-col">
                        {data && !isLoading ? data.map((val) => <DrawerDocument key={val.id} documentId={val.id} documentName={val.title} />) : <Loader />}
                    </div>
                </div>
                <div className="flex flex-col text-[#797E8A] gap-2">
                    <h1 className="uppercase text-sm font-bold"> Folders </h1>
                    <Accordion className="flex flex-col gap-4">
                        {foldersData && foldersData.map((val) =>
                            <AccordionItem
                                key={val.id}
                                icon={<FaCaretUp />}
                                label={<AccordionLabel folderName={val.name} />}
                                styles={
                                    { icon: { color: '#797E8A', marginRight: 0, }, item: { paddingBottom: '10px', borderColor: '#4B4F5A' }, control: { color: '#797E8A', ".__mantine-ref-icon": { transform: 'rotate(90deg)' }, ":hover": { backgroundColor: '#4b5563', '> div': { color: 'white !important' } }, padding: '4px' } }
                                }
                            >
                                {val.documents && val.documents.map((doc) => <DrawerDocument key={doc.id} documentName={doc.title} documentId={doc.id} />)}
                            </AccordionItem>
                        )}

                    </Accordion>
                    <div className="flex flex-col">

                    </div>
                </div>
            </div>
        </div>
    );
}

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    userImage: string,
    userName: string,
    documentCount: number
    icon?: React.ReactNode
}

const UserButton = React.forwardRef<HTMLButtonElement, UserButtonProps>(({ userImage, userName, documentCount, icon, ...others }: UserButtonProps, ref) => {
    return (
        <UnstyledButton
            ref={ref}
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                color: 'white'
            })}
            {...others}
        >
            <Group>
                <Avatar src={userImage} radius="xl" size="md" styles={{ placeholder: { background: '#31343B' }, root: { border: '2px solid #797E8A' } }} >
                    <MdPerson size={20} />
                </Avatar>

                <div className="flex-1">
                    <Text size="sm" weight={500}>
                        {userName}'s Space
                    </Text>

                    <Text color="dimmed" size="xs">
                        {documentCount} documents
                    </Text>

                </div>

                {icon || <MdChevronRight size={16} />}

            </Group>
        </UnstyledButton>
    );
})