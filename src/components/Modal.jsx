import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, children, classeName = "", onClose }) {
  const modalRef = useRef();
  useEffect(() => {
    if (open) {
      modalRef.current.showModal();
    }

    if (!open) {
      modalRef.current.close();
    }
  }, [open]);
  return createPortal(
    <dialog ref={modalRef} className={`modal ${classeName}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
