import { useEffect, useState } from "react"
import UseAppContext from "../hooks/useAppContext"
import { getRepos } from "../scripts/ApiConnect"
import { IRepos } from "../scripts/ApiConnect"
import { NavLink } from "react-router-dom"

export default function ReposList() {
    const { reposToRender, setReposToRender, token, connectedUserData } = UseAppContext()
    const [userNameToRender, setUserNameToRender ] = useState<string>('')

    useEffect(() => {
        setUserNameToRender(connectedUserData.login)
    },[])

    useEffect(() => {
        if(userNameToRender != ''){
            getReposFromApi(userNameToRender)
        }
    }, [userNameToRender])

    async function getReposFromApi(userName: string) {
        setReposToRender(await getRepos({
            accessToken: token,
            reposUserOwnerName: userName
        }))
    }

    return (
        <section className="h-full flex items-center justify-center overflow-x-hidden ">
            <ul className='flex flex-row flex-wrap gap-2 p-4 w-fit justify-start '>
                {reposToRender.map((repoData: IRepos) =>
                    <RepoDataCard repoData={repoData} />
                )}
            </ul>
        </section>
    )
}

function RepoDataCard({ repoData }: { repoData: IRepos }) {

    var updated_at = repoData.updated_at.split('T')
    console.log(updated_at[0])

    return (
        <NavLink to={`/repo/${repoData.name}`}>
            <li className="flex flex-row items-start justify-between h-20 w-80 border border-git-600 bg-git-800 p-4 
            bg-git-900/50">
                <article className='flex flex-col items-start gap-2 w-3/4 '>
                    <p className='text-git-text-secondary text-xs'>
                        {repoData.owner.login}</p>
                    <h1 className='text-git-text-primary w-full overflow-hidden overflow-ellipsis whitespace-nowrap'>
                        {repoData.name}</h1>
                </article>
                <article className='flex flex-col items-end gap-2'>
                    <div className='text-git-text-secondary text-xs border border-git-600 w-fit py-1 px-3 rounded-full capitalize'>{repoData.visibility}</div>
                    <p className='text-git-text-secondary text-xs'>{updated_at[0]}</p>

                </article>
            </li>
        </NavLink>
    )
}