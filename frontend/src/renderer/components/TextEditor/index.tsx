import RichTextEditor from '@mantine/rte';
import * as React from 'react';

const initialValue = "<p> Start Typing... </p>";

const TextEditor = () => {

    const [value, setValue] = React.useState("");

    return(
        <RichTextEditor value={value} onChange={(val) => setValue(val)} 
        classNames={{root: 'bg-transparent border-none', toolbar: 'bg-transparent border-none', toolbarControl: 'bg-transparent border-none text-control-color hover:bg-control-hover-color'}}>

        </RichTextEditor>
    );
}

export default TextEditor;