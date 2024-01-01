import {createContext, useReducer} from "react";
import githubReducer from "./GithubRuducer";

const GithubContext = createContext();


export const GithubProvider = ({children}) => {
    const initState = {
        users: [],
        user: {},
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initState)

    return <GithubContext.Provider value={{
        ...state,
        dispatch,
    }}>
        {children}
    </GithubContext.Provider>
};

export default GithubContext;