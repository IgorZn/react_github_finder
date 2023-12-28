import {createContext, useReducer} from "react";
import githubReducer from "./GithubRuducer";

const GithubContext = createContext();

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({children}) => {
    const initState = {
        users: [],
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

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers
    }}>
        {children}
    </GithubContext.Provider>
};

export default GithubContext;