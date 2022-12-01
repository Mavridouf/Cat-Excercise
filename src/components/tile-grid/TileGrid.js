import classes from "./TileGrid.module.css";

const TileGrid = ({ isSmall = false, children }) => {
  return (
    <div
      className={`${classes["tile-container"]} ${
        isSmall ? classes["isSmall"] : ""
      }`}
    >
      {children}
    </div>
  );
};

export default TileGrid;
