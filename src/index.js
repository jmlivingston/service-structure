import 'mini.css/dist/mini-dark.min.css'
import React from 'react'
import { render } from 'react-dom'
import TodoList from './components/TodoList'
import API from './constants/API'
import API_MOCK from './constants/API_MOCK'
import './index.css'

render(<TodoList api={process.env.NODE_ENV === 'local' ? API_MOCK : API} />, document.getElementById('root'))
