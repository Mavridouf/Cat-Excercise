import { useCallback, useContext, useState } from "react";
import { getCatDetails } from "../api/cats";
import ToastsContext, { toastTypes } from "../context/toasts-context";

export function useCatDetails() {
  const { addToast } = useContext(ToastsContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [catDetails, setCatDetails] = useState(null);

  const fetchCatDetails = useCallback(
    (id) => {
      setLoading(true);
      setError(false);
      getCatDetails(id)
        .then((resp) => {
          setCatDetails(resp.data);
          setError(false);
        })
        .catch(() => {
          setCatDetails(null);
          setError(true);
          addToast(toastTypes.Error, "Fetching Cat Details Failed Failed");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [addToast]
  );

  const clearDetails = useCallback(() => {
    setCatDetails(null);
  }, []);

  return {
    loading,
    error,
    catDetails,
    fetchCatDetails,
    clearDetails,
  };
}
