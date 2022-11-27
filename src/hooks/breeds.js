import { useCallback, useContext, useState } from "react";
import { getBreeds } from "../api/cats";
import ToastsContext, { toastTypes } from "../context/toasts-context";

export function useBreeds() {
  const { addToast } = useContext(ToastsContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [breedList, setBreedList] = useState(null);

  const fetchBreeds = useCallback(() => {
    setLoading(true);
    setError(false);
    getBreeds()
      .then((resp) => {
        setBreedList(resp.data);
        setError(false);
      })
      .catch(() => {
        setBreedList(null);
        addToast(toastTypes.Error, "Fetching Breeds Failed");
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [addToast]);

  const clearBreedList = useCallback(() => {
    setBreedList(null);
  }, []);

  return {
    loading,
    error,
    breedList,
    fetchBreeds,
    clearBreedList,
  };
}
