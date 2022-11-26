import classes from "./TextInput.module.css";

const TextInput = (props) => {
  const { label, value, onHandleChange } = props;
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
