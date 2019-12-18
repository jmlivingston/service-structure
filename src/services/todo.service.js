import fetchHelper from '../helpers/fetchHelper'

function TodoService({ api }) {
  return {
    add: ({ body }) =>
      fetchHelper({
        api: api.TODO.ADD,
        body: typeof body === 'string' ? body : JSON.stringify(body)
      }),
    get: () =>
      fetchHelper({
        api: api.TODO.GET
      }),
    getById: ({ id }) =>
      fetchHelper({
        api: api.TODO.GET_BY_ID,
        params: { id }
      }),
    remove: ({ id }) =>
      fetchHelper({
        api: api.TODO.REMOVE,
        params: { id }
      }),
    update: ({ body, id }) =>
      fetchHelper({
        api: api.TODO.UPDATE,
        params: { id },
        body: typeof body === 'string' ? body : JSON.stringify(body)
      }),
    transformToObject: ({ todos }) => todos.reduce((acc, todo) => ({ ...acc, [todo.id]: todo }), {})
  }
}

export default TodoService
