import * as React from 'react';
import { ActionIcon, Box, Burger, CSSObject, Drawer, Group } from '@mantine/core';
import { DrawerContent } from './Drawer';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { history } from '../HistoryRouter/history';
import DocumentOptions from './DocumentOptions';
import FolderOptions from './FolderOptions';

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

    const getOptionsForPage = React.useCallback(() => {
        if (location.pathname.includes('document')) {
            return <DocumentOptions />
        } else if (location.pathname.includes('folder')) {
            return <FolderOptions />
        }
    }, [location])

    React.useLayoutEffect(() => {
        updatePaths();
    }, [location])

    React.useEffect(() => {
        console.log("Current paths: ", locationPaths)
    }, [locationPaths])

    return (
        <Box sx={{ width: '100%', height: 'fit-content', padding: '0.5rem 1.5rem' }}>
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
            <Group align={'center'} sx={{ width: '100%' }}>
                <Burger opened={drawerOpen} color='white' size={'sm'} onClick={() => setDrawerOpen((prev) => !prev)} />
                <Group align={'center'} sx={{ gap: '0.25rem', marginLeft: '1rem' }}>
                    <ActionIcon onClick={() => navigate(-1)} styles={{ root: { backgroundColor: locationPaths.length > 0 ? 'blue !important' : 'red !important' } }}>
                        <FaArrowLeft />
                    </ActionIcon>
                    <ActionIcon onClick={() => navigate(1)} styles={{ root: { backgroundColor: locationPaths.length > 0 ? 'blue !important' : 'red !important' } }}>
                        <FaArrowRight />
                    </ActionIcon>
                </Group>
                <Box sx={{ marginLeft: 'auto' }}>
                    {getOptionsForPage()}
                </Box>
            </Group>
        </Box>
    );
}

export default TopBar;