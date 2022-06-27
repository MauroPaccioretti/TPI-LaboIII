import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "assets/style/Modal.css";
import { DarkModeContext } from "Context/DarkModeContext";

const Modal = (props) => {
  const { darkMode } = useContext(DarkModeContext);
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className={`modal-header ${darkMode ? "dark" : ""}`}>
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className={`modal-body ${darkMode ? "dark" : ""}`}>
            {props.children}
          </div>
          <div className={`modal-footer ${darkMode ? "dark" : ""}`}>
            <button
              onClick={props.onClose}
              className={`button-return ${darkMode ? "dark" : ""}`}
            >
              Volver
            </button>
            <button onClick={props.onConfirm} className="button-confirm">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
