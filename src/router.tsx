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
        path: '/:userName',
        element: <App />,
        children:[
            { 
                path: '/:userName/home',
                element: <HomePage />
            },
            {
                path: '/:userName/repo/:repoName',
                element: <RepoPage />
            }
        ]
    }
    
])
export default router 