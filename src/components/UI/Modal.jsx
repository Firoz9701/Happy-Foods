import { useEffect, useRef,forwardRef } from 'react'
import { createPortal } from 'react-dom'
const Modal = ({children,open,className,onClose}) => {
    const dialog = useRef()
useEffect(() => {
  const modal = dialog.current;

  if (open) {
    modal.showModal();
  } else {
    modal.close(); // close it only when `open` becomes false
  }
}, [open]);

  
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>{children}</dialog>,
    document.getElementById('modal')
  )
}


export default Modal