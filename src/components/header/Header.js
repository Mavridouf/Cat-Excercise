import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

function Header() {
  return (
    <div className={classes.header}>
      <h2>Cat-alogue</h2>
      <div className={classes["link-container"]}>
        <NavLink
          to="cats"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Cats
        </NavLink>
        <NavLink
          to="breeds"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Breeds
        </NavLink>
        <NavLink
          to="favourites"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Favourites
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
