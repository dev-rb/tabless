import * as React from 'react';
import { ActionIcon, Burger, CSSObject, Drawer, Group, Switch } from '@mantine/core';
import { DrawerContent } from './components/Drawer';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useLocation, Location, useNavigate } from 'react-router-dom';
import { history } from '../HistoryRouter/history';

const drawerStyles: CSSObject = {
    height: '70%',
    margin: 'auto',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    background: '#31343B',
}

const TopBar = () => {

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [locationPaths, setLocationPaths] = React.useState<string[]>([]);

    const location = useLocation();
    const navigate = useNavigate();

    const updatePaths = () => {
        console.log(history)

        switch (history.action) {
            case "POP":
                {
                    let copy = [...locationPaths];
                    copy.pop();
                    setLocationPaths([...copy])
                    break;
                }
            case "PUSH":
                {
                    let copy = [...locationPaths];
                    copy.push(history.location.pathname);
                    setLocationPaths([...copy])
                    break;
                }
            default:
                break;
        }

    }

    React.useLayoutEffect(() => {
        updatePaths();
    }, [location])

    return (
        <div className="w-full h-fit justify-center px-6 py-1">
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
            <div className="flex items-center w-full">
                <Burger opened={drawerOpen} color='white' size={'sm'} onClick={() => setDrawerOpen((prev) => !prev)} />
                <div className="flex items-center gap-1 ml-4">
                    <ActionIcon onClick={() => navigate(-1)} styles={{ root: { backgroundColor: locationPaths.length > 0 ? 'blue !important' : 'red !important' } }}>
                        <FaArrowLeft />
                    </ActionIcon>
                    <ActionIcon onClick={() => navigate(1)} styles={{ root: { backgroundColor: locationPaths.length > 0 ? 'blue !important' : 'red !important' } }}>
                        <FaArrowRight />
                    </ActionIcon>
                </div>
                <div className="ml-auto">
                    <Switch></Switch>
                </div>
            </div>
        </div>
    );
}

export default TopBar;