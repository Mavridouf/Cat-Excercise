import { useCallback, useContext, useEffect, useState } from "react";
import { getCats } from "../api/cats";
import ToastsContext, { toastTypes } from "../context/toasts-context";
import { useToasts } from "./toasts";

export function useCats() {
  const { addToast } = useContext(ToastsContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [catsList, setCatsList] = useState(null);

  const fetchCats = useCallback(
    (limit, breed) => {
      setLoading(true);
      setError(false);
      getCats(limit, breed)
        .then((resp) => {
          setCatsList(resp.data);
          setError(false);
        })
        .catch(() => {
          setCatsList(null);
          setError(true);
          addToast(toastTypes.Error, "Fetching Cats Failed");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [addToast]
  );

  const clearCatsList = useCallback(() => {
    setCatsList(null);
  }, []);

  return {
    loading,
    error,
    catsList,
    fetchCats,
    clearCatsList,
  };
}
