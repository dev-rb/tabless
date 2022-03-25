import { Burger, Drawer, Group, Switch } from '@mantine/core';
import * as React from 'react';

const TopBar = () => {

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return(
        <div className="w-full h-12">
            <Drawer
                opened={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                padding="xl"
                size="md"
                >
                {/* Drawer content */}
            </Drawer>
            <Group position='apart'>
                <Burger opened={drawerOpen} color='white' onClick={() => setDrawerOpen((prev) => !prev)}></Burger>
                <Switch></Switch>
            </Group>
        </div>
    );
}

export default TopBar;