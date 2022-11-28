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
  }, [fetchFavourites, clearFavouritesList]);

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

  // TODO
  // With the current implementation we attempt to fetch all the favourite cats for a user in one go.
  // This is not very performant.
  //    1. It puts strain on the backend in case the list of cats returned is very big
  //        - Keeping the design as is we could implement infinite scrolling when a certain point of the window is reached
  //        - Or implement pagination to browse through our cats
  //    2. Currently the browser is going to render an <ImgTile/> for every cat in our favourites (Could become very expensive)
  //         - To tackle this we could implement virtual scrolling to render only the <ImgTile/> components
  //           that are in the viewport. In case of infinite scrolling we would have to implement this, in case of pagination
  //           it would probably not be needed

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
