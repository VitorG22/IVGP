import NavBar from "../components/Nav"
import ReposList from "../components/ReposList"

export default function HomePage() {
    
    return (
        <main className='min-h-screen w-full  bg-slate-950 '>
            <NavBar />
            <ReposList />
        </main>
    )
}