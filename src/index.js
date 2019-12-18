import 'mini.css/dist/mini-dark.min.css'
import React from 'react'
import { render } from 'react-dom'
import TodoList from './components/TodoList'
import API from './constants/API'
import './index.css'

render(<TodoList api={API} />, document.getElementById('root'))
