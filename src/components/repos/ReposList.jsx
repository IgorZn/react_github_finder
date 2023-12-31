import React from 'react';
import PropTypes from "prop-types";

function ReposList({repos}) {
    return (
        <div className={'rounded-lg shadow-lg card bg-base-100'}>
            <div className="card-body">
                <h2 className="text-3xl m4 font-bold card-title">
                    Latest repositories
                </h2>
                {repos.map(repo => (
                    <h3>{repo.name}</h3>
                ))}
            </div>
        </div>
    );
}


ReposList.prototype = {
    repos: PropTypes.array.isRequired
}
export default ReposList;