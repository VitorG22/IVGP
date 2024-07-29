import axios from "axios"

const API_URL = import.meta.env.VITE_BACK_END_URL

export interface IRepos {
    id: number,
    commits_url: string,
    default_branch: string,
    description: string,
    git_commits_url: string,
    languages_url: string,
    name: string,
    trees_url: string,
    url: string,
    visibility: string
    updated_at: string,
    owner: {
        login: string,
        id: number,
        avatar_url: string
    }
    permissions: {
        admin: boolean
        maintain: boolean
        pull: boolean
        push: boolean
        triage: boolean
    }
}

export interface IBranches {
    name: string,
    commit: {
        sha: string,
    }
    protected: boolean
}

export interface ICommit {
    commit: {
        author: {
            name: string,
            email: string,
            date: string
        },
        message: string,
    }
    files: Array<{
        additions: number
        changes: number
        filename: string
        sha: string
        status: string
    }>
    sha: string
    parents: Array<{
        sha: string
        html_url: string
    }>
    
    
}


// espera um codigo como parametro e o troca por um token de acesso 
export async function getToken({code, REDIRECT_URL}:{code: string, REDIRECT_URL:string}) {
    try {
        // const response = await axios.post(`http://localhost:3030/token`, { 
        const response = await axios.post(`${API_URL}/token`, { 
            code: code,
            REDIRECT_URL: REDIRECT_URL
        })
        const accessToken = response.data
        return accessToken
    } catch (error) {
        console.log('err', error)
    }
}

// retorna as informações do usuario conectado
export async function getConnectedUser(accessToken: string) {
    try {
        // const response = await axios.post(`http://localhost:3030/user/connected`, {
        const response = await axios.post(`${API_URL}/user/connected`, {
            accessToken: accessToken
        })
        const connectedUserData = response.data
        console.log(connectedUserData)
        return connectedUserData
    } catch (error) {
        console.log('err', error)
    }
}
export async function getUser({accessToken, userName}:{accessToken:string , userName: string} ) {
    try {
        // const response = await axios.post(`http://localhost:3030/user`, {
        const response = await axios.post(`${API_URL}/user`, {
            accessToken: accessToken,
            userName: userName
        })
        const UserData = response.data
        console.log(UserData)
        return UserData
    } catch (error) {
        console.log('err', error)
    }
}


// retorna todo os repositorios de um usuario
export async function getRepos({ accessToken, reposUserOwnerName }: { accessToken: string, reposUserOwnerName: string }) {
    try {
        const response = await axios.post(`${API_URL}/repos`, {
            accessToken: accessToken,
            userName: reposUserOwnerName
        })
        const repos = response.data
        console.log(repos)
        return repos
    } catch (error) {
        console.log('err', error)
    }
}


// retorna o nome e o ultimo commite de todas as branches de um repositiorio
export async function getBranches({ accessToken, reposUserOwnerName, repoName }: { accessToken: string, reposUserOwnerName: string, repoName: string }) {
    try {
        const response = await axios.post(`${API_URL}/repo/branches`, {
            repoName: repoName,
            accessToken: accessToken,
            userName: reposUserOwnerName
        })
        const repos = response.data
        console.log(repos)
        return repos
    } catch (error) {
        console.log('err', error)
    }
}

// recebe um id como paremetro e retorna o commit relativo
export async function getCommit({ accessToken, reposUserOwnerName, repoName, commitId }: { accessToken: string, reposUserOwnerName: string, repoName: string, commitId: string }) {
    try {
        const response = await axios.post(`${API_URL}/repo/commit`, {
            repoName: repoName,
            accessToken: accessToken,
            userName: reposUserOwnerName,
            commitId: commitId
        })
        const commitData = response.data
        console.log(commitData)
        return commitData
    } catch (error) {
        console.log('err', error)
    }
}


export async function getAllCommit({ accessToken, reposUserOwnerName, repoName, commitId }: { accessToken: string, reposUserOwnerName: string, repoName: string, commitId: string }) {
    try {
        const response = await axios.post(`${API_URL}/repo/commit/all`, {
            repoName: repoName,
            accessToken: accessToken,
            userName: reposUserOwnerName,
            commitId: commitId
        })
        const commitsList = response.data
        console.log(commitsList)
        return commitsList
    } catch (error) {
        console.log('err', error)
    }
}