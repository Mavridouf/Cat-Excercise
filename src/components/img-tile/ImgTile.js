import { useNavigate } from "react-router-dom";
import classes from "./ImgTile.module.css";

const ImgTile = (props) => {
  const navigate = useNavigate();

  const { url, id } = props;

  return (
    <div onClick={() => navigate(`${id}`)} className={classes.tile}>
      <img src={url} />
    </div>
  );
};

export default ImgTile;
