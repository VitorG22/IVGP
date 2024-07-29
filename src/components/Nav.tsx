import UseAppContext from "../hooks/useAppContext"

export default function NavBar() {
    const { connectedUserData } = UseAppContext()
    console.log(connectedUserData)
    return (
        <nav className='flex flex-row items-center gap-4 h-14 w-full bg-git-950 text-slate-200 px-2 border-b border-git-600 fixed top-0 z-10'>
            <img
                src={connectedUserData.avatar_url}
                srcSet="User Picture"
                className="h-8 aspect-square rounded-full"
            />
            <h1 className='text-git-text-primary'>{connectedUserData.login}</h1>
        </nav>
    )
}