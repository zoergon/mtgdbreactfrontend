import axios from "axios"

const baseUrl = "https://localhost:7120/api/allcards"
const nameUrl = "https://localhost:7120/api/allcards/name"
const partialNameUrl = "https://localhost:7120/api/allcards/partialname"
const idUrl = "https://localhost:7120/api/allcards/id"

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

const getOneCardById = (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${idUrl}/${query}`, config)
    return request.then(response => response.data)
}

const getName = (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${nameUrl}/${query}`, config)
    return request.then(response => response.data)
}

const getPartialName = (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${partialNameUrl}/${query}`, config)
    return request.then(response => response.data)
}

export default { getAll, getOneCardById, getName, getPartialName, setToken }
