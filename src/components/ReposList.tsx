import { useEffect } from "react"
import UseAppContext from "../hooks/useAppContext"
import { getRepos } from "../scripts/ApiConnect"
import { IRepos } from "../scripts/ApiConnect"
import { NavLink } from "react-router-dom"

export default function ReposList() {
    const { reposToRender, setReposToRender, token, connectedUserData } = UseAppContext()
    useEffect(() => {
        getReposFromApi(connectedUserData.login)
    }, [])

    async function getReposFromApi(userName: string) {
        setReposToRender(await getRepos({
            accessToken: token,
            reposUserOwnerName: userName
        }))
    }

    return (
        <section className=" w-full h-full overflow-x-hidden">
            <ul className='flex flex-row flex-wrap gap-2 p-4 justify-center'>
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
            <li className="flex flex-row items-start justify-between h-20 w-80 border border-slate-800 p-4 rounded-md
            hover:bg-slate-800/10">
                <article className='flex flex-col items-start gap-2 w-3/4 '>
                    <p className='text-slate-200/40 text-xs'>
                        {repoData.owner.login}</p>
                    <h1 className='text-slate-200 w-full overflow-hidden overflow-ellipsis whitespace-nowrap'>
                        {repoData.name}</h1>
                </article>
                <article className='flex flex-col items-end gap-2'>
                    <div className='text-slate-200/40 text-xs border border-slate-800 w-fit py-1 px-3 rounded-full capitalize'>{repoData.visibility}</div>
                    <p className='text-slate-200/40 text-xs'>{updated_at[0]}</p>

                </article>
            </li>
        </NavLink>
    )
}