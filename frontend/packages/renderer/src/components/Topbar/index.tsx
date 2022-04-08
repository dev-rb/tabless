import { Accordion, AccordionItem, Avatar, Burger, CSSObject, Drawer, Group, Space, Switch } from '@mantine/core';
import * as React from 'react';
import { MdExpandMore, MdFolder, MdPerson } from 'react-icons/md';
import { HiDocument } from 'react-icons/hi';

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
        <div className="w-full h-12 pr-6">
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
                <Burger opened={drawerOpen} color='white' onClick={() => setDrawerOpen((prev) => !prev)} />
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

const DrawerDocument = () => {
    return (
        <div className="flex flex-row gap-2 items-center text-md font-normal text-[#797E8A]">
            <HiDocument size={34} />
            <h6 className="text-ellipsis overflow-hidden whitespace-nowrap"> Class 499 Project Capstone </h6>
        </div>
    );
}


const DrawerContent = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-row items-center gap-4">
                <Avatar radius={"xl"} size={"md"} styles={{ placeholder: { background: '#31343B' }, root: { border: '2px solid #797E8A' } }} >
                    <MdPerson size={24} />
                </Avatar>
                <div className="flex flex-col text-white">
                    <h4 className="text-lg"> Rahul's Space </h4>
                    <p className="text-[#797E8A] text-sm"> 20 documents </p>
                </div>
            </div>

            <div className="flex flex-col text-[#797E8A] gap-2">
                <h1 className="uppercase text-sm font-bold"> Recent </h1>
                <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center text-md font-normal">
                        <HiDocument size={34} />
                        <h6 className="text-ellipsis overflow-hidden whitespace-nowrap"> Class 499 Project Capstone </h6>
                    </div>
                </div>
            </div>
            <div className="flex flex-col text-[#797E8A] gap-2">
                <h1 className="uppercase text-sm font-bold"> Folders </h1>
                <Accordion>
                    <AccordionItem label={<AccordionLabel />} styles={{ icon: { color: 'white' }, control: { ":hover": { backgroundColor: '#41444B' }, padding: '4px' } }}>
                        <DrawerDocument />
                    </AccordionItem>
                </Accordion>
                <div className="flex flex-col">

                </div>
            </div>
        </div>
    );
}