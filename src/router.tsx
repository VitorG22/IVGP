import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from './pages/LoginPage'
import HomePage from "./pages/homePage";
import RepoPage from "./pages/RepoPage";
import App from "./App";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />
    },
    { 
        path: '/',
        element: <App />,
        children:[
            { 
                path: '/home',
                element: <HomePage />
            },
            {
                path: '/repo/:repoName',
                element: <RepoPage />
            }
        ]
    }
    
])
export default router 