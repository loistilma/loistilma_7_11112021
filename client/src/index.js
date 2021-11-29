import React from 'react'
import ReactDOM from 'react-dom'
import { SnackbarProvider } from 'notistack'
import Routers from '@routes'

function App() {
    return (
        <SnackbarProvider maxSnack={3}>
            <Routers />
        </SnackbarProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
