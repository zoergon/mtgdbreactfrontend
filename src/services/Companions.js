import axios from "axios"

const baseUrl = "https://localhost:7120/api/companions"

const getAll = () => {
    const config = {
        headers: {},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

export default { getAll }
