import { Search } from "lucide-react"
import UseAppContext from "../hooks/useAppContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUser } from "../scripts/ApiConnect"

export default function SearchBar(){
    const {token} = UseAppContext()
    const [searchBarValue, setSearchBarValue] = useState<string>('')

    const navigate = useNavigate()
    
    
    async function searchBarEnter(){
        console.log(searchBarValue)
        if(searchBarValue){
            const user =await getUser({
                accessToken: token,
                userName: searchBarValue
            })
            if(user){
                navigate(`/users/${user.login}`)
            }
        }
    }
    
    return(
        <form 
            onSubmit={(e) => {
                e.preventDefault()
                searchBarEnter()
            }}
            className='flex flex-row items-center gap-2'>
                {/* <label htmlFor="SearchBar" className='text-git-text-secondary text-sm font-thin'>
                    Search for User
                </label> */}
                <div className='flex flex-row items-center border border-git-600 rounded-md'>
                    <button className='p-2 pr-0'>
                        <Search size={13} strokeWidth={1} className='stroke-git-text-primary' />
                    </button>
                    <input
                        id='SearchBar'
                        type="text"
                        value={searchBarValue}
                        onChange={(event) => setSearchBarValue(event.target.value)}
                        placeholder='User Name'
                        className='bg-transparent h-8 w-72 text-git-text-secondary font-thin text-sm p-2 outline-none' />
                </div>
            </form>
    )
}