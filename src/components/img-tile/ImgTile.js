import { useNavigate } from "react-router-dom";
import classes from "./ImgTile.module.css";

const ImgTile = (props) => {
  const navigate = useNavigate();

  const { url, id, isSmall = false } = props;

  return (
    <div
      onClick={() => navigate(`/cats/${id}`)}
      className={`${classes.tile} ${isSmall ? classes.small : ""}`}
    >
      <img src={url} />
    </div>
  );
};

export default ImgTile;
