import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#111111',
            background: '#eeeeee',
            opacity: 0.8,
        },
        secondary: {
            main: '#eeeeee',
        },
    },

    typography: {
        fontFamily: [
            'Noto Sans',
            'sans-serif',
        ].join(','),

        h1: {
            fontSize: 24,
            fontWeight: '600',
        },
        body1: {
            fontSize: 16,
            fontWeight: '300',
        }

    },
});

export default theme;