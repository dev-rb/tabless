import * as React from 'react';
import { Button, ButtonProps } from '@mantine/core';


const PrimaryButton = (props: ButtonProps<'button'>) => {

    const { children } = props;

    return (
        <Button {...props}>
            {children}
        </Button>
    );
}

export default PrimaryButton;