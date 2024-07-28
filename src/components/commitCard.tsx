import { useState } from "react";
import { ICommitObject } from "./BranchPanel";
import { ChevronDownIcon, ChevronRightIcon, Circle, Minus, Plus } from "lucide-react";

interface IFileData {
    additions: number
    changes: number
    filename: string
    sha: string
    status: string
}

export default function CommitCard({ commitData }: { commitData: ICommitObject }) {
    const [isCardDetailsOpen, setIsCardDetailsOpen] = useState<boolean>(false)
    const Date = commitData.commitData.commit.author.date
    const formatedDate = Date.split('T')

    return (
        <section className='text-slate-200 p-2  bg-slate-950 border border-slate-800 rounded-md hover:bg-slate-800/10'>
            <article onClick={() => setIsCardDetailsOpen(!isCardDetailsOpen)}
                className="p-2 flex flex-row items-start justify-between"
            >
                <div className="w-3/4">
                    <p className="text-xs text-slate-200/40">{commitData.commitData.commit.author.name}</p>
                    <h1 className="flex flex-row gap-2">
                        <span className="h-fit pt-2">
                            {isCardDetailsOpen ? (
                                <ChevronDownIcon size={12} className="stroke-slate-200"/>
                            ) : (
                                <ChevronRightIcon size={12} className="stroke-slate-200"/>
                            )}
                        </span>
                            {commitData.commitData.commit.message}
                    </h1>
                </div>
                <div className='flex flex-col items-end gap-2'>
                    <p className='text-xs text-slate-200/40 '>{formatedDate[0]}</p>
                    <p className='text-xs text-slate-200/40 '>
                        Files Changed: {commitData.commitData.files.length}
                    </p>
                </div>
            </article>
            {
                isCardDetailsOpen &&
                <ul className='border-t p-2 border-slate-800'>
                    {commitData.commitData.files.map(fileData =>
                        <FileCard fileData={fileData} />
                    )}
                </ul>
            }
        </section >
    )
}

function FileCard({ fileData }: { fileData: IFileData }) {
    let teste = ''
    switch (fileData.status) {
        case 'modified':
            teste = 'border-b border-cyan-500/20'
            break
        case 'renamed':
            teste = 'border-b border-cyan-500/20'
            break
        case 'added':
            teste = 'border-b border-emerald-500/20'
            break
        case 'removed':
            teste = 'border-b border-red-500/20'
            break
    }

    return (
        <section className={`${teste} flex flex-row items-center h-7 bg-slate-800/10`}>
            {fileData.status == "added" && <div className='px-2 bg-green-500/40 flex justify-center items-center h-full'><Plus size={10} strokeWidth={1} className="stroke-slate-200" /></div>}
            {fileData.status == "removed" && <div className='px-2 bg-red-500/40 flex justify-center items-center h-full'><Minus size={10} strokeWidth={1} className="stroke-slate-200" /></div>}
            {fileData.status == "modified" && <div className='px-2 bg-sky-500/40 flex justify-center items-center h-full'><Circle size={10} strokeWidth={1} className="stroke-slate-200" /></div>}
            {fileData.status == "renamed" && <div className='px-2 bg-sky-500/40 flex justify-center items-center h-full'><Circle size={10} strokeWidth={1} className="stroke-slate-200" /></div>}
            <p className='w-20 ml-2 capitalize'>{fileData.status}</p>
            <div className='w-full h-full ml-4 overflow-hidden overflow-ellipsis whitespace-nowrap'>
                {fileData.filename}
            </div>
        </section>

    )
}