import { useContext, useEffect, useState } from "react";
import { getFavourites, markAsFavourite, deleteFavourite } from "../api/cats";
import ToastsContext, { toastTypes } from "../context/toasts-context";

export function useFavourites() {
  const { addToast } = useContext(ToastsContext);

  const [loadingFavourites, setLoadingFavourites] = useState(false);
  const [loadingMarkFavourite, setLoadingMarkFavourite] = useState(false);
  const [loadingDeleteFavourite, setLoadingDeleteFavourite] = useState(false);

  const [error, setError] = useState(false);
  const [favouritesList, setFavouritesList] = useState(null);
  const [deleteFavouriteSuccess, setDeleteFavouriteSuccess] = useState(null);

  const fetchFavourites = () => {
    setLoadingFavourites(true);
    setError(false);
    getFavourites()
      .then((resp) => {
        setFavouritesList(resp.data);
        setError(false);
      })
      .catch(() => {
        setFavouritesList(null);
        setError(true);
        addToast(toastTypes.Error, "Fetching Favourites Failed");
      })
      .finally(() => {
        setLoadingFavourites(false);
      });
  };

  const addToFavourites = (image_id) => {
    setLoadingMarkFavourite(true);
    setError(false);
    markAsFavourite(image_id)
      .then((resp) => {
        if (resp.data.message === "SUCCESS") {
          addToast(toastTypes.Success, "Image Added Favorites");
        } else {
          addToast(toastTypes.Error, "Failed to Add Favorite");
        }
        setError(false);
      })
      .catch(() => {
        setError(true);
        addToast(toastTypes.Error, "Failed to Add Favorite");
      })
      .finally(() => {
        setLoadingMarkFavourite(false);
      });
  };

  const deleteFromFavourites = (favourite_id) => {
    setLoadingDeleteFavourite(true);
    setError(false);
    deleteFavourite(favourite_id)
      .then((resp) => {
        if (resp.data.message === "SUCCESS") {
          setDeleteFavouriteSuccess({
            success: resp.data.message === "SUCCESS",
            favourite_id: favourite_id,
          });
          addToast(toastTypes.Success, "Image Removed from Favorites");
        } else {
          addToast(toastTypes.Error, "Failed to Remove Favorite");
        }
        setError(false);
      })
      .catch(() => {
        setError(true);
        addToast(toastTypes.Error, "Failed to Remove Favorite");
      })
      .finally(() => {
        setLoadingDeleteFavourite(false);
      });
  };

  useEffect(() => {
    setFavouritesList(
      favouritesList?.filter((favItem) => {
        return favItem.id !== deleteFavouriteSuccess?.favourite_id;
      })
    );
  }, [deleteFavouriteSuccess]);

  const clearFavouritesList = () => {
    setFavouritesList(null);
  };

  return {
    loadingFavourites,
    loadingMarkFavourite,
    loadingDeleteFavourite,
    error,
    favouritesList,
    fetchFavourites,
    clearFavouritesList,
    addToFavourites,
    deleteFromFavourites,
  };
}
