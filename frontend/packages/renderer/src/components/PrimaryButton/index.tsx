import * as React from 'react';
import { Button, ButtonProps } from '@mantine/core';


const PrimaryButton = (props: ButtonProps<'button'>) => {

    const { children } = props;

    return (
        <Button {...props} variant={'filled'} className="bg-[#3071E8] w-72 hover:bg-[#457fec]">
            {children}
        </Button>
    );
}

export default PrimaryButton;