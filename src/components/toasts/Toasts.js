import React, { useContext } from "react";
import ReactDOM from "react-dom";
import ToastsContext from "../../context/toasts-context";
import Toast from "./Toast";
import classes from "./Toasts.module.css";

const portalTarget = document.getElementById("toast-overlay");

const Toasts = () => {
  const { toasts } = useContext(ToastsContext);

  const toastList = () => {
    return toasts?.map((toast) => (
      <Toast
        key={toast.toastId}
        id={toast.toastId}
        type={toast.type}
        message={toast.message}
      />
    ));
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className={classes["toast-container"]}>{toastList()}</div>,
        portalTarget
      )}
    </React.Fragment>
  );
};

export default Toasts;
