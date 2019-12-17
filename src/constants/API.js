export const HTTP_VERB = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
})

const API = Object.freeze({
  TODO: {
    GET: {
      key: 'TODO.GET',
      method: HTTP_VERB.GET,
      resource: () => `${process.env.API_BASE_URL}/to-dos`
    },
    GET_BY_ID: {
      key: 'TODO.GET_BY_ID',
      method: HTTP_VERB.GET,
      resource: ({ id }) => `${process.env.API_BASE_URL}/to-dos/${id}`
    },
    POST: {
      key: 'TODO.POST',
      method: HTTP_VERB.POST,
      resource: ({ id }) => `${process.env.API_BASE_URL}/to-dos/${id}`
    },
    PUT: {
      key: 'TODO.PUT',
      method: HTTP_VERB.PUT,
      resource: ({ id }) => `${process.env.API_BASE_URL}/to-dos/${id}`
    },
    DELETE: {
      key: 'TODO.DELETE',
      method: HTTP_VERB.DELETE,
      resource: ({ id }) => `${process.env.API_BASE_URL}/to-dos/${id}`
    }
  }
})

export default API
