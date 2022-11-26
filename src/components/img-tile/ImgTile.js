import { useNavigate } from "react-router-dom";
import classes from "./ImgTile.module.css";

const ImgTile = ({ url, id, isSmall = false }) => {
  const navigate = useNavigate();

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
