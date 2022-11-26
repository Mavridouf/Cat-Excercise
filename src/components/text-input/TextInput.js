import classes from "./TextInput.module.css";

const TextInput = ({ label, value, onHandleChange }) => {
  return (
    <input
      value={value}
      onChange={onHandleChange}
      className={classes.input}
      placeholder={label}
    />
  );
};

export default TextInput;
