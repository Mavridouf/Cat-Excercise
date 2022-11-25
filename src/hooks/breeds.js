import { useState } from "react";
import { getBreeds } from "../api/cats";

export function useBreeds() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [breedList, setBreedList] = useState(null);

  const fetchBreeds = () => {
    setLoading(true);
    setError(false);
    getBreeds()
      .then((resp) => {
        setBreedList(resp.data);
        setError(false);
      })
      .catch(() => {
        setBreedList(null);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearBreedList = () => {
    setBreedList(null);
  };

  return {
    loading,
    error,
    breedList,
    fetchBreeds,
    clearBreedList,
  };
}
