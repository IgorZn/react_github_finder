import {createContext, useReducer} from "react";
import githubReducer from "./GithubRuducer";

const GithubContext = createContext();

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({children}) => {
    const initState = {
        users: [],
        user: {},
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initState)

    // Set loading
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    // Get search results
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_API_URL}/search/users?${params}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        }).catch(e => {
            console.log(e.message)
        })

        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    // Get search results for single user
    const searchUser = async (login) => {
        setLoading()
        const response = await fetch(`${GITHUB_API_URL}/users/${login}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        }).catch(e => {
            console.log(e.message)
        })

        const items = await response.json()

        dispatch({
            type: 'GET_USER',
            payload: items
        })
    }

    // Clear users
    const clearUserState = () => dispatch({
        type: 'CLEAR_USERS'
    })

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUsers,
        searchUser,
        clearUserState
    }}>
        {children}
    </GithubContext.Provider>
};

export default GithubContext;