// import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { AppProvider } from './context/AppContext'



ReactDOM.createRoot(document.getElementById('root')!).render(
    <AppProvider>
        <RouterProvider router={router} />
    </AppProvider>
)
