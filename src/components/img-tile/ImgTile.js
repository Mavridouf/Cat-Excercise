import classes from "./ImgTile.module.css";

const ImgTile = ({ url, onClick }) => {
  return (
    <div onClick={onClick} className={classes.tile}>
      <img src={url} />
    </div>
  );
};

export default ImgTile;
