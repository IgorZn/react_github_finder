import React, {useContext} from 'react';
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";
import Spinner from "../layout/Spinner";


function ReposList({repos}) {
    if (repos) {
        return (
            <div className={'rounded-lg shadow-lg card bg-base-100'}>
                <div className="card-body">
                    <h2 className="text-3xl m4 font-bold card-title">
                        Latest repositories
                    </h2>
                    {repos.map(repo => (
                        <RepoItem key={repo.id} item={repo}/>
                    ))}
                </div>
            </div>
        );
    } else {
        return <Spinner/>
    }

}


ReposList.prototype = {
    repos: PropTypes.array.isRequired
}
export default ReposList;