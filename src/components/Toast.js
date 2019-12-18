import PropTypes from 'prop-types'
import React from 'react'

function Toast({ onClose, text }) {
  return text ? (
    <span className="toast">
      {text}{' '}
      <span
        tabIndex="0"
        className="small"
        role="button"
        onClick={() => onClose()}
        onKeyPress={event => event.key === 'Space' && onClose()}>
        X
      </span>
    </span>
  ) : null
}

Toast.propTypes = {
  onClose: PropTypes.func,
  text: PropTypes.string
}

export default Toast
