import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const destroy = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(response => response.data)
  }

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll, 
  create, 
  update,
  destroy
}