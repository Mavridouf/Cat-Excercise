import { useContext, useEffect } from "react";
import ToastsContext from "../../context/toasts-context";
import classes from "./Toast.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Toast = ({ id, type, message }) => {
  const { removeToast } = useContext(ToastsContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <div className={`${classes.toast} ${classes[type]}`}>
      {message}{" "}
      <FontAwesomeIcon
        className={classes["awesome-ico"]}
        onClick={() => removeToast(id)}
        icon={faXmark}
        size="lg"
      />
    </div>
  );
};

export default Toast;
