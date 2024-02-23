import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

const Modal = function Modal ({ children, open }) {
  const dialog = useRef();

  useEffect(() => {
    open
      ? dialog.current.showModal()
      : dialog.current.close();
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
