import { useParams } from "react-router-dom";
import ReposList from "../components/ReposList";
import SearchBar from "../components/searchBar";
import { useEffect, useState } from "react";
import { getUser, IUser } from "../scripts/ApiConnect";
import UseAppContext from "../hooks/useAppContext";

export default function UsersPage() {
    const { token } = UseAppContext()
    const { userName } = useParams()
    const [userData, setUserData] = useState<IUser | null>(null)

    useEffect(() => {
        if (userName) {
            setUser(userName)
        }
    },[userName])

    async function setUser(userNameToFetch: string) {
        setUserData(await getUser({
            userName: userNameToFetch,
            accessToken: token
        }))
    }

    return (
        <main className="h-full bg-git-950 pt-2 pl-4">
            <SearchBar />
            <section className='flex flex-row h-full justify-between'>
                {userData &&
                    <aside className='flex flex-col items-center w-1/3 h-fit gap-4  py-8'>
                        <img src={userData.avatar_url} className='flex w-64 rounded-full aspect-square '/>
                        <h1 className='text-2xl text-git-text-primary'>{userData.login}</h1>
                    </aside>
                }
                {userName && 
                    <section className='w-2/3'>
                        <ReposList key={`repoList_${userName}`} userName={userName} />
                    </section>
                }
            </section>

        </main>
    )
}