import React from 'react'
import API from '../../constants/API_MOCK'
import TodoList from '../Todo/TodoList'

function App() {
  return (
    <div>
      <TodoList API={API} />
    </div>
  )
}

export default App
