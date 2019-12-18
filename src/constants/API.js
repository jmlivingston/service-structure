import HTTP_VERB from './HTTP_VERB'

const NAME = 'TODO'
const SUFFIX = 'to-dos'

export default Object.freeze({
  TODO: {
    ADD: {
      key: `${NAME}_ADD`,
      method: HTTP_VERB.POST,
      resource: () => `${process.env.API_BASE_URL}/${SUFFIX}`
    },
    GET: {
      key: `${NAME}_GET`,
      method: HTTP_VERB.GET,
      resource: () => `${process.env.API_BASE_URL}/${SUFFIX}`
    },
    GET_BY_ID: {
      key: `${NAME}_GET_BY_ID`,
      method: HTTP_VERB.GET,
      resource: ({ id }) => `${process.env.API_BASE_URL}/${SUFFIX}/${id}`
    },
    REMOVE: {
      key: `${NAME}_REMOVE`,
      method: HTTP_VERB.DELETE,
      resource: ({ id }) => `${process.env.API_BASE_URL}/${SUFFIX}/${id}`
    },
    UPDATE: {
      key: `${NAME}_UPDATE`,
      method: HTTP_VERB.PUT,
      resource: ({ id }) => `${process.env.API_BASE_URL}/${SUFFIX}/${id}`
    }
  }
})
