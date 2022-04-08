import { Divider } from '@mantine/core';
import * as React from 'react';
import { MdBookmark, MdCopyAll, MdSearch } from 'react-icons/md';

const SearchResults = () => {

    const [results, setResults] = React.useState<string[]>([]);

    const fetchResults = async () => {
        const res = await fetch('http://localhost:3001/api/generate/keywords')
    }


    return (
        <div className="flex flex-col min-w-min max-w-sm w-full gap-2 border-l-2 border-l-[#72747B] pl-8">
            <div className="max-w-full h-11 flex flex-row justify-between items-center px-4 rounded-[4px] border-[1px] border-[#A67AE9] text-[#707071]">
                <p> Search keywords </p>
                <MdSearch size={25} />
            </div>
            <div className="w-1/2 h-1 bg-[#37373A] self-center rounded-full my-2" />
            <ResultItem text='Search Result Search ResultSearch ResultSearch ResultSearch ResultSearch Result Search ResultSearch ResultSearch Result' />
            <ResultItem text='Search Result Search ResultSearch ResultSearch ResultSearch ResultSearch Result Search ResultSearch ResultSearch Result' />
            <ResultItem text='Search Result Search ResultSearch ResultSearch ResultSearch ResultSearch Result Search ResultSearch ResultSearch Result' />
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
        <div className="w-full bg-[#28282B] h-fit flex flex-col gap-4 p-3 flex-wrap">
            <a className="text-[#E9E9E9] flex-1 max-w-xs break-words text-sm" href={link}> {text}</a>
            <div className="flex flex-row gap-4 text-[#54565E] ml-auto pl-2 self-start ">
                <button className="hover:text-white"> <MdBookmark size={24} /> </button>
                <button className="hover:text-white"> <MdCopyAll size={24} /> </button>
            </div>

        </div>
    );
}