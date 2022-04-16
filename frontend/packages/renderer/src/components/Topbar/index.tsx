import { Accordion, AccordionItem, Avatar, Burger, Button, CSSObject, Drawer, Group, Loader, Menu, MenuItem, Space, Switch } from '@mantine/core';
import * as React from 'react';
import { MdExpandMore, MdFolder, MdHome, MdLogout, MdPerson } from 'react-icons/md';
import { HiDocument } from 'react-icons/hi';
import { useGetAllDocumentsQuery } from '@/redux/api/documentEndpoints';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutLocal } from '@/redux/slices/authSlice';
import { getAuth, signOut } from 'firebase/auth';

const drawerStyles: CSSObject = {
    height: '70%',
    margin: 'auto',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    background: '#31343B'
}

const TopBar = () => {

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <div className="w-full h-fit justify-center px-6 py-1 border-b-[1px] border-[#A2A2A3]">
            <Drawer
                opened={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                closeOnClickOutside={true}
                withCloseButton={false}
                padding="lg"
                size={"sm"}
                overlayOpacity={0}
                styles={{ drawer: drawerStyles }}
            >
                <DrawerContent />
            </Drawer>
            <Group position='apart'>
                <Burger opened={drawerOpen} color='white' size={'sm'} onClick={() => setDrawerOpen((prev) => !prev)} />
                <Switch></Switch>
            </Group>
        </div>
    );
}

export default TopBar;

const AccordionLabel = () => {
    return (
        <div className="flex flex-row gap-2 items-center text-md font-normal text-[#797E8A]">
            <MdFolder size={24} color="#B24323" />
            <h6 className="text-ellipsis overflow-hidden whitespace-nowrap"> School </h6>
        </div>
    );
}

interface DrawerDocumentProps {
    documentName: string,
    documentId: string
}

const DrawerDocument = ({ documentName, documentId }: DrawerDocumentProps) => {
    return (
        <Link className="flex flex-row gap-2 items-center text-md font-normal text-[#797E8A] hover:bg-gray-600 p-1 rounded-sm" to={`/document/${documentId}`}>
            <HiDocument size={34} />
            <h6 className="text-ellipsis overflow-hidden whitespace-nowrap"> {documentName} </h6>
        </Link>
    );
}


const DrawerContent = () => {

    const { data, isLoading } = useGetAllDocumentsQuery();
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
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-row items-center gap-4">
                <Avatar radius={"xl"} size={"md"} styles={{ placeholder: { background: '#31343B' }, root: { border: '2px solid #797E8A' } }} >
                    <MdPerson size={24} />
                </Avatar>
                <div className="flex flex-col text-white">
                    <h4 className="text-lg"> Rahul's Space </h4>
                    <p className="text-[#797E8A] text-sm"> {data && data.length} documents </p>
                </div>
                <Menu trigger='hover' closeOnItemClick>
                    <MenuItem icon={<MdLogout />} onClick={signUserOut}> Sign out </MenuItem>
                </Menu>
            </div>
            <Button variant='filled' size='lg' onClick={() => navigate('/')} leftIcon={<MdHome color="white" />}> Home </Button>
            <div className="flex flex-col text-[#797E8A] gap-2">
                <h1 className="uppercase text-sm font-bold"> Recent </h1>
                <div className="flex flex-col">
                    {data && !isLoading ? data.map((val) => <DrawerDocument key={val.id} documentId={val.id} documentName={val.title} />) : <Loader />}
                </div>
            </div>
            <div className="flex flex-col text-[#797E8A] gap-2">
                <h1 className="uppercase text-sm font-bold"> Folders </h1>
                <Accordion>
                    <AccordionItem label={<AccordionLabel />} styles={{ icon: { color: 'white' }, control: { ":hover": { backgroundColor: '#41444B' }, padding: '4px' } }}>
                        {/* <DrawerDocument documentName="Random test document" /> */}
                    </AccordionItem>
                </Accordion>
                <div className="flex flex-col">

                </div>
            </div>
        </div>
    );
}