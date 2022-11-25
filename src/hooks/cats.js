import { useState } from "react";
import { getCats } from "../api/cats";

export function useCats() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [catsList, setCatsList] = useState(null);

  const fetchCats = () => {
    setLoading(true);
    setError(false);
    getCats()
      .then((resp) => {
        setCatsList(resp.data);
        setError(false);
      })
      .catch(() => {
        setCatsList(null);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearCatsList = () => {
    setCatsList(null);
  };

  return {
    loading,
    error,
    catsList,
    fetchCats,
    clearCatsList,
  };
}
