import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button onClick={props.click} className={classes.button}>
      {props.children}
    </button>
  );
};

export default Button;
