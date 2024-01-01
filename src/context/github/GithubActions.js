const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// Get search results
export const searchUsers = async (text) => {

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

    return items
}