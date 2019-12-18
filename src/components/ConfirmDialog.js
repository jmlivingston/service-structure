import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'

function ConfirmDialog({ isOpen, onYes, setIsOpen, text }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    document.body.addEventListener('click', () => {
      if (dialogRef.current.hasAttribute('open')) {
        dialogRef.current.close()
        setIsOpen(false)
      }
    })
  }, [])

  useEffect(() => {
    isOpen && dialogRef.current.showModal()
  }, [isOpen])

  return (
    <dialog ref={dialogRef} className="text-center">
      {text}
      <br />
      <button className="small secondary" onClick={onYes}>
        Yes
      </button>
      <button className="small">No</button>
    </dialog>
  )
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool,
  onYes: PropTypes.func,
  setIsOpen: PropTypes.func,
  text: PropTypes.string
}

export default ConfirmDialog
