import * as React from 'react';
import { useGetAllDocumentsQuery } from "@/redux/api/documentEndpoints";
import { signOutLocal } from "@/redux/slices/authSlice";
import { Avatar, Loader, Accordion, AccordionItem, Menu, MenuItem, createStyles, UnstyledButton, Group, Text, Stack, Anchor, Button, Title } from "@mantine/core";
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
    const { classes } = useStyles();
    return (
        <Group align={'center'} spacing='md'>
            <MdFolder size={24} />
            <Text size='md' weight={400} className={classes.documentName}> {folderName} </Text>
        </Group>
    );
}

interface DrawerDocumentProps {
    documentName: string,
    documentId: string
}

const DrawerDocument = ({ documentName, documentId }: DrawerDocumentProps) => {
    const { classes } = useStyles();
    return (
        <UnstyledButton title={documentName} component={Link} className={classes.link} to={`/document/${documentId}`} >   <HiDocument size={25} /> <h6 className={classes.documentName}> {documentName} </h6> </UnstyledButton>

    );
}

const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        color: theme.colors.dark[5],
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
        padding: '0.25rem',
        borderRadius: 2,
        ':hover': {
            color: 'white',
            backgroundColor: theme.colors.dark[5]
        }
    },
    documentName: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: 0,
    }
}))

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
        <Stack spacing={'sm'}>
            <Menu
                closeOnItemClick
                control={<UserButton documentCount={data ? data.length : 0} userName='Rahul' userImage='' />}
            >
                <MenuItem icon={<MdLogout />} onClick={signUserOut}> Sign out </MenuItem>
            </Menu>
            <UnstyledButton component={Link} className={classes.link} to={'/'} >  <MdHome /> Home </UnstyledButton>
            <UnstyledButton component={Link} className={classes.link} to={'/folders'}> <MdFolder /> Folders </UnstyledButton>
            {/* <Button variant='filled' size='lg' onClick={() => navigate('/')} leftIcon={<MdHome color="white" />}> Home </Button> */}
            <Stack sx={{ gap: '1.5rem' }}>
                <Stack sx={{ gap: '0.5rem' }}>
                    <Text size='xl' color="#777e8d"> Recent </Text>
                    {/* <h1 className="uppercase text-sm font-bold"> Recent </h1> */}
                    <Stack className="flex flex-col">
                        {data && !isLoading ? data.map((val) => <DrawerDocument key={val.id} documentId={val.id} documentName={val.title} />) : <Loader />}
                    </Stack>
                </Stack>
                <Stack sx={{ gap: '0.5rem' }}>
                    <Text size='xl' sx={{ color: '#797E8A' }}> Folders </Text>
                    {/* <h1 className="uppercase text-sm font-bold"> Folders </h1> */}
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
                </Stack>
            </Stack>
        </Stack>
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