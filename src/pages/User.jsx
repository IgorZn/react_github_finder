import React, {useContext, useEffect} from 'react';
import GithubContext from "../context/github/GithubContext";
import Spinner from "../components/layout/Spinner";
import {useParams} from "react-router-dom";


function User() {
    const { login } = useParams()
    const {user, searchUser, loading} = useContext(GithubContext)

    useEffect(() => {
        searchUser(login)
    }, []);

    if (!loading) {
        return (
            <div>{user.login}</div>
        )
    } else {
        return <Spinner/>
    }
}

export default User;