import axios from "axios"

const baseUrl = "https://localhost:7120/api/commanders"

const getAll = () => {
    const config = {
        headers: {},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newCommander => {
    const config = {
        headers: {},
    }
    return axios.post(baseUrl, newCommander, config)
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
    return axios.put(`${baseUrl}/${object.indexId}`, object, config)
}

// const update = (id, object) => {
//     const config = {
//         headers: { },
//     }
//     return axios.put(`${baseUrl}/${id}`, object, config)
// }

export default { getAll, create, remove, update }
