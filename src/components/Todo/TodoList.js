import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import TodoService from '../../services/todo.service'

function TodoList({ API }) {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState()
  const todoService = TodoService({ API })
  useEffect(() => {
    let didCancel = false
    let cleanUp
    ;(async () => {
      try {
        let request
        ;({ cleanUp, request } = todoService.get())
        const { data } = await request()
        !didCancel && setTodos(data)
      } catch (error) {
        !didCancel && setError('error')
      }
    })()
    return () => {
      didCancel = true
      cleanUp && cleanUp()
    }
  }, [])

  return error ? (
    <div>{error}</div>
  ) : (
    <>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.name} <button>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

TodoList.propTypes = {
  API: PropTypes.object
}

export default TodoList
