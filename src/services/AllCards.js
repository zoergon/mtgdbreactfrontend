import axios from "axios"

const baseUrl = "https://localhost:7120/api/allcards"
const nameUrl = "https://localhost:7120/api/allcards/name"
const idUrl = "https://localhost:7120/api/allcards/id"

const getAll = () => {
    const config = {
        headers: {},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const getOneCardById = (query) => {
    const config = {
        headers: {},        
    }
    const request = axios.get(`${idUrl}/${query}`, config)
    return request.then(response => response.data)
}

const getName = (query) => {
    const config = {
        headers: {},        
    }
    const request = axios.get(`${nameUrl}/${query}`, config)
    return request.then(response => response.data)
}

export default { getAll, getOneCardById, getName }
