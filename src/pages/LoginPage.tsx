import { GithubIcon } from "lucide-react";
import { getConnectedUser, getToken } from "../scripts/ApiConnect.tsx";
import queryString from "query-string";
import { useEffect, useState } from "react";
import UseAppContext from "../hooks/useAppContext.tsx";
import { useNavigate } from "react-router-dom";


export function LoginPage() {
    const {setToken, setConnectedUserData}= UseAppContext()
    const [CLIENT_ID, set_CLIENT_ID] = useState<string>('')
    const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL ?? "http://localhost:5173/"
    const navigate = useNavigate()

    useEffect(() => {
        set_CLIENT_ID(import.meta.env.VITE_CLIENT_ID)
        const code = queryString.parseUrl(window.location.href).query.code
        if (typeof code == "string") {
            fetchAccessToken(code)
        }
    }, [])

    async function fetchAccessToken(code: string) {
        try{
            var accessToken:string = await getToken({
                code: code,
                REDIRECT_URL: REDIRECT_URL 
            })
            console.log(accessToken)
            setToken(accessToken)

            let connectedUser = await getConnectedUser(accessToken)
            console.log(connectedUser)
            setConnectedUserData(connectedUser)
            navigate(`${connectedUser.login}/home`)
        }catch(err){
            console.log('err', err)
        }
    }

    function redirectToGitHub() {
        const GITHUB_URL = 'https://github.com/login/oauth/authorize'
        const params = {
            response_type: 'code',
            scope: 'user',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URL
        }

        const queryStrings = queryString.stringify(params)
        const authURL = `${GITHUB_URL}?${queryStrings}`
        window.location.href = authURL
    }


    return (
        <section className="h-screen w-screen bg-git-950 flex items-center justify-center">
            <button
                onClick={() => redirectToGitHub()}
                className=' flex flex-row items-center gap-2 px-4 py-2 bg-git-800 text-git-text-primary rounded-sm'>
                <GithubIcon color='white' size={20} strokeWidth={2} />
                Login With GitHub
            </button>
        </section>
    )
}