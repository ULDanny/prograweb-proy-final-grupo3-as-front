import base from './base.js'

const endpoint = 'serie'

const findAll = async () => await base.get(endpoint)


const findAllComplete = async () => await base.get(`${endpoint}/findallcomplete`)


const create = async (payload) => await base.post(endpoint, payload)

const update = async (payload) => await base.put(endpoint, payload)

const remove = async (id) => await base.remove(`${endpoint}/${id}`)

const findOne = async (id) => await base.get(`${endpoint}/${id}`)


const findOneComplete = async (id) => await base.get(`${endpoint}/findonecomplete/${id}`)

const api = { findAll, create, update, remove, findOne, findAllComplete, findOneComplete }

export default api;