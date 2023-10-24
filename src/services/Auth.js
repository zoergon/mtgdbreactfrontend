import axios from 'axios'

const baseUrl = "https://localhost:7120/api/authentication"
// const baseUrl = "https://mtgdbwebapibackend20230728.azurewebsites.net/api/authentication"
// const baseUrl = "https://mtgdbwebapi.azure-api.net/api/authentication"

const authenticate = async (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    const response = await request
    return response
}

export default { authenticate }
