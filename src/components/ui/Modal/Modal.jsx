import React from "react";

import ReactDOM from "react-dom";
import { useUser } from "../../../UserContext";

export default function Modal({ children }) {
  // CONTEXT
  const { setShowModal } = useUser();

  return ReactDOM.createPortal(
    <div className="overlay" onClick={() => setShowModal(false)}>
      <div className="override" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
