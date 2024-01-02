import axios from "axios";

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
    baseURL: GITHUB_API_URL,
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
})

// Get search results
export const searchUsers = async (text) => {

    const response = await github.get(`/search/users`, {params: {q: text}})

    return response.data.items
};

// Get user and repos
export const getUserAndRepos = async (login) => {
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`),
    ])

    return {user: user.data, repos: repos.data}
}



// Get search results for single user
// export const getUser = async (login) => {
//     const response = await fetch(`${GITHUB_API_URL}/users/${login}`, {
//         headers: {
//             Authorization: `Bearer ${GITHUB_TOKEN}`
//         }
//     }).catch(e => {
//         console.log(e.message)
//     })
//
//     const items = await response.json()
//
//     return items
// }

// Get user's repos
// export const getUserRepos = async (login) => {
//     const params = new URLSearchParams({
//         sort: 'created',
//         per_page: 10
//     })
//
//     const response = await fetch(`${GITHUB_API_URL}/users/${login}/repos?${params}`, {
//         headers: {
//             Authorization: `Bearer ${GITHUB_TOKEN}`
//         }
//     }).catch(e => {
//         console.log(e.message)
//     })
//
//     const items = await response.json()
//
//     return items
// }