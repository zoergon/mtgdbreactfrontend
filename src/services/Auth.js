import axios from 'axios'

const baseUrl = "https://localhost:7120/api/authentication"
// const baseUrl = "https://mtgdbwebapibackend20230728.azurewebsites.net/api/authentication"
// const baseUrl = "https://mtgdbwebapi.azure-api.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }
