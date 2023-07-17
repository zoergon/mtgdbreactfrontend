import axios from "axios"

const baseUrl = "https://localhost:7120/api/ownedcards"
const idUrl = "https://localhost:7120/api/ownedcards/id"
const nameUrl = "https://localhost:7120/api/ownedcards/name"
const partialNameUrl = "https://localhost:7120/api/ownedcards/partialname"

const getAll = () => {
    const config = {
        headers: {},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const getById = (query) => {
    const config = {
        headers: {},        
    }
    const request = axios.get(`${idUrl}/${query}`, config)
    return request.then(response => response.data)
}

// const getAllById = (query) => {
//     const config = {
//         headers: {},        
//     }
//     const request = axios.get(`${idUrl}/${query}`, config)
//     return request.then(response => response.data)
// }

const getByName = (query) => {
    const config = {
        headers: {},        
    }
    const request = axios.get(`${nameUrl}/${query}`, config)
    return request.then(response => response.data)
}

const getPartialName = (query) => {
    const config = {
        headers: {},        
    }
    const request = axios.get(`${partialNameUrl}/${query}`, config)
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


export default { getAll, getById, getByName, getPartialName, create, remove, update }

