import { createContext, ReactNode, useState } from "react";
import { IRepos } from "../scripts/ApiConnect";



export const AppContext = createContext<any>(undefined)

export const AppProvider = (({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string>('')
    const [connectedUserData, setConnectedUserData] = useState([])
    const [reposToRender, setReposToRender] = useState<IRepos[]>([])

    return (
        <AppContext.Provider value={{
            token,
            setToken,
            connectedUserData,
            setConnectedUserData,
            reposToRender,
            setReposToRender
        }}>
            {children}
        </AppContext.Provider>
    )
})
