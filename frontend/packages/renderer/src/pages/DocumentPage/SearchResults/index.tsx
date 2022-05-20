import * as React from 'react';
import { ISearchResult } from '/@/types';
import { Anchor, Avatar, Button, Divider, Group, Loader, Text, Title } from '@mantine/core';
import { nanoid } from 'nanoid';
import { MdBookmark, MdCopyAll, MdSearch } from 'react-icons/md';

interface Props {
    searchResults: ISearchResult[],
    isLoading: boolean
}

const SearchResults = ({ searchResults, isLoading }: Props) => {

    const openWindow = () => {
        window.openWindow.openExternalWindow('https://github.com')

    }

    return (
        <Group direction='column' align={'center'} noWrap sx={{ minWidth: 'min-content', maxWidth: '24rem', width: '100%', height: '100%', gap: '0.5rem', paddingLeft: '1rem', paddingTop: '2rem' }}>
            {/* <Group noWrap align={'center'} position='apart' sx={{ maxWidth: '24rem', width: '100%', height: '2.75rem', 'padding': '0 1rem', borderRadius: '4px', border: '1px solid #A67AE9', color: '#707071' }}>
                <p> Search keywords </p>
                <MdSearch size={25} />
            </Group>
            <Divider my='sm' sx={{ width: '50%', height: '1px', backgroundColor: '#37373A', alignSelf: 'center', borderRadius: '9999px' }} /> */}
            <Group spacing={0} sx={{ alignSelf: 'start', width: '100%' }}>
                <Group spacing={0} noWrap sx={{ alignSelf: 'start', width: '100%' }} position='apart'>
                    <Title order={3} sx={{ color: 'white' }}> Search Results </Title>
                    <Button> Clear </Button>
                </Group>

                <Divider my='sm' sx={{ width: '100%', height: '1px', backgroundColor: '#37373A', alignSelf: 'center', borderRadius: '9999px' }} />
            </Group>
            <Group direction='column' sx={{ overflowY: 'auto', height: '100%', width: '100%' }} position='center' noWrap>
                {/* <ResultItem
                    title={'Some Search result'}
                    url={'https://api.faviconkit.com/www.hollywoodsoapbox.com/192'}
                    description={'Some search result description...'}
                    favicons={{
                        high_res: 'https://api.faviconkit.com/www.hollywoodsoapbox.com/192',
                        low_res: 'https://www.google.com/s2/favicons?sz=64&domain_url=www.hollywoodsoapbox.com'
                    }}
                /> */}
                {/* <ResultItem description='' favicons={{ high_res: '', low_res: '' }} title='' url='https://github.com' /> */}
                {isLoading ? <Loader /> : searchResults.map((val) => <ResultItem key={nanoid()} {...val} />)}
                {/* {searchResults.map((val) => <ResultItem key={val.url} {...val} />)} */}
            </Group>

            {/* <Button onClick={openWindow} > Open Test </Button> */}
        </Group>
    );
}

export default SearchResults;

const ResultItem = ({ description, title, favicons, url }: ISearchResult) => {

    const saveSearchResult = () => {

    }

    const copyToClipboard = () => {

    }

    const openUrl = (url: string) => {
        window.openWindow.openExternalWindow(url)
    }

    return (
        <Group direction='column' sx={{ height: 'fit-content', width: '100%', backgroundColor: '#28282B', gap: '1.5rem', padding: '0.75rem' }}>
            <Group align={'center'} noWrap sx={{ minHeight: 'min-content', gap: '10px' }}>
                <Avatar src={favicons.high_res} radius='xl' />
                <Group direction='column' sx={{ gap: 0, maxWidth: '24rem' }}>
                    <Title order={6} sx={{ color: 'white', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}> {title} </Title>
                    <Anchor sx={{ color: '#e9e9e9', fontSize: '0.875rem', lineHeight: '1.25rem', overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => openUrl(url)} href={url}> {url}  </Anchor>
                </Group>
            </Group>
            <Text sx={{ color: '#e9e9e9', fontSize: '0.875rem', lineHeight: '1.25rem', overflowWrap: 'break-word', maxWidth: '24rem' }}> {description}</Text>
            {/* <Group sx={{ alignSelf: 'start', color: '#54565E', marginLeft: 'auto' }}>
                <Button> <MdBookmark size={24} /> </Button>
                <Button> <MdCopyAll size={24} /> </Button>
            </Group> */}

        </Group>
    );
}