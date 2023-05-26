import axios from "axios"

const baseUrl = "https://localhost:7120/api/maindecks"
const nameUrl = "https://localhost:7120/api/maindecks/name"

const getAll = () => {
    const config = {
        headers: {},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const getName = (query) => {
    const config = {
        headers: {},        
    }
    const request = axios.get(`${nameUrl}/${query}`, config)
    return request.then(response => response.data)
}

const create = newCard => {
    const config = {
        headers: {},
    }
    return axios.post(baseUrl, newCard, config)
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


export default { getAll, getName, create, remove, update }

