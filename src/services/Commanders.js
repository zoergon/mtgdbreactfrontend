import axios from "axios"

const baseUrl = "https://localhost:7120/api/commanders"
// const baseUrl = "https://mtgdbwebapibackend20230728.azurewebsites.net/api/commanders"
// const nameUrl = "https://localhost:7120/api/commanders/name"
// const deckIdUrl = "https://localhost:7120/api/commanders/deckid"

let token = null

// Tämä on metodi, jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrina annetaan token, joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    const response = await request
    return response.data
}

const getByDeckId = async (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${baseUrl}/deckid/${query}`, config)
    const response = await request
    return response.data
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
