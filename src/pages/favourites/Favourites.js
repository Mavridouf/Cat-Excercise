import React, { useContext, useEffect } from "react";
import ImgTile from "../../components/img-tile/ImgTile";
import FavoritesContext from "../../context/favourites-context";
import classes from "./Favourites.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";

function Favourites() {
  const {
    favouritesList,
    loadingFavourites,
    fetchFavourites,
    deleteFromFavourites,
    clearFavouritesList,
  } = useContext(FavoritesContext);

  useEffect(() => {
    fetchFavourites();
    return () => {
      clearFavouritesList();
    };
  }, []);

  const catListImgTiles = () => {
    return favouritesList?.map((favourite) => (
      <div key={favourite.id} className={classes["fav-tile-wrapper"]}>
        <ImgTile url={favourite.image.url} id={favourite.image.id} />
        <div className={classes["tile-overlay"]}>
          <FontAwesomeIcon
            onClick={() => deleteFromFavourites(favourite.id)}
            className={classes["btn-icon"]}
            icon={faHeartCrack}
            size="4x"
          />
        </div>
      </div>
    ));
  };

  return (
    <React.Fragment>
      {loadingFavourites && (
        <div className={classes["loading-container"]}>Loading ...</div>
      )}
      {!loadingFavourites && (
        <div className={classes["tile-container"]}> {catListImgTiles()}</div>
      )}
    </React.Fragment>
  );
}

export default Favourites;
