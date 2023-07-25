import axios from "axios"

const baseUrl = "https://localhost:7120/api/commanders"
// const nameUrl = "https://localhost:7120/api/commanders/name"
// const deckIdUrl = "https://localhost:7120/api/commanders/deckid"

let token = null

// Tämä on metodi, jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrina annetaan token, joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const getByDeckId = (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${baseUrl}/deckid/${query}`, config)
    return request.then(response => response.data)
}

const create = newCommander => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newCommander, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = object => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${object.indexId}`, object, config)
}

export default { getAll, getByDeckId, create, remove, update, setToken }
