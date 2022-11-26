import classes from "./Button.module.css";

const Button = ({ click, children }) => {
  return (
    <button onClick={click} className={classes.button}>
      {children}
    </button>
  );
};

export default Button;
