import PropTypes from 'prop-types'
import React from 'react'

function Todo({ id, name, onChange, onSubmit }) {
  return (
    <div className="row">
      <div className="col-sm-3 vertical-align">
        <input
          value={name}
          onChange={event => onChange({ id, name: event.target.value })}
          onKeyPress={event => {
            if (event.key === 'Enter' && !id) {
              onSubmit({ name: event.target.value })
            }
          }}
        />
      </div>
      <div className="col-sm-9">
        <button className={id ? 'secondary' : 'tertiary'} onClick={() => onSubmit({ id, name })}>
          {id ? 'Delete' : 'Add'}
        </button>
      </div>
    </div>
  )
}

Todo.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

export default Todo
