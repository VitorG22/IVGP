import { useNavigate, useParams } from "react-router-dom";
import { getBranches, IBranches } from "../scripts/ApiConnect";
import UseAppContext from "../hooks/useAppContext";
import { useEffect, useState } from "react";
import { Triangle } from "lucide-react";
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
        <section>
            {branches.length >= 1 && (
                <>
                    <div className="flex flex-row items-center p-4 gap-4 ">
                        <h1 className='text-slate-200 text-2xl'>{repoName}</h1>
                        <div className=" w-32 relative ">
                            <button className='flex flex-row gap-2 w-full items-center justify-between text-slate-200 border border-slate-800 px-4 py-1 '
                                onClick={() => setIsBranchMenuOpen(!isBranchMenuOpen)}
                            >{branches[selectedBranchIndex].name}
                                <Triangle size={10} strokeWidth={0} className={`fill-slate-200 duration-300 ${isBranchMenuOpen ? ('rotate-90') : ('rotate-180')}`} />
                            </button>
                            {isBranchMenuOpen &&
                                <ul className='flex flex-col border border-slate-800 bg-slate-950 w-full  text-slate-200/50  absolute top-[100%]'>
                                    {branches?.map((branche, index) =>
                                        <li>
                                            <button className='py-1 px-4 text-start  '
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