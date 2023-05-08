import axios from "axios"

const baseUrl = "https://localhost:7120/api/decks"

const getAll = () => {
    const config = {
        headers: {},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newDeck => {
    const config = {
        headers: {},
    }
    return axios.post(baseUrl, newDeck, config)
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


export default { getAll, create, remove, update }