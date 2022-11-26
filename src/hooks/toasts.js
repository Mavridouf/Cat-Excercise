import { useCallback, useState } from "react";
import uuid from "react-uuid";

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (type, message) => {
      const toastId = uuid();
      setToasts((toasts) => [
        ...toasts,
        {
          type,
          message,
          toastId,
        },
      ]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (toastId) => {
      setToasts((toasts) =>
        toasts.filter((toast) => toast.toastId !== toastId)
      );
    },
    [setToasts]
  );

  return {
    toasts,
    addToast,
    removeToast,
  };
}
