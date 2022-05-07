import PdfViewer from '@/components/PdfViewer';
import { IPdf } from '@/types';
import { ActionIcon } from '@mantine/core';
import * as React from 'react';
import { MdClose } from 'react-icons/md';

interface TabsProps {
    pdfs: IPdf[],
    children: React.ReactNode
}


const Tabs = ({ pdfs, children }: TabsProps) => {

    const [activeTab, setActiveTab] = React.useState(0);

    const updateActive = (index: number) => {
        setActiveTab(index);
    }

    const tabs = React.Children.toArray(children) as React.ReactElement[];

    const controls = pdfs.map((pdf, index) => {
        return <TabControl key={pdf.id} title={pdf.name} label={pdf.name} isActive={index === activeTab} setActive={() => updateActive(index)} />
    });

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex w-full h-fit max-h-32 border-b-[1px] border-b-[#343437] pb-2 flex-wrap">
                {controls}
            </div>
            <div className="w-full h-full max-h-[80vh] mt-4">
                {pdfs.map((pdf, index) => <PdfViewer key={pdf.id} fileLocation={pdf.location} isVisible={activeTab === index} />)}
            </div>
        </div>
    );
}

export default Tabs;

interface TabControlProps extends Partial<HTMLButtonElement> {
    label: string,
    isActive: boolean,
    setActive: () => void
}

const TabControl = ({ label, isActive, setActive, title }: TabControlProps) => {
    return (
        <button className={`flex basis-1/4 shrink items-center max-w-[10rem] gap-2 px-2 py-1 ${isActive ? 'bg-[#3E3153] text-white hover:bg-[#2f253f]' : 'bg-transparent border-[1px] border-[#3E315360] text-[#54446E]'}`} title={title} onClick={setActive}>
            <h1 className="max-w-full whitespace-nowrap text-ellipsis overflow-hidden "> {label} </h1>
            <ActionIcon size={'xs'} styles={{ root: { ':hover': { background: '#54446E !important', color: 'white' }, color: '#6F5C8E' } }}>
                <MdClose />
            </ActionIcon>
        </button>
    );
}