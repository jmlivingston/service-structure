import uuid from 'uuid/v4'
import todos from '../services/data/todos.mock'
import { HTTP_VERB } from './API'

const DEFAULT_RESOURCE = () => ''

const DEFAULT_CONFIG = Object.freeze({
  GET: {
    method: HTTP_VERB.GET,
    resource: DEFAULT_RESOURCE,
    mock: () => ({ ok: true, json: () => [] })
  },
  POST: {
    method: HTTP_VERB.POST,
    resource: DEFAULT_RESOURCE,
    mock: () => ({ ok: true, json: () => uuid() })
  },
  PUT: {
    method: HTTP_VERB.PUT,
    resource: DEFAULT_RESOURCE,
    mock: () => ({ ok: true, json: () => {} })
  },
  DELETE: {
    method: HTTP_VERB.DELETE,
    resource: DEFAULT_RESOURCE,
    mock: () => ({ ok: true, json: () => {} })
  }
})

const getDataById = ({ data, id, idName }) => {
  const datum = data.find(datum => datum[idName] === id)
  return {
    ok: !!datum,
    json: () => datum
  }
}

const getOkResponse = data => () => ({
  ok: true,
  json: () => data || {}
})

const API_MOCK = Object.freeze({
  TODO: {
    GET: {
      ...DEFAULT_CONFIG.GET,
      key: 'TODO.GET',
      mock: getOkResponse(todos.data)
    },
    GET_BY_ID: {
      ...DEFAULT_CONFIG.GET,
      key: 'TODO.GET_BY_ID',
      mock: ({ id }) => getDataById(todos.data, id, 'id')
    },
    DELETE: {
      ...DEFAULT_CONFIG.DELETE,
      key: 'TODO.DELETE',
      mock: getOkResponse
    },
    POST: {
      ...DEFAULT_CONFIG.POST,
      key: 'TODO.POST',
      mock: getOkResponse
    }
  }
})

export default API_MOCK
