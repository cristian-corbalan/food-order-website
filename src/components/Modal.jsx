import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

const Modal = function Modal ({ children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    open
      ? dialog.current.showModal()
      : dialog.current.close();
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
