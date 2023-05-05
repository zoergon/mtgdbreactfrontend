import axios from "axios"

const baseUrl = "https://localhost:7120/api/allcards"

const getAll = () => {
    const config = {
        headers: {},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const get = name => {
    const config = {
        headers: {},
    }
    const request = axios.get(`${baseUrl}/${name}`, config)
    return request.then(response => response.data)
}

export default { getAll, get }
