import { useNavigate, useParams } from "react-router-dom";
import { getBranches, IBranches } from "../scripts/ApiConnect";
import UseAppContext from "../hooks/useAppContext";
import { useEffect, useState } from "react";
import { GitBranch, Triangle } from "lucide-react";
import BranchPanel from "../components/BranchPanel";

export default function RepoPage() {
    const [branches, setBranches] = useState<IBranches[]>([])
    const [selectedBranchIndex, setSelectedBranchIndex] = useState<number>(0)
    const [isBranchMenuOpen, setIsBranchMenuOpen] = useState<boolean>(false)

    const { token, connectedUserData } = UseAppContext()
    const { repoName } = useParams()

    useEffect(() => {
        if (!repoName) {
            const navigate = useNavigate()
            navigate('/home')
            return
        }
        getBranchesFromGitHubApi()
    }, [])


    async function getBranchesFromGitHubApi() {
        if (!repoName) {
            return []
        }
        setBranches(await getBranches({
            accessToken: token,
            repoName: repoName,
            reposUserOwnerName: connectedUserData.login
        }))
    }

    return (
        <section className='bg-git-800 min-h-screen pb-4'>
            {branches.length >= 1 && (
                <>
                    <div className="flex flex-row items-center p-4 gap-4">
                        <h1 className='text-git-text-primary text-2xl'>{repoName}</h1>
                        <div className=" w-36 relative ">
                            <button className={`flex flex-row gap-2 w-full items-center justify-between text-git-300 border-2 border-git-400 bg-git-500 px-4 py-1 rounded-lg
                            ${isBranchMenuOpen && 'rounded-b-none'}`}
                                onClick={() => setIsBranchMenuOpen(!isBranchMenuOpen)}
                            >
                                <GitBranch size={12} className='fill-git-300 stroke-git-300' />
                                {branches[selectedBranchIndex].name}
                                <Triangle size={7} strokeWidth={0} className={`fill-git-300 duration-300 ${isBranchMenuOpen ? ('rotate-90') : ('rotate-180')}`} />
                            </button>
                            {isBranchMenuOpen &&
                                <ul className='flex flex-col border-t-0 border-2 border-git-400 bg-git-500 w-full  text-git-300  absolute top-[100%] rounded-b-lg overflow-hidden'>
                                    {branches?.map((branche, index) =>
                                        <li className='hover:bg-git-700'> 
                                            <button className='py-1 px-4 text-start w-full '
                                                onClick={() => {
                                                    setIsBranchMenuOpen(false)
                                                    setSelectedBranchIndex(index)
                                                }
                                                }>
                                                {branche.name}
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            }
                        </div>
                    </div>

                    {repoName &&
                        < BranchPanel
                            commitId={branches[selectedBranchIndex].commit.sha}
                            repoName={repoName}
                            userName={connectedUserData.login}
                        />
                    }
                </>

            )}
        </section >
    )
} 