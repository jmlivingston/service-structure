import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import TodoService from '../services/todo.service'
import ConfirmDialog from './ConfirmDialog'
import Toast from './Toast'
import Todo from './Todo'

function TodoList({ api }) {
  const [newTodo, setNewTodo] = useState({ name: '' })
  const [currentTodo, setCurrentTodo] = useState()
  const [error, setError] = useState()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [todos, setTodos] = useState({})
  const todoService = TodoService({ api })

  useEffect(() => {
    let didCancel = false
    let cleanUp
    ;(async () => {
      try {
        let request
        ;({ cleanUp, request } = todoService.get())
        const { data } = await request()
        !didCancel && setTodos(todoService.transformToObject({ todos: data }))
      } catch (error) {
        !didCancel && setError('Error getting todos!')
      }
    })()
    return () => {
      didCancel = true
      cleanUp && cleanUp()
    }
  }, [])

  const onDelete = async () => {
    const { request } = await todoService.remove({ id: currentTodo.id })
    const { response } = await request()
    if (response.ok) {
      /* eslint-disable-next-line no-unused-vars */
      const { [currentTodo.id]: removedTodo, ...filteredTodos } = todos
      setTodos(filteredTodos)
    } else {
      setError(`Unable to delete "${currentTodo.name}". Please try again!`)
    }
  }

  const onConfirmRemove = todo => {
    setCurrentTodo(todo)
    setIsDialogOpen(true)
  }

  const onUpdate = async ({ id, name }) => {
    const { request } = await todoService.update({ id })
    const { response } = await request()
    if (response.ok) {
      setTodos({
        ...todos,
        [id]: {
          ...todos[id],
          name
        }
      })
    } else {
      setError(`Unable to update "${name}". Please try again!`)
    }
  }

  const onAdd = async ({ name }) => {
    const { request } = await todoService.add({ body: { name } })
    const { data, response } = await request()
    if (response.ok) {
      setTodos({
        ...todos,
        [data.id]: {
          ...data,
          name
        }
      })
      setNewTodo({ name: '' })
    } else {
      setError(`Unable to add "${name}". Please try again!`)
    }
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      <hr />
      {Object.keys(todos)
        .sort((a, b) => (todos[a].name.toLowerCase() > todos[b].name.toLowerCase() ? 1 : -1))
        .map(key => (
          <Todo
            key={todos[key].id}
            id={todos[key].id}
            name={todos[key].name}
            onChange={onUpdate}
            onSubmit={onConfirmRemove}
          />
        ))}
      <Todo name={newTodo.name} onChange={setNewTodo} onSubmit={onAdd} />
      <ConfirmDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        text={`Are you sure you want to delete "${currentTodo?.name}"?`}
        onYes={onDelete}
      />
      <Toast text={error} onClose={() => setError()} />
    </div>
  )
}

TodoList.propTypes = {
  api: PropTypes.object
}

export default TodoList
