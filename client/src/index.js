import React from 'react'
import ReactDOM from 'react-dom'
import { SnackbarProvider } from 'notistack'
import Routers from '@routes'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({

    palette: {
        type: 'light',
        primary: {
            main: '#091F43',
            contrastText: '#000000',
        },
        secondary: {
            main: '#091F43',
        },
        text: {
            primary: '#000000',
        },
    },

    typography: {
        h1: {
            fontSize: '1.3rem',
            letterSpacing: '0.04em',
            fontWeight: '600',
        },
        h2: {
            fontSize: '1.3rem',
        },
        h3: {
            fontSize: '1.1rem',
        },
        button: {
            fontSize: '1rem',
            fontWeight: 500,
        },
    },
});
function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
                <Routers />
            </SnackbarProvider>
        </ThemeProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
