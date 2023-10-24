import axios from "axios"

const baseUrl = "https://localhost:7120/api/companions"
// const baseUrl = "https://mtgdbwebapibackend20230728.azurewebsites.net/api/companions"
// const nameUrl = "https://localhost:7120/api/companions/name"
// const deckIdUrl = "https://localhost:7120/api/companions/deckid"

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

const getName = async (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${baseUrl}/name/${query}`, config)
    const response = await request
    return response.data
}

const create = newCard => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newCard, config)
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


export default { getAll, getByDeckId, getName, create, remove, update, setToken }

