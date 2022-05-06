import PdfViewer from '@/components/PdfViewer';
import { IPdf } from '@/types';
import * as React from 'react';

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
            <div className="flex gap-4 w-full h-fit border-b-2 border-b-red-500">
                {controls}
            </div>
            <div className="w-full h-full max-h-[80vh]">
                {pdfs.map((pdf, index) => <PdfViewer key={pdf.id} fileLocation={pdf.location} isVisible={activeTab === index} />)}
            </div>
        </div>
    );
}

export default Tabs;

interface TabControlProps extends Partial<HTMLDivElement> {
    label: string,
    isActive: boolean,
    setActive: () => void
}

const TabControl = ({ label, isActive, setActive, title }: TabControlProps) => {
    return (
        <div className="flex justify-center items-center" title={title} onClick={setActive}>
            <h1> {label} </h1>
        </div>
    );
}