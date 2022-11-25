import React from "react";
import { useCatDetails } from "../hooks/catDetails";

const CatDetailsContext = React.createContext({
  catDetails: null,
  loading: false,
  error: false,
  fetchCatDetails: null,
  clearDetails: null,
});

export default CatDetailsContext;

export const CatDetailsProvider = (props) => {
  const { catDetails, loading, error, fetchCatDetails, clearDetails } =
    useCatDetails();

  return (
    <CatDetailsContext.Provider
      value={{
        catDetails: catDetails,
        loading: loading,
        error: error,
        fetchCatDetails: fetchCatDetails,
        clearDetails: clearDetails,
      }}
    >
      {props.children}
    </CatDetailsContext.Provider>
  );
};
