import axios from "axios"

const baseUrl = "https://localhost:7120/api/deckparts"
const nameUrl = "https://localhost:7120/api/deckparts/id"

const getAll = () => {
    const config = {
        headers: {},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const getDeckPart = (query) => {
    const config = {
        headers: {},        
    }
    const request = axios.get(`${nameUrl}/${query}`, config)
    return request.then(response => response.data)
}

const create = newFormat => {
    const config = {
        headers: {},
    }
    return axios.post(baseUrl, newFormat, config)
}

const remove = id => {
    const config = {
        headers: {},
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = object => {
    const config = {
        headers: {},
    }
    return axios.put(`${baseUrl}/${object.deckId}`, object, config)
}


export default { getAll, getDeckPart, create, remove, update }
