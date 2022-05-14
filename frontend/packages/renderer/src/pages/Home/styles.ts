import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        border: `2px dashed ${theme.colors.dark[5]}`,
        padding: '5rem',
        gap: '4rem'
    },
    title: {
        color: theme.colors.dark[4],
        fontSize: '1.875rem',
        lineHeight: '2.25rem',
        fontWeight: 500,
        margin: 0
    }
}));