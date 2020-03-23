import { v4 as uuid } from 'uuid'
import todos from '../services/data/todos.mock'
import DEFAULT_CONFIG from './DEFAULT_CONFIG_MOCK'

const NAME = 'TODO'

const getDataById = ({ data, id, idName }) => {
  const datum = data.find((datum) => datum[idName] === id)
  return {
    ok: !!datum,
    json: () => datum,
  }
}

const getOkResponse = (data) => () => ({
  ok: true,
  json: () => data || { id: uuid() },
})

export default Object.freeze({
  TODO: {
    ADD: {
      ...DEFAULT_CONFIG.ADD,
      key: `${NAME}_ADD`,
      mock: getOkResponse(),
    },
    GET: {
      ...DEFAULT_CONFIG.GET,
      key: `${NAME}_GET`,
      mock: getOkResponse(todos.data),
    },
    GET_BY_ID: {
      ...DEFAULT_CONFIG.GET,
      key: `${NAME}_GET_BY_ID`,
      mock: ({ id }) => getDataById(todos.data, id, 'id'),
    },
    REMOVE: {
      ...DEFAULT_CONFIG.REMOVE,
      key: `${NAME}_REMOVE`,
      mock: getOkResponse(),
    },
    UPDATE: {
      ...DEFAULT_CONFIG.ADD,
      key: `${NAME}_UPDATE`,
      mock: getOkResponse(),
    },
  },
})
