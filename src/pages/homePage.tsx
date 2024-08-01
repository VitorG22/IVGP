import { useParams } from "react-router-dom"
import ReposList from "../components/ReposList"

export default function HomePage() {
    const {userName} = useParams()
    
    
    return (
        <main className='h-full w-full bg-git-950 '>
            {userName && <ReposList userName={userName}/>}
        </main>
    )
}