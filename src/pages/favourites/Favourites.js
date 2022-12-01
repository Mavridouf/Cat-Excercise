import React, { useEffect } from "react";
import ImgTile from "../../components/img-tile/ImgTile";
import classes from "./Favourites.module.css";
import TileGrid from "../../components/tile-grid/TileGrid";
import FavTile from "../../components/fav-tile/FavTile";
import Spinner from "../../components/spinner/Spinner";
import { useFavourites } from "../../hooks/favourites";

function Favourites() {
  const {
    favouritesList,
    deleteFromFavourites,
    loadingFavourites,
    fetchFavourites,
    clearFavouritesList,
  } = useFavourites();

  useEffect(() => {
    fetchFavourites();
    return () => {
      clearFavouritesList();
    };
  }, [fetchFavourites, clearFavouritesList]);

  const catListImgTiles = () => {
    return favouritesList?.map((favourite) => (
      <FavTile
        key={favourite?.id}
        onClick={() => deleteFromFavourites(favourite?.id)}
        favourite={favourite}
      >
        <ImgTile
          key={favourite?.image.id}
          url={favourite?.image.url}
          id={favourite?.image.id}
        />
      </FavTile>
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
      {loadingFavourites && <Spinner />}
      {!loadingFavourites && (
        <TileGrid className={classes["tile-container"]}>
          {catListImgTiles()}
        </TileGrid>
      )}
    </React.Fragment>
  );
}

export default Favourites;
