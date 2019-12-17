import fetchHelper from '../helpers/fetchHelper'

function TodoService({ API }) {
  return {
    get: () => {
      return fetchHelper({
        api: API.TODO.GET
      })
    },
    getById: id => {
      return fetchHelper({
        api: API.TODO.GET_BY_ID,
        params: { id }
      })
    }
  }
}

export default TodoService
