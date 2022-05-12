import * as React from 'react';
import { Burger, CSSObject, Drawer, Group, Switch } from '@mantine/core';
import { DrawerContent } from './components/Drawer';

const drawerStyles: CSSObject = {
    height: '70%',
    margin: 'auto',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    background: '#31343B',
}

const TopBar = () => {

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <div className="w-full h-fit justify-center px-6 py-1 border-b-[1px] border-[#A2A2A3] z-50">
            <Drawer
                opened={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                closeOnClickOutside={true}
                withCloseButton={false}
                padding="xs"
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