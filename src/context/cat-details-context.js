import React from "react";
import { useCatDetails } from "../hooks/catDetails";

const CatDetailsContext = React.createContext({
  catDetails: null,
  loading: false,
  error: false,
  fetchCatDetails: null,
  clearDetails: null,
  setCatDetails: null,
});

export default CatDetailsContext;

export const CatDetailsProvider = (props) => {
  const {
    catDetails,
    loading,
    error,
    fetchCatDetails,
    clearDetails,
    setCatDetails,
  } = useCatDetails();

  return (
    <CatDetailsContext.Provider
      value={{
        catDetails: catDetails,
        loading: loading,
        error: error,
        fetchCatDetails: fetchCatDetails,
        clearDetails: clearDetails,
        setCatDetails: setCatDetails,
      }}
    >
      {props.children}
    </CatDetailsContext.Provider>
  );
};
