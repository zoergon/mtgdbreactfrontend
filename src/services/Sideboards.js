import axios from "axios"

const baseUrl = "https://localhost:7120/api/sideboards"
const nameUrl = "https://localhost:7120/api/sideboards/name"
const deckIdUrl = "https://localhost:7120/api/sideboards/deckid"

let token = null

// Tämä on metodi, jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrina annetaan token, joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}

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


export default { getAll, getByDeckId, getName, create, remove, update }

