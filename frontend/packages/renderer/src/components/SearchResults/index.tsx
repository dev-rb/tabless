import { Divider } from '@mantine/core';
import * as React from 'react';
import { MdBookmark, MdCopyAll, MdSearch } from 'react-icons/md';

const SearchResults = () => {
    return (
        <div className="flex flex-col min-w-max max-w-md w-full gap-4 border-l-2 border-l-[#72747B] px-8 pt-8 max-h-[80vh]">
            <div className="w-full bg-[#2B2C31] h-14 flex flex-row justify-between items-center px-4 rounded-[4px] border-b-2 border-b-[#234AB2]">
                <p className="text-[#9a9b9b]"> Search keywords </p>
                <MdSearch size={25} color="#234AB2" />
            </div>
            <ResultItem text='Search Result' />
        </div>
    );
}

export default SearchResults;

interface ResultProps {
    text: string,
    link?: string,
}

const ResultItem = ({ text, link }: ResultProps) => {

    const saveSearchResult = () => {

    }

    const copyToClipboard = () => {

    }

    return (
        <div className="w-full bg-[#2B2C31] h-fit flex flex-row gap-4 items-center px-4 rounded-[4px] py-4 flex-wrap">
            <div className="flex flex-row gap-4 flex-wrap">
                <MdSearch size={25} color="#45474E" />
                <a className="text-[#9a9b9b] flex-1 max-w-[25ch] break-words" href={link}> {text}</a>
            </div>
            {/* <Divider orientation='vertical' my="xs" /> */}
            <div className="flex flex-row gap-4 text-[#54565E] ml-auto border-l-2 border-l-[#54565E] pl-2 self-start ">
                <button className="hover:text-white"> <MdBookmark size={24} /> </button>
                <button className="hover:text-white"> <MdCopyAll size={24} /> </button>
            </div>
        </div>
    );
}