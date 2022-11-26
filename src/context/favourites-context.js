import React from "react";
import { useFavourites } from "../hooks/favourites";

const FavoritesContext = React.createContext({
  favouritesList: null,
  loadingFavourites: false,
  error: false,
  fetchFavourites: null,
  addToFavourites: null,
  deleteFromFavourites: null,
  clearFavouritesList: null,
});

export default FavoritesContext;

export const FavouritesProvider = (props) => {
  const {
    favouritesList,
    loadingFavourites,
    error,
    fetchFavourites,
    addToFavourites,
    deleteFromFavourites,
    clearFavouritesList,
  } = useFavourites();

  return (
    <FavoritesContext.Provider
      value={{
        favouritesList: favouritesList,
        loadingFavourites: loadingFavourites,
        error: error,
        fetchFavourites: fetchFavourites,
        addToFavourites: addToFavourites,
        deleteFromFavourites: deleteFromFavourites,
        clearFavouritesList: clearFavouritesList,
      }}
    >
      {props.children}
    </FavoritesContext.Provider>
  );
};
