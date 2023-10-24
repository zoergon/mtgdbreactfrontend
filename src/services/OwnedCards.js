import axios from "axios"

const baseUrl = "https://localhost:7120/api/ownedcards"
// const baseUrl = "https://mtgdbwebapibackend20230728.azurewebsites.net/api/ownedcards"
// const loginIdUrl = "https://localhost:7120/api/ownedcards/loginid"
// const idUrl = "https://localhost:7120/api/ownedcards/id"
// const nameUrl = "https://localhost:7120/api/ownedcards/name"
// const partialNameUrl = "https://localhost:7120/api/ownedcards/partialname"

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

const getCardsByLoginId = async (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${baseUrl}/loginid/${query}`, config)
    const response = await request
    return response.data
}

const getOneCardById = async (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${baseUrl}/id/${query}`, config)
    const response = await request
    return response.data
}

// const getAllById = (query) => {
//     const config = {
//         headers: {},        
//     }
//     const request = axios.get(`${idUrl}/${query}`, config)
//     return request.then(response => response.data)
// }

const getByName = async (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${baseUrl}/name/${query}`, config)
    const response = await request
    return response.data
}

const getPartialName = async (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${baseUrl}/partialname/${query}`, config)
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


export default { getAll, getCardsByLoginId, getOneCardById, getByName, getPartialName, create, remove, update, setToken }

