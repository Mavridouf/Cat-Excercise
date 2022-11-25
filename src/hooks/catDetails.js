import { useState } from "react";
import { getCatDetails } from "../api/cats";

export function useCatDetails() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [catDetails, setCatDetails] = useState(null);

  const fetchCatDetails = (id) => {
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearDetails = () => {
    setCatDetails(null);
  };

  return {
    loading,
    error,
    catDetails,
    fetchCatDetails,
    clearDetails,
  };
}
