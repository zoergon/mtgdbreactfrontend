import axios from "axios"

const baseUrl = "https://localhost:7120/api/formats"
// const baseUrl = "https://mtgdbwebapibackend20230728.azurewebsites.net/api/formats"
// const nameUrl = "https://localhost:7120/api/formats/id"

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

const getFormat = (query) => {
    const config = {
        headers: { Authorization: token },        
    }
    const request = axios.get(`${baseUrl}/id/${query}`, config)
    return request.then(response => response.data)
}

const create = newFormat => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newFormat, config)
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


export default { getAll, getFormat, create, remove, update, setToken }
