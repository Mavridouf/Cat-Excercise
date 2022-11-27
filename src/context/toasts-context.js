import React from "react";
import { useToasts } from "../hooks/toasts";

export const toastTypes = {
  Error: "error",
  Info: "info",
  Success: "success",
};

const ToastsContext = React.createContext({
  addToast: null,
  toasts: null,
  removeToast: null,
});

export default ToastsContext;

export const ToastsProvider = (props) => {
  const { toasts, addToast, removeToast } = useToasts();

  return (
    <ToastsContext.Provider
      value={{
        addToast: addToast,
        toasts: toasts,
        removeToast: removeToast,
      }}
    >
      {props.children}
    </ToastsContext.Provider>
  );
};
