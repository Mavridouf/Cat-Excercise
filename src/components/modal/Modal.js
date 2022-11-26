import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
  return <div onClick={onClose} className={classes.backdrop}></div>;
};

const ModalOverlay = ({ children }) => {
  return <div className={classes.modal}>{children}</div>;
};

const portalTarget = document.getElementById("overlays");

const Modal = ({ onClose, children }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalTarget)}
      {ReactDOM.createPortal(
        <div className={classes["modal-container"]}>
          <ModalOverlay>{children}</ModalOverlay>
        </div>,
        portalTarget
      )}
    </React.Fragment>
  );
};

export default Modal;
