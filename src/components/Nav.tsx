import UseAppContext from "../hooks/useAppContext"
import { NavLink } from "react-router-dom"
import SearchBar from "./searchBar"

export default function NavBar() {
    const { connectedUserData } = UseAppContext()

    return (
        <nav className='flex flex-row justify-between items-center gap-4 h-14 w-full bg-git-950 text-slate-200 px-4 border-b border-git-600 fixed top-0 z-10'>
            <NavLink to={`/${connectedUserData.login}`}>
                <div className='flex flex-row gap-4'>
                    <img
                        src={connectedUserData.avatar_url}
                        srcSet="User Picture"
                        className="h-8 aspect-square rounded-full"
                    />
                    <h1 className='text-git-text-primary'>{connectedUserData.login}</h1>
                </div>
            </NavLink>
            <ul className='h-full flex flex-row items-center'>
                <li className='h-full flex items-center border-b-2 has-[.selectedNav]:border-git-red '>
                    <NavLink
                        to={`/${connectedUserData.login}/home`}
                        className={({isActive}) => `${isActive && ('selectedNav')}
                            text-git-text-primary flex py-2 px-4 items-center rounded-md hover:bg-git-800`
                        }
                    >
                        home
                    </NavLink>
                </li>
            </ul>
            <SearchBar />
        </nav>
    )
}