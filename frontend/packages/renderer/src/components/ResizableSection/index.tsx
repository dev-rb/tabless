import { Box } from '@mantine/core';
import * as React from 'react';
import { Rnd, ResizeEnable } from 'react-rnd';

const defaultResizeDirections: ResizeEnable = { bottom: false, bottomLeft: false, bottomRight: false, left: false, right: true, top: false, topLeft: false, topRight: false };

interface Props {
    maxWidth?: string | number,
    minWidth?: string | number,
    maxHeight?: string | number,
    minHeight?: string | number,
    children: React.ReactNode
}

const ResizeableSection = ({ maxWidth, minWidth, maxHeight, minHeight = '100%', children }: Props) => {


    return (
        <Box sx={{ position: 'relative', transform: 'unset', width: '100%', height: '100%' }}>
            <Rnd minHeight={minHeight} maxHeight={maxHeight} maxWidth={maxWidth} minWidth={minWidth} bounds='parent' disableDragging enableResizing={defaultResizeDirections} resizeHandleStyles={{ right: { borderRight: '2px solid #A2A2A3' } }}>
                {children}
            </Rnd>
        </Box>
    );
}

export default ResizeableSection;