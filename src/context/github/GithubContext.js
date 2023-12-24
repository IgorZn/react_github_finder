import {createContext, useEffect, useState} from "react";

const GithubContext = createContext();

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        const response = await fetch(`${GITHUB_API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        }).catch(e => {
            console.log(e.message)
        })

        const data = await response.json()
        setUsers(data)
        setLoading(false)
    }

    return <GithubContext.Provider value={{
        users,
        loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
};

export default GithubContext;