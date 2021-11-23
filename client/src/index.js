import React from 'react'
import ReactDOM from 'react-dom'
import { SnackbarProvider } from 'notistack'
import Routers from '@routes'
//import { UserContext } from '@services/UserContext'
//import useFindUser from '@services/useFindUser'
//import { UserProvider } from '@services/useAuth'




function App() {
    return (
        
            <SnackbarProvider maxSnack={3}>
                <Routers />
            </SnackbarProvider>

    )
}


    ReactDOM.render(<App/>, document.getElementById('root'))

/*
const App = (
    <AuthProvider>
        <Router>
            <Routes>
                <Route element={<AuthRouter />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    </AuthProvider>
)
*/