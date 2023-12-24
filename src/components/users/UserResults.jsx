import React, {useEffect, useState} from 'react';
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

function UserResults(props) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers()
    }, []);

    const fetchUsers = async () => {
        const response = await fetch(`${process.env.REACT_APP_GITHUB_API}/users`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        }).catch(e => {
            console.log(e.message)
        })

        const data = await response.json()
        setUsers(data)
        setLoading(false)
    }

    if (!loading) {
        return (
            <div className={'grid grid-cols-1- gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'}>
                {users.map(user => (
                    <UserItem key={user.node_id} user={user}/>
                ))}
            </div>
        );
    } else {
        return <Spinner/>
    }

}

export default UserResults;