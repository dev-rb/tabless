import RichTextEditor from '@mantine/rte';
import * as React from 'react';

const initialValue = "<p> Start Typing... </p>";

const TextEditor = () => {

    const [value, setValue] = React.useState("");

    return(
        <RichTextEditor value={value} onChange={(val) => setValue(val)} 
        classNames={
            {root: 'bg-transparent border-none text-white p-0', 
            toolbar: 'bg-transparent border-none', 
            toolbarControl: 'large-icon-controls bg-transparent border-none text-control-color hover:bg-control-hover-color', 
            toolbarGroup: 'flex flex-row gap-2'}
            }>

        </RichTextEditor>
    );
}

export default TextEditor;