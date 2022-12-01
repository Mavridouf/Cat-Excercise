import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./FavTile.module.css";

const FavTile = ({ favourite, onClick, children }) => {
  return (
    <div key={favourite?.id} className={classes["fav-tile-wrapper"]}>
      {children}
      <div className={classes["tile-overlay"]}>
        <FontAwesomeIcon
          onClick={onClick}
          className={classes["btn-icon"]}
          icon={faHeartCrack}
          size="4x"
        />
      </div>
    </div>
  );
};

export default FavTile;
