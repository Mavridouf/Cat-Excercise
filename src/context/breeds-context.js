import React from "react";
import { useBreeds } from "../hooks/breeds";

const BreedsContext = React.createContext({
  breedList: null,
  loading: false,
  error: false,
  fetchBreeds: null,
  clearBreedList: null,
});

export default BreedsContext;

export const BreedsProvider = (props) => {
  const { breedList, loading, error, fetchBreeds, clearBreedList } =
    useBreeds();

  return (
    <BreedsContext.Provider
      value={{
        breedList: breedList,
        loading: loading,
        error: error,
        fetchBreeds: fetchBreeds,
        clearBreedList: clearBreedList,
      }}
    >
      {props.children}
    </BreedsContext.Provider>
  );
};
