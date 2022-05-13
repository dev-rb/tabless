import * as React from 'react';
import { ISearchResult } from '@/types';
import { Avatar, Button, Loader } from '@mantine/core';
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
        <div className="flex flex-col min-w-min max-w-sm w-full h-full gap-2 border-l-2 border-l-[#72747B] pl-4 pt-8 items-center">
            <div className="max-w-xs w-full h-11 flex flex-row justify-between items-center px-4 rounded-[4px] border-[1px] border-[#A67AE9] text-[#707071]">
                <p> Search keywords </p>
                <MdSearch size={25} />
            </div>
            <div className="w-1/2 h-1 bg-[#37373A] self-center rounded-full my-2" />
            <div className="overflow-y-auto flex flex-col gap-4 h-full">
                {/* <ResultItem
                    title={'Some Search result'}
                    url={'https://api.faviconkit.com/www.hollywoodsoapbox.com/192'}
                    description={'Some search result description...'}
                    favicons={{
                        high_res: 'https://api.faviconkit.com/www.hollywoodsoapbox.com/192',
                        low_res: 'https://www.google.com/s2/favicons?sz=64&domain_url=www.hollywoodsoapbox.com'
                    }}
                /> */}
                <ResultItem description='' favicons={{ high_res: '', low_res: '' }} title='' url='https://github.com' />
                {isLoading ? <Loader /> : searchResults.map((val) => <ResultItem key={nanoid()} {...val} />)}
                {/* {searchResults.map((val) => <ResultItem key={val.url} {...val} />)} */}
            </div>

            <Button onClick={openWindow} > Open Test </Button>
        </div>
    );
}

export default SearchResults;

const ResultItem = ({ description, title, favicons, url }: ISearchResult) => {

    const saveSearchResult = () => {

    }

    const copyToClipboard = () => {

    }

    return (
        <div className="bg-[#28282B] h-fit flex flex-col gap-6 p-3 flex-wrap">
            <div className="flex flex-row items-center gap-6 min-w-min">
                <Avatar src={favicons.high_res} radius='xl' />
                <div className="flex flex-col gap-0 max-w-xs ">
                    <h6 className="text-white text-lg font-medium overflow-hidden overflow-ellipsis"> {title} </h6>
                    <a className="text-[#E9E9E9] text-sm overflow-hidden overflow-ellipsis" href={url}> {url}  </a>
                </div>
            </div>
            <p className="text-[#E9E9E9] flex-1 max-w-xs break-words text-sm" > {description}</p>
            <div className="flex flex-row gap-4 text-[#54565E] ml-auto pl-2 self-start ">
                <button className="hover:text-white"> <MdBookmark size={24} /> </button>
                <button className="hover:text-white"> <MdCopyAll size={24} /> </button>
            </div>

        </div>
    );
}