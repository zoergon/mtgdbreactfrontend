import axios from "axios"

const baseUrl = "https://localhost:7120/api/decks"
const nameUrl = "https://localhost:7120/api/decks/name"

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

const getName = (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${nameUrl}/${query}`, config)
    return request.then(response => response.data)
}

const create = newDeck => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newDeck, config)
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
    return axios.put(`${baseUrl}/${object.deckId}`, object, config)
}


export default { getAll, getName, create, remove, update, setToken }
