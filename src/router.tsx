import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from './pages/LoginPage'
import HomePage from "./pages/homePage";
import RepoPage from "./pages/RepoPage";
import App from "./App";
import UsersPage from "./pages/UsersPage";
import ErrorPage from "./pages/errorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/:userName',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/:userName/home',
                element: <HomePage />
            },
            {
                path: '/:userName/repo/:repoName',
                element: <RepoPage />
            }
        ]
    },
    {
        path: '/users',
        element: <App />,
        children: [
            {
                path: '/users/',
                element: <UsersPage />,
            },
            {
                path: '/users/:userName',
                element: <UsersPage />,
            }
        ]
    }

])
export default router 