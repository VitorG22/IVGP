import { useEffect, useState } from "react"
import UseAppContext from "../hooks/useAppContext"
import { getAllCommit, ICommit } from "../scripts/ApiConnect"
import CommitCard from "./commitCard"
import Loading from "./loading/loading"

export interface ICommitObject {
    commitData: ICommit
    nextCommitId: string | null
}


export default function BranchPanel({ repoName, userName, commitId }: { commitId: string, repoName: string, userName: string }) {
    const [commitsList, setCommitsList] = useState<ICommitObject[]>([])
    const [isGetingCommitList, setIsGetingCommitList] = useState<boolean>(true)
    const { token } = UseAppContext()


    useEffect(() => {
        setIsGetingCommitList(true)
        getAllCommitFromGitHub(commitId)
    }, [commitId])

    async function getAllCommitFromGitHub(commitIdToFetch: string) {
        const commitsList = await getAllCommit({
            accessToken: token,
            commitId: commitIdToFetch,
            repoName: repoName,
            reposUserOwnerName: userName
        })
        setCommitsList(commitsList)
        setIsGetingCommitList(false)
        console.log(commitsList)
    }


    return (
        <section className=' flex flex-col gap-2 pb-8 h-full'>
            {isGetingCommitList ? (
                <Loading />
            ):(
            <>
                <h4 className="text-git-text-secondary ml-4">Commits :</h4>
                <ul className='flex flex-col gap-2  h-full overflow-y-scroll pb-8 px-4'>
                    {commitsList?.map(commit =>
                        <li key={commit.commitData.sha}>
                            <CommitCard commitData={commit} />
                        </li>
                    )}
                </ul>
            </>
            )

            }
        </section>
    )
}


