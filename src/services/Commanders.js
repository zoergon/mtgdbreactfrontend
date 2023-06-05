import axios from "axios"

const baseUrl = "https://localhost:7120/api/commanders"
const nameUrl = "https://localhost:7120/api/commanders/name"
const deckIdUrl = "https://localhost:7120/api/commanders/deckid"

const getAll = () => {
    const config = {
        headers: {},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const getByDeckId = (query) => {
    const config = {
        headers: {},        
    }
    const request = axios.get(`${deckIdUrl}/${query}`, config)
    return request.then(response => response.data)
}

const create = newCommander => {
    const config = {
        headers: {},
    }
    return axios.post(baseUrl, newCommander, config)
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
    return axios.put(`${baseUrl}/${object.indexId}`, object, config)
}

export default { getAll, getByDeckId, create, remove, update }
